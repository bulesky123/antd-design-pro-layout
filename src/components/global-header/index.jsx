
import React from 'react'
import UserSetting from './user-setting'
import UserLang from './user-lang'
import styles from './index.less'

export default props => (
  <div className={`${styles['head-box']} ${props.layout === 'topmenu' && props.navTheme === 'dark' ? styles.colorFFF : ''}`}>
    <UserSetting {...props} />
    <UserLang {...props} />
  </div>
)
