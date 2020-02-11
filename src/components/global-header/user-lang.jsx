import React from 'react'
import { Menu, Dropdown, Icon } from 'antd'
import styles from './index.less'

export default (props) => {
  const { lang } = props
  const getLang = (type = 'zh_CN') => {
    sessionStorage.setItem('lan', type)
    window.location.reload()
  }
  const menu = (
    <Menu>
      {
        lang && lang.map((item, index) => (
          <Menu.Item key={index} onClick={() => getLang(item.type)}>
            <span role="img" aria-label="简体中文">{item.icon}</span>
            <span className={styles.marginLeft8}>{item.name}</span>
          </Menu.Item>
        ))
      }
    </Menu>
  )
  return (
    <Dropdown overlay={menu}>
      <span className={styles['user-setting']}>
        <Icon type="global" />
      </span>
    </Dropdown>
  )
}
