import React from 'react'
import { BrowserRouter, Router, Route, Switch, Redirect } from 'react-router-dom'
import { Loading } from 'components'
import { history } from 'utils'
import asyncLoad from './async-load'
import Layout from './pro-layout'
import NoFoundPage from '../pages/404'
import routeConfigs, { lang } from './configs'

export default (props) => {
  const { routes, showMenu, isLogin } = props
  const userLayoutConfig = routeConfigs.filter(item => item.layout)
  const proLayoutConfig = routeConfigs.filter(item => !item.layout)
  const exact = true
  return (
    <BrowserRouter>
      <Router history={history}>
        <Route render={() => (
          <div id="setting" style={{ width: '100%', height: '100%' }}>
            <Switch>
              <Route exact={exact} path="/" render={() => <Redirect to="/login" />} />
              {
              userLayoutConfig.map(item => (
                <Route
                  key={item.path}
                  path={item.path}
                  exact={exact}
                  title={item.title ? item.title : ''}
                  component={asyncLoad(item.import, <Loading />, { ...item, isLogin })}
                />
              ))
            }
              <Layout lang={lang} routes={routes} showMenu={showMenu} >
                <Switch>
                  {
                proLayoutConfig.map(item => (
                  <Route
                    key={item.path}
                    path={item.path}
                    exact={exact}
                    title={item.title ? item.title : ''}
                    component={asyncLoad(item.import, <Loading />, { ...item, isLogin })}
                  />
                ))
              }
                  <Route render={() => <NoFoundPage {...props} />} />
                </Switch>
              </Layout>
            </Switch>
          </div>
      )}
        />
      </Router>
    </BrowserRouter>
  )
}
