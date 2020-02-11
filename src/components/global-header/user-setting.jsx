/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Link } from 'react-router-dom'
import { Menu, Dropdown, Avatar, Icon } from 'antd'
import { history } from 'utils'
import styles from './index.less'


export default () => {
  const menu = (
    <Menu>
      <Menu.Item>
        <Link to="/user/center">
          <Icon type="user" /><span className={styles.marginLeft8}>{language['表单展示']}</span>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/user/setting">
          <Icon type="setting" /><span className={styles.marginLeft8}>{language['个人设置']}</span>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <div onClick={() => { sessionStorage.removeItem('token'); history.replace('/login') }} to="/login">
          <Icon type="poweroff" /><span className={styles.marginLeft8}>{language['退出登录']}</span>
        </div>
      </Menu.Item>
    </Menu>
  )
  return (
    <Dropdown overlay={menu}>
      <span className={styles['user-setting']}>
        <Avatar src="https://avatars1.githubusercontent.com/u/8186664?s=460&v=4" />
        <span className={styles['user-name']}>{language['您好']}，Mr *飞</span>
      </span>
    </Dropdown>
  )
}
