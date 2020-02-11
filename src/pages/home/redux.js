import { Tools } from 'utils'
import { login } from './api'

const UPDATE = 'UPDATE-LOGIN'

const initState = {
  init: false,
}

export const userLogin = (state = initState, action) => {
  switch (action.type) {
    case UPDATE:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}

export const loginUpdate = params => ({
  payload: params,
  type: UPDATE,
})

export const valueChange = (name, value) => (dispatch) => {
  dispatch(loginUpdate({
    [name]: value,
  }))
}

// 清空手机号
export const clearMobile = () => (dispatch) => {
  dispatch(loginUpdate({
    mobile: '',
  }))
}


export const doLogin = (params, callback) => async (dispatch, getState) => {
  const { mobile, smsCode } = getState().userLogin

  // 用户登录
  try {
    const config = await login({
      mobile,
      code: smsCode,
      open_id: params.open_id,
    })
    // 存储到用户token 到 localStorage
    Tools.setUserInfo(config.data)
    const tokenMes = config.data.token
    dispatch(loginUpdate({ token: tokenMes }))
    callback && callback()
  } catch ({ err }) {
    callback && callback({ err })
  }
}
