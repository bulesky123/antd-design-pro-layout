/*eslint-disable*/
import defaults from './defaults';
import languagePack from '@/FrameworkCustomize/languagePack';
import tools from '@/Framework/Tools';

const _config = defaults
const {isNullOrEmpty, getParam} = tools
const languageParamName = 'lan'
const init = function(opt){
    Object.assign(_config, opt);
}
const getLanguage = function(){
    let lan
    if(isNullOrEmpty(getParam(languageParamName))){
        if(!isNullOrEmpty(sessionStorage.getItem(languageParamName))){
            lan = sessionStorage.getItem(languageParamName);
        }else{
            lan = languagePack.defaults || _config.lan
            sessionStorage.setItem(languageParamName,lan)
        }
    }else{
        lan = getParam('lan');
        sessionStorage.setItem(languageParamName,lan);
    }
    return lan
}
let language = languagePack[getLanguage()]
language.getLanguage = getLanguage
language.init = init
module.exports = language