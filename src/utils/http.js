import axios from 'axios'
import { history, Tools } from 'utils'
import { URL } from '@/config'
import { Toast } from 'components'
import store from '../stores'
import { globalUpdate } from '../pages/global/redux'

const successCode = 200
const tokenOverdueCode = -1002 // token过期，重新登录
const tokenNullCode = -1003
const instance = axios.create({
  baseURL: URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

const promiseFun = (method, url, params, resolve, reject) => {
  instance[method](url, params).then(({ data }) => {
    if (data.code === successCode) {
      resolve(data.data)
    } else if (data.code === tokenOverdueCode || data.code === tokenNullCode) {
      const redirect = window.location.hash ? window.location.hash.replace(/[#]/g, '') : ''
      if (redirect !== '/login') {
        store.dispatch(globalUpdate({ redirect }))
        history.push('/login')
      }
      reject({ err: data.msg, code: data.code })
    } else {
      Toast.info(data.msg)
      reject({ err: data.msg, code: data.code })
    }
  }).catch((err) => {
    const errorMsg = JSON.stringify(err)
    Toast.info('无法连接服务器,请检查您的网络连接')
    reject({ err: errorMsg })
  })
}

const promiseFunInit = (method, url, params, resolve, reject) => {
  instance[method](url, params).then(({
    data,
  }) => {
    resolve({
      data,
    })
  }).catch((err) => {
    const errorMsg = JSON.stringify(err)
    Toast.info('无法连接服务器,请检查您的网络连接')
    reject({
      err: errorMsg,
    })
  })
}
export default class Http {
  // 初始化拦截器
  static init() {
    // 拦截请求
    instance.interceptors.request.use((config) => {
      const token = Tools.getUserInfo('token')
      if (token) {
        config.headers['HTTP-TOKEN'] = token
      }
      // config.headers.CHANNEL = Tools.getChannel()
      return config
    })
    // 拦截响应
    instance.interceptors.response.use(config => config)
  }

  // get 方法封装
  static get(url, params = {}) {
    let urlParams = ''
    if (Object.keys(params).length > 0) {
      url += url.indexOf('?') > -1 ? '' : '?'
      let paramsKey = []
      paramsKey = Object.keys(params)
      for (let key = 0; key < paramsKey.length; key++) {
        url = `${url}${paramsKey[key]}=${params[paramsKey[key]]}&`
      }
      urlParams = url.substring(0, url.length - 1)
    } else {
      urlParams = url
    }
    return new Promise((resolve, reject) => {
      promiseFun('get', urlParams, {}, resolve, reject)
    })
  }

  // post 方法封装
  static post(url, params = {}) {
    return new Promise((resolve, reject) => {
      promiseFun('post', url, params, resolve, reject)
    })
  }
  // _get 方法封装(对结果未做任何处理)
  static _get(url, params = {}) {
    let urlParams = ''
    if (Object.keys(params).length > 0) {
      url += url.indexOf('?') > -1 ? '' : '?'
      let paramsKey = []
      paramsKey = Object.keys(params)
      for (let key = 0; key < paramsKey.length; key++) {
        url = `${url}${paramsKey[key]}=${params[paramsKey[key]]}&`
      }
      urlParams = url.substring(0, url.length - 1)
    } else {
      urlParams = url
    }
    return new Promise((resolve, reject) => {
      promiseFunInit('get', urlParams, {}, resolve, reject)
    })
  }
  // _post 方法封装(对结果未做任何处理)
  static _post(url, params = {}) {
    return new Promise((resolve, reject) => {
      promiseFun('post', url, params, resolve, reject)
    })
  }
}
