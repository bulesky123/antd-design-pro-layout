import { Tools, history } from 'utils'
import { login } from '../../pages/login/api'
import { getRoutesByToken } from './api'

// Actions
const UPDATE = 'GLOBAL_UPDATE'

// Reducer
const initState = {
  init: false,
  token: '',
  isLogin: false,
  showMenu: true,
  routes: [],
}

export const global = (state = initState, action) => {
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

// Action Creators
export const globalUpdate = params => ({
  payload: params,
  type: UPDATE,
})

export const getRoutes = ({ username, password }) => async (dispatch) => {
  const { data } = await login({ username, password })
  const { token, routes } = data
  sessionStorage.setItem('token', token)
  dispatch(globalUpdate({
    routes,
    token,
    showMenu: true,
  }))
}

export const getAuthRoutes = () => async (dispatch) => {
  try {
    const token = Tools.getUserInfo('token')
    if (token) {
      const { data } = await getRoutesByToken()
      const { routes } = data
      dispatch(globalUpdate({
        routes,
        init: true,
        isLogin: true,
      }))
      return
    }
    dispatch(globalUpdate({
      init: true,
      isLogin: false,
    }))
    history.replace('/login')
  } catch (e) {
    console.log(e)
    dispatch(globalUpdate({ init: true }))
  }
}

