/*eslint-disable*/
/**
 * @param obj
 * 判断数据是否为空
 */
let isNullOrEmpty = function(obj) {
    var result = (obj == null || obj == undefined || obj == "" || obj == "null" || obj == "undefined" || typeof obj == "undefined");
    if (result && (obj != 0 || obj != "0")) {
        return result;
    } else {
        return false;
    }
};

/**
 * @param name   url参数名
 * 获取当前链接中指定名字的参数
 */
let getParam = function(name) {
        var values = decodeURIComponent((location.search.match(RegExp("[?|&|/]" + name + '=([^/\&|?&]+)')) || [, null])[1]);
        if (isNullOrEmpty(values)) {
            values = decodeURIComponent((location.hash.match(RegExp("[?|&|/]" + name + '=([^\&|?&]+)')) || [, null])[1]);
        }
        return isNullOrEmpty(values) || values == "null" ? "" : values;
    }

const init = function(opt){
    Object.assign(tools, opt);
}
   
let tools = {
    init,
    isNullOrEmpty,
    getParam,
};

module.exports = tools;