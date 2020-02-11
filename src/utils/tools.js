export default class Tools {
  static debounce(fn, interval = 600) {
    let timeout = null
    return function () {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        fn.apply(this, arguments)
      }, interval)
    }
  }

  static getParameterByName(name) {
    let values = decodeURIComponent((location.search.match(RegExp("[?|&|/]" + name + '=([^\&|?&]+)')) || [, null])[1])// eslint-disable-line
    if (this.isNullOrEmpty(values)) {
        values = decodeURIComponent((location.hash.match(RegExp("[?|&|/]" + name + '=([^\&|?&]+)')) || [, null])[1])// eslint-disable-line
    }
    return this.isNullOrEmpty(values) || values === 'null' ? '' : values
  }

  // 手机号隐藏中间四位
  static mobileCode(mobile) {
    return mobile.replace(/^(\d{3})\d{4}(\d+)/, '$1****$2')
  }
  // 只能输入汉字
  static chineseMes(str) {
    if (!str) {
      return ''
    }
    return str.replace(/[^\u4E00-\u9FA5]/g, '')
  }
  // 只能输入数字
  static Num(num) {
    if (!num) {
      return ''
    }
    return num.replace(/[^\d]/g, '')
  }
  static setBankCardNum(str) {
    return str.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, '$1 ')
  }
  static trim(str) {
    return str.replace(/\s/g, '')
  }
  static validate(str, type) {
    str = str.replace(/\s+/g, '')
    let reg
    switch (type) {
      case 'mobile':
        reg = /^(1[3|4|5|6|7|8|9][0-9])\d{8}$/
        break
      case 'num':
        reg = /^\d*$/
        break
      case 'date':
        reg = /^((((19|20)\d{2})-(0?[13-9]|1[012])-(0?[1-9]|[12]\d|30))|(((19|20)\d{2})-(0?[13578]|1[02])-31)|(((19|20)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))-0?2-29))$/
        break
      default: {
        reg = /^(1[3|5|6|4|8|7][0-9])\d{8}$/
      }
    }
    return reg.test(str)
  }
  /* eslint-disable */
  static validateIdCard(idcard) {
    idcard = idcard.toUpperCase()
    const length = idcard.length
    let AI
    let year
    let month
    let day
    // 判断身份证是否是15位或18位
    if (length !== 15 && length !== 18) {
      // 身份证长度不对
      return false
    }
    // 18位身份证前17位数字，如果是15位的身份证所有号码都是数字
    if (length === 18) {
      AI = idcard.substring(0, 17)
    } else if (length === 15) {
      AI = `${idcard.substring(0, 6)}19${idcard.substring(6, 15)}`
    }
    if (!this.validate(AI, 'num')) {
      // 不为纯数字
      return false
    }
    year = AI.substring(6, 10) // 年份
    month = AI.substring(10, 12) // 月份
    day = AI.substring(12, 14) // 天
    if(!this.validate(`${year}-${month}-${day}`, 'date')) {
      return false
    }
      var cityCode={
        "11":"bj","12":"tj","13":"hb","14":"sx","15":"nm","21":"ln","22":"jl","23":"hlj","31":"sh","32":"js",
        "33":"zj","34":"ah","35":"fj","36":"jx","37":"sd","41":"henan","42":"hubei","43":"hunan","44":"gd",
        "45":"gx","46":"hainan","50":"cq","51":"sc","52":"gz","53":"yn","54":"xz","61":"ssx","62":"gs",
        "63":"qh","64":"nx","65":"xj","71":"tw","81":"xg","82":"am","91":"gw"
      };
      if(2016 - year > 150 || 2016 - year < 0) {
        return false
      }
      if(20161012 - (year + "" + month + day) <0 ) {
        return false
      }
      if(!cityCode[AI.substring(0, 2)]) {
        return false
      }
      if(length === 18 && (!this.isVarifyCode(AI, idcard))) {
        return false
      }
    return true
  }
  static luhm(bankno) {
    var lastNum = bankno.substr(bankno.length - 1, 1);//取出最后一位（与luhm进行比较）
    var first15Num = bankno.substr(0, bankno.length - 1);//前15或18位
    var newArr = new Array();
    for (var i = first15Num.length - 1; i > -1; i--) {    //前15或18位倒序存进数组
        newArr.push(first15Num.substr(i, 1));
    }
    var arrJiShu = new Array();  //奇数位*2的积<9
    var arrJiShu2 = new Array(); //奇数位*2的积>9
    var arrOuShu = new Array();  //偶数位数组
    for (var j = 0; j < newArr.length; j++) {
        if ((j + 1) % 2 == 1) {//奇数位
            if (parseInt(newArr[j]) * 2 < 9)
                arrJiShu.push(parseInt(newArr[j]) * 2);
            else
                arrJiShu2.push(parseInt(newArr[j]) * 2);
        }
        else //偶数位
            arrOuShu.push(newArr[j]);
    }
    var jishu_child1 = new Array();//奇数位*2>9 的分割之后的数组个位数
    var jishu_child2 = new Array();//奇数位*2>9 的分割之后的数组十位数
    for (var h = 0; h < arrJiShu2.length; h++) {
        jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
        jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
    }
    var sumJiShu = 0; //奇数位*2< 9 的数组之和
    var sumOuShu = 0; //偶数位数组之和
    var sumJiShuChild1 = 0; //奇数位*2>9 的分割之后的数组个位数之和
    var sumJiShuChild2 = 0; //奇数位*2>9 的分割之后的数组十位数之和
    var sumTotal = 0;
    for (var m = 0; m < arrJiShu.length; m++) {
      sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
    }
    for (var n = 0; n < arrOuShu.length; n++) {
        sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
    }
    for (var p = 0; p < jishu_child1.length; p++) {
        sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
        sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
    }
    //计算总和
    sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2);
    //计算Luhm值
    var k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10;
    var luhm = 10 - k;
    return lastNum == luhm;
  }
  static isVarifyCode(AI, idstr) {
    const varifyCode = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"]
    const wi = ["7", "9", "10", "5", "8", "4", "2", "1", "6", "3", "7", "9", "10", "5", "8", "4", "2"]
    let sum = 0
    for (let i = 0; i < 17; i++) {
        sum += AI[i] * wi[i]
    }
    let modValue = sum % 11
    AI = AI+""+varifyCode[modValue]
    if (!(AI==idstr)) {
        return false
    }
    return true
  }
  static formatMoney(money) {
    if (Object.is(money * 1, NaN)) {
      return money
    }
    if (!this.isNullOrEmpty(money)) {
      // return (money * 1).toFixed(2)
      return (money * 1)
    }
    return '0.00'
  }

  static formatNumber(num) {
    if (!num) {
      return null
    }
    return num.replace(/(.{4})/g, '$1 ')
  }
  static isNullOrEmpty(obj) {
    const result = (obj == null || obj === 'null' || obj === undefined || obj === 'undefined' || typeof obj === 'undefined' || obj === '' || JSON.stringify(obj) === '{}' || JSON.stringify(obj) === '[]')
    if (result && (obj !== 0 || obj !== '0')) {
      return result
    }
    return false
  }
  static add = function (a, b) {
    let c
    let d
    let e
    try {
      c = a.toString().split('.')[1].length
    } catch (f) {
      c = 0
    }
    try {
      d = b.toString().split('.')[1].length
    } catch (f) {
      d = 0
    }
    return e = Math.pow(10, Math.max(c, d)), ( this.mul(a, e) + this.mul(b, e)) / e   // eslint-disable-line
  }
  static sub = function (a, b) {
    let c
    let d
    let e
    try {
      c = a.toString().split('.')[1].length
    } catch (f) {
      c = 0
    }
    try {
      d = b.toString().split('.')[1].length
    } catch (f) {
      d = 0
    }
    return e = Math.pow(10, Math.max(c, d)), (this.mul(a, e) - this.mul(b, e)) / e  // eslint-disable-line
  }
  static mul = function (a, b) {
    if (a === undefined || b === undefined) {
      return NaN
    }
    let c = 0
    const d = a.toString()
    const e = b.toString()
    try {
      c += d.split('.')[1].length
    } catch (f) {} // eslint-disable-line
    try {
      c += e.split('.')[1].length
    } catch (f) {} // eslint-disable-line
    return Number(d.replace('.', '')) * Number(e.replace('.', '')) / Math.pow(10, c) // eslint-disable-line
  }
  static div=function (a, b) {
    let c
    let d
    let e = 0
    let f = 0
    try {
      e = a.toString().split('.')[1].length
    } catch (g) {} // eslint-disable-line
    try {
      f = b.toString().split('.')[1].length
    } catch (g) {} // eslint-disable-line
    return c = Number(a.toString().replace('.', '')), d = Number(b.toString().replace('.', '')), mul(c / d, Math.pow(10, f - e)) // eslint-disable-line
  }

  /* eslint-disable */
  static setUserInfo(data){
    data.token ? sessionStorage.setItem('token',data.token) : null
  }

  static getUserInfo(key){
    if (!key) {
      return ''
    }
    return sessionStorage.getItem(key)
  }
  
}
