/* eslint-disable react/jsx-indent */
import React from 'react'
import { Modal, Form, Select, Input, Radio, Row, Col } from 'antd'
import styles from './index.less'

const { Option } = Select


class CreateForm extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form
    const {
      modalVisible, onSubmit, onCancel, values = {},
    } = this.props
    const okHandle = async () => {
      this.props.form.validateFields(async (err, fieldsValue) => {
        if (err) {
          return
        }
        console.log(fieldsValue)
        await onSubmit(fieldsValue)
      })
    }
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    }
    return (
      <Modal
        destroyOnClose
        title={values.Modaltitle || '添加用户'}
        visible={modalVisible}
        okText="确认"
        cancelText="取消"
        onOk={okHandle}
        onCancel={() => onCancel()}
      >
        <Form {...formItemLayout}>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label="所属组别">
              {
                getFieldDecorator('groups_text', {
                  rules: [{ required: true, message: '请选择组' }],
                  initialValue: values.groups_text,
                })(<Select
                  placeholder="请选择组"
                  onChange={this.handleSelectChange}
                >
                  <Option value="dsp规则组">dsp规则组</Option>
                  <Option value="admin">超级管理员</Option>
                   </Select>)
              }
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="用户名">
              {getFieldDecorator('username', {
                rules: [{ required: true, message: '请输入用户名!' }],
                initialValue: values.username,
              })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Email">
              {getFieldDecorator('email', {
                rules: [{ required: true, message: '请输入邮箱!' }],
                initialValue: values.email,
              })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="昵称">
              {getFieldDecorator('nickname', {
                rules: [{ required: true, message: '请输入昵称!' }],
                initialValue: values.nickname,
              })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="密码">
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码!' }],
                initialValue: values.password,
              })(<Input type="password" />)}
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="状态" className={styles['text-center']}>
            {getFieldDecorator('status', {
              rules: [{ required: true, message: '请选择状态!' }],
              initialValue: values.status,
            })(<Radio.Group>
              <Radio value="normal">正常</Radio>
              <Radio value="hidden">隐藏</Radio>
               </Radio.Group>)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}
const WrappedCreateForm = Form.create({ name: 'coordinated' })(CreateForm)

export default WrappedCreateForm
