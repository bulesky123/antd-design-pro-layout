/**
 * Created by zhoufei on 2019/9/12.
 */

/*eslint-disable*/
import { defaultConfig, sendUrl } from './config'

const dataCollect = {
  store: {
    storeVer     : '1.0.0',    //版本号
    storePage    : "ACQ01",    //页面采集标记
    storeClick   : "ACQ02",    //点击事件采集标记
    storeCodeErr : "ACQ04",    //代码异常采集标记
    storeReqErr  : "ACQ05",    //请求异常采集标记
    storeTiming  : "ACQ06",    //页面时间采集标记
    sendUrl      : sendUrl,         // log采集地址
    idTag        : 'phone_acb',         // 主动埋点标识
    classTag     : '',         // 自动埋点class
    acbLength    : 2,          // 点击冒泡元素采集层级
    openClick    : true,       // 是否开启点击采集
    openCodeErr  : false,       // 是否开启代码异常采集
    openPerformance: false,     // 是否开启页面性能采集
    openPage     : true,       // 是否采集页面
  },
  config: defaultConfig,
  util: { // 工具函数
    isNullOrEmpty: function (obj) {
      return (obj !== 0 || obj !== "0") && (obj === undefined || typeof obj === "undefined" || obj === null || obj === "null" || obj === "");
    },
    getTimeStr: function () {
      var date = new Date().getTime();
      return date;
    },
    extend: function (target, souce) {
      for (var obj in souce) {
        target[obj] = souce[obj];
      }
      return target;
    },
    getObjectType: function (param) {
      return Object.prototype.toString.call(param);
    },
    createZuid: function () {
      let str = '1'
      return `${'xxxxxxxxxxxxxxxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        let r = Math.random() * 16 | 0,
          v = c === 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
      })}_12345678900${str}`
    },
    getZuid: function () {
      let uuid = localStorage.getItem('ZUID')
      if (!uuid) {
        uuid = this.createZuid()
        localStorage.setItem('ZUID', uuid)
      }
      return uuid
    },
  },
  init: function (params) {
    var _this = this;
    this.params = _this.params || params

    // 对页面page上报
    if (this.store.openPage) {
      this.bindPage()
    }
    //对代码异常做监控，对异常上报
    if (this.store.openCodeErr) {
      this.bindCodeHook()
    }

    // 对页面性能监控
    if (this.store.openPerformance) {
      this.setPerformanceAc()
    }

    //点击事件监听
    if (this.store.openClick) {
      //对本页面添加监听（ios兼容性问题）
      if (/iphone|ipad|ipod/i.test(window.navigator.userAgent)) {
        var elements = document.getElementsByTagName("body")[0].childNodes
        for (var z = 0, length = elements.length; z < length; z++) {
          elements[z].addEventListener("click", function () {

          });
        }
      }
      document.body.onclick = function (e) {
        var event = window.event || e
        var target = event.srcElement ? event.srcElement : event.target
        _this.getACBtarget(target, null)
      };
    }
    return this
  },
  bindPage: function(params) {
    var _this = this
    var ctime = _this.util.getTimeStr()
    var zuid = _this.util.getZuid()
    var storePage = {
      mid: _this.store.storePage,
      ctime: ctime,
      eleId: params && params.pageId,
      pageId: params && params.pageId,
      zuid: zuid, // 上报唯一标识
    }
    var sendData = _this.util.extend(storePage, _this.config)
    _this.postData(sendData)
  },
  getACBtarget: function (node, length) { //冒泡场景下将除document外所有父元素添加点击事件
    if (this.util.isNullOrEmpty(length)) {
      length = 0;
    }
    //length限制采集内容大小，只采集有效数据
    if (!this.util.isNullOrEmpty(node)) {
      var parentNode = node && node.parentNode;
      var dataId = node.getAttribute('data-id') || ''
      /* 自动埋点采集点击数据时,使用下面的建议*/
      if (!this.util.isNullOrEmpty(this.store.idTag) && dataId.indexOf(this.store.idTag) > -1) {
        this.setClickAc(node)
      }
      if (this.util.getObjectType(parentNode) !== this.util.getObjectType(document) && length < this.store.acbLength) {
        this.getACBtarget(parentNode, ++length)
      }
    }
  },
  setClickAc: function (e) { //元素点击数据保存
    var dataId = e.getAttribute('data-id') || ''
    if (this.util.isNullOrEmpty(dataId) && this.util.isNullOrEmpty(e.className)) {
      return
    }
    //主动埋点生效

    if (!this.util.isNullOrEmpty(this.store.idTag) && dataId.indexOf(this.store.idTag) < 0) {
      return
    }

    var ctime = this.util.getTimeStr()
    var zuid = this.util.getZuid()
    var clickData = {
      mid: this.store.storeClick,
      // path: this.util.getCookie(this.store.storePage),
      ctime: ctime,
      eleId: dataId,
      zuid: zuid, // 上报唯一标识
    }
    var sendData = this.util.extend(clickData, this.config)
    this.postData(sendData)
  },
  bindCodeHook: function () {
    var _this = this;
    window.addEventListener("unhandledrejection", function (e) { //防止Promise出错异常
      e.preventDefault();
      var codeErrData = {
        mid: _this.store.storeCodeErr,
        // path: _this.util.getCookie(_this.store.storePage),
        ctime: _this.util.getTimeStr(),
        errorType: e.reason.msg, //具体的错误信息
        ua: navigator.userAgent,
        line: '',
        col: '',
      };
      if (!!e.reason && !!e.reason.stack) {
        //可以直接使用堆栈信息
        codeErrData.err = e.reason.stack.toString();
      }
      _this.setCodeErrAc(codeErrData);
      return true;
    });
    window.onerror = function (msg, url, line, col, err) {
      if (_this.util.isNullOrEmpty(url)) {
        return true;
      }
      col = col || (window.event && window.event.errorCharacter) || 0;
      var codeErrData = {
        mid: _this.store.storeCodeErr,
        // path: _this.util.getCookie(_this.store.storePage),
        ctime: _this.util.getTimeStr(),
        errorType: msg, //具体的错误信息
        ua: navigator.userAgent,
        line: line,
        col: col,
      };
      if (!!err && !!err.stack) {
        //可以直接使用堆栈信息
        codeErrData.err = err.stack.toString();
      } else if (!!arguments.callee) {
        //尝试通过callee获取异常堆栈
        var errmsg = [];
        var f = arguments.callee.caller,
          c = 3; //防止堆栈信息过大
        while (f && (--c > 0)) {
          errmsg.push(f.toString());
          if (f === f.caller) {
            break;
          }
          f = f.caller;
        }
        errmsg = errmsg.join(",");
        codeErrData.err = errmsg;
      } else {
        codeErrData.err = "";
      }
      _this.setCodeErrAc(codeErrData);
    }
  },
  setPerformanceAc: function () {
    var _this = this;
    if (!!window.performance) {
      var _PerforMance = window.performance;
      var _Timing = _PerforMance.timing;
      if (_Timing) {
        var loadAcData = {
          mid: _this.store.storeTiming,
          ctime: _this.util.getTimeStr(),
          // path: _this.util.getCookie(_this.store.storePage),
          //connectEnd : _Timing.connectEnd,     //返回浏览器与服务器之间的连接建立时的Unix毫秒时间戳
          //connectStart : _Timing.connectStart, //返回HTTP请求开始向服务器发送时的Unix毫秒时间戳
          //domComplete:_Timing.domComplete,//返回当前文档解析完成时的Unix毫秒时间戳。
          //domContentLoadedEventEnd : _Timing.domContentLoadedEventEnd,//返回当所有需要立即执行的脚本已经被执行（不论执行顺序）时的Unix毫秒时间戳。
          //domContentLoadedEventStart : _Timing.domContentLoadedEventStart,//返回当解析器发送DOMContentLoaded 事件，即所有需要被执行的脚本已经被解析时的Unix毫秒时间戳。
          //domInteractive : _Timing.domInteractive,//返回当前网页DOM结构结束解析、开始加载内嵌资源时的Unix毫秒时间戳。
          //domLoading : _Timing.domLoading,//返回当前网页DOM结构开始解析的Unix毫秒时间戳。
          //domainLookupEnd: _Timing.domainLookupEnd, //表征了域名查询结束的UNIX时间戳。
          //domainLookupStart: _Timing.domainLookupStart, //表征了域名查询开始的UNIX时间戳。
          //fetchStart: _Timing.fetchStart, //表征了浏览器准备好使用HTTP请求来获取(fetch)文档的UNIX时间戳。这个时间点会在检查任何应用缓存之前。
          //loadEventEnd: _Timing.loadEventEnd,//返回当load事件结束，即加载事件完成时的Unix毫秒时间戳。
          //loadEventStart: _Timing.loadEventStart,//load事件被发送时的Unix毫秒时间戳。
          //navigationStart: _Timing.navigationStart,//准备加载新页面的起始时间
          //redirectEnd: _Timing.redirectEnd,  //表征了最后一个HTTP重定向完成时（也就是说是HTTP响应的最后一个比特直接被收到的时间）的UNIX时间戳
          //redirectStart: _Timing.redirectStart, //表征了第一个HTTP重定向开始时的UNIX时间戳
          //requestStart: _Timing.requestStart,//返回浏览器向服务器发出HTTP请求时（或开始读取本地缓存时）的Unix毫秒时间戳。
          //responseEnd: _Timing.responseEnd,//返回浏览器从服务器收到（或从本地缓存读取，或从本地资源读取）最后一个字节时的Unix毫秒时间戳。
          //responseStart: _Timing.responseStart,//返回浏览器从服务器收到（或从本地缓存读取）第一个字节时的Unix毫秒时间戳
          //secureConnectionStart: _Timing.secureConnectionStart,  //浏览器与服务器开始安全链接的握手时的Unix毫秒时间戳
          //unloadEventEnd: _Timing.unloadEventEnd,    //表征了unload事件处理完成时的UNIX时间戳
          //unloadEventStart: _Timing.unloadEventStart //表征了unload事件抛出时的UNIX时间戳
        };
        loadAcData.DNS = _Timing.domainLookupEnd - _Timing.domainLookupStart; //DNS查询时间
        loadAcData.TCP = _Timing.connectEnd - _Timing.connectStart; //TCP连接耗时
        loadAcData.WT = _Timing.responseStart - _Timing.navigationStart; //白屏时间
        loadAcData.PRDOM = _Timing.domComplete - _Timing.responseEnd; //dom解析耗时
        loadAcData.ONL = _Timing.loadEventEnd - _Timing.loadEventStart; //执行onload事件耗时
        loadAcData.DR = _Timing.domContentLoadedEventEnd - _Timing.navigationStart; //dom ready时间，脚本加载完成时间
        loadAcData.ALLRT = _Timing.responseEnd - _Timing.requestStart; //所有请求耗时
        loadAcData.FXHR = _Timing.fetchStart - _Timing.navigationStart; //第一个请求发起时间
        this.postData(loadAcData);
      }
    }
  },
  setCodeErrAc: function (data) {
    this.postData(data); //代码发生错误了，可能导致代码直接停止，直接上报一次
  },
  postData: function(data) {
    data.uid = data.uid || sessionStorage.getItem('uid')
    var _this = this
    _this._ajax({
      type: "GET",
      dataType: "json",
      contentType: "application/json",
      data: data,
      url: _this.store.sendUrl
    })
  },
  _ajax: function (options) {
    var xhr, params;
    options = options || {};
    options.type = (options.type || "GET").toUpperCase();
    options.dataType = (options.dataType || "json");
    options.async = (options.async || true);
    if (options.data) {
      params = options.data;
    }
    // 非IE6
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
      if (xhr.overrideMimeType) {
        xhr.overrideMimeType('text/xml');
      }
    } else { //IE6及其以下版本浏览器
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    if (options.type == "GET") {
      var str = ''
      for (var o in params) {
        str += o + "=" + params[o] + "&"
      }
      xhr.open("GET", options.url + "?" + str, options.async);
      xhr.send(null);
    } else if (options.type == "POST") {
      xhr.open("POST", options.url, options.async);
      xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
      if (params) {
        xhr.send(params);
      } else {
        xhr.send();
      }
    }
  }
}

window.dataCollect = dataCollect
