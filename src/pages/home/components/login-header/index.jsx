
import React from 'react'
import styles from './index.less'
import bg from './images/bg.png'

export default class LoginHeader extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    return (
      <div className={styles['login-header']}>
        <p className={styles['login-msg']}>注册/登录</p>
        <img className={styles['login-bg']} src={bg} alt="背景图" />
      </div>
    )
  }
}
