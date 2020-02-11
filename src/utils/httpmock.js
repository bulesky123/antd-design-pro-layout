import axios from 'axios'
import { URL } from '@/config'
import { Toast } from 'components'

const successCode = '0000'
const instance = axios.create({
  baseURL: URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'MALLY-USER-TOKEN': 'AAA',
    'ZBuy-ProductLine': 'pl-zbsc-app',
    'MALLY-USER-LANG': sessionStorage.getItem('lan') || 'zh_CN',
  },
})

const promiseFun = (method, url, params, resolve, reject) => {
  instance[method](url, params).then(({ data }) => {
    if (data.retCode === successCode) {
      const { retObject } = data
      resolve({ data: retObject })
    } else {
      Toast.info(data.retMsg)
      reject({ err: data.retMsg, code: data.retCode })
    }
  }).catch((err) => {
    const errorMsg = JSON.stringify(err)
    Toast.info('无法连接服务器,请检查您的网络连接')
    reject({ err: errorMsg })
  })
}

export default class HttpMock {
  // 初始化拦截器
  static init() {
    // 拦截请求
    instance.interceptors.request.use((config) => {
      const token = sessionStorage.getItem('token')
      if (token) {
        config.headers['MALLY-USER-TOKEN'] = token
      }
      const channel = sessionStorage.getItem('channel') || 'sc1000000004'
      config.headers['ZBuy-Channel'] = channel
      // let qs = config.url.includes('?') ? '&' : '?'
      // qs += 'bl='
      // qs += sessionStorage.getItem('lan')
      // config.url += qs
      return config
    })
    // 拦截响应
    instance.interceptors.response.use(config => config)
  }

  // get 方法封装
  static get(url) {
    return new Promise((resolve, reject) => {
      promiseFun('get', url, {}, resolve, reject)
    })
  }

  // post 方法封装
  static post(url, params = {}) {
    return new Promise((resolve, reject) => {
      promiseFun('post', url, params, resolve, reject)
    })
  }
}
