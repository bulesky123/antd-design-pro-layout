
import React, { PureComponent } from 'react'
import { Form, Input, Radio, Row, Col, Button, Divider } from 'antd'
import { history } from 'utils'
import styles from './index.less'

class CreateForm extends PureComponent {
  render() {
    const { getFieldDecorator } = this.props.form
    const {
      values = {},
    } = this.props
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 9 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 15 },
      },
    }
    return (
      <div>
        <Form {...formItemLayout}>
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item label="人群名称" className={styles['text-center']}>
                {getFieldDecorator('nickname', {
                  rules: [{ required: true, message: '请输入昵称!' }],
                  initialValue: values.nickname,
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="刷新机制" className={styles['text-center']}>
                {getFieldDecorator('status', {
                rules: [{ required: true, message: '请选择状态!' }],
                initialValue: values.status,
              })(<Radio.Group><Radio value="例行">例行</Radio><Radio value="手动">手动</Radio></Radio.Group>)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="是否入资源位" className={styles['text-center']}>
                {
                  getFieldDecorator('status2', {
                    rules: [{ required: true, message: '请选择状态!' }],
                    initialValue: values.status,
                  })(<Radio.Group><Radio value="1">是</Radio><Radio value="0">否</Radio></Radio.Group>)
                }
              </Form.Item>
            </Col>
          </Row>
          <Divider
            style={{
          margin: '40px 0 24px',
        }}
          />
          <Row style={{ textAlign: 'right' }}>
            <Col span={24}>
              <Button onClick={() => history.go(-1)} style={{ marginLeft: 8 }}>返回列表</Button>
              <Button onClick={() => console.log(1)} style={{ marginLeft: 8 }}>下一步</Button>
            </Col>
          </Row>
        </Form>
      </div>
    )
  }
}

const WrappedCreateForm = Form.create()(CreateForm)

export default WrappedCreateForm
