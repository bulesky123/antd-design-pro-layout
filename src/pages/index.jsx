import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Http } from 'utils'
import RouterMap from '@/router'
import { getAuthRoutes } from './global/redux'

@connect(
  state => ({ ...state.global }),
  dispatch => bindActionCreators({
    getAuthRoutes,
  }, dispatch),
)
class AuthComponent extends React.Component {
  componentWillMount() {
    // http拦截初始化
    Http.init()
  }
  componentDidMount() {
    // 获取用户的open_id 以及用户信息
    this.props.getAuthRoutes()
  }
  render() {
    const {
      init, routes, showMenu, children, isLogin,
    } = this.props
    const child = React.cloneElement(children, { routes, showMenu, isLogin })
    return init ? child : null
  }
}

export default () => (
  <AuthComponent >
    <RouterMap />
  </AuthComponent>
)

