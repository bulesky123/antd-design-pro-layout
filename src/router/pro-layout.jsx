import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ProLayout, { DefaultFooter, SettingDrawer } from '@ant-design/pro-layout'
import { Icon } from 'antd'
import { Header } from 'components'

export default (props) => {
  const { routes, lang } = props
  const [settings, setSettings] = useState({
    navTheme: 'dark',
    primaryColor: 'daybreak',
    layout: 'sidemenu',
    contentWidth: 'Fluid',
    fixedHeader: false,
    autoHideHeader: false,
    fixSiderbar: false,
    menu: {
      locale: true,
    },
  })
  const menuDataRender = menuList =>
    menuList.map((item) => {
      const localItem = { ...item, children: item.children ? menuDataRender(item.children) : [] }
      return localItem
    })
  return (
    <ProLayout
      title={language['数据管理平台']}
      defaultSelectedKeys={['1']}
      // headerRender={!showMenu ? false : undefined}
      // menuRender={(_, dom) => (!showMenu ? null : dom)} // 控制菜单是否显示
      route={{ // pro 显示的路由信息
        routes,
      }}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (menuItemProps.isUrl || menuItemProps.children || !menuItemProps.path) {
          return defaultDom
        }
        if (menuItemProps.path.indexOf('http') > -1) {
          return <a href={menuItemProps.path}><Icon type={menuItemProps.icon} />{defaultDom}</a>
        }
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        return <Link to={menuItemProps.path}>{defaultDom}</Link>
      }} // 菜单显示的内容
      footerRender={() => (
        <DefaultFooter
          links={[
            { key: '1', title: '', href: '' },
            { key: '2', title: '', href: '' },
          ]}
          copyright={language['360金融数据AI中台部-系统工程组']}
        />
      )}
      rightContentRender={settingProps =>
        (routes.length > 0 ? (
          <Header lang={lang} {...settingProps} />
        ) : null)
      }
      menuDataRender={menuDataRender}
      {...settings}
    >
      {/* <PageHeaderWrapper /> */}
      {props.children}
      <SettingDrawer
        getContainer={() => document.getElementById('setting')}
        settings={settings}
        onSettingChange={config => setSettings(config)}
      />
    </ProLayout>
  )
}
