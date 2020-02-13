import React from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styles from './index.less'
// import { history } from 'utils'
import { getRoutes } from '../global/redux'


@connect(
  state => ({
    ...state.global,
  }),
  dispatch => bindActionCreators({
    getRoutes,
  }, dispatch),
)

class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.goHome({ username: values.username, password: values.password })
      }
    })
  }
  goHome = async ({ username, password }) => {
    await this.props.getRoutes({ username, password })
    this.props.history.replace('/home')
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className={styles['from-container']}>
        <Form onSubmit={this.handleSubmit} className={styles['login-form']}>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(<Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(<Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>Remember me</Checkbox>)}
            <span className={styles['login-form-forgot']} href="">Forgot password</span>
            <Button type="primary" htmlType="submit" className={styles['login-form-button']}>
              Log in
            </Button>
            Or <span className={styles.color}>register now!</span>
          </Form.Item>
        </Form>
      </div>

    )
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm)

export default WrappedNormalLoginForm
