import React from 'react'
import { PageHeaderWrapper } from '@ant-design/pro-layout'
import { Card, Typography, Alert, Button, Switch } from 'antd'
import { history } from 'utils'
import styles from './index.less'

const CodePreview = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
)

export default () => (
  <PageHeaderWrapper>
    <Button className={styles['go-btn']} onClick={() => history.push('/user/setting')}>测试跳转页面</Button>
    <Button type="primary" className={styles['go-btn']} onClick={() => history.push('/user/setting')}>测试跳转页面</Button>
    <Switch defaultChecked onChange={val => console.log(val)} />
    <Card>
      <Alert
        message="前端采用react16.12+react-redux+react-router(4+)+antd-design-pro-layout+webpack(4+)+antd-design+bizCharts布局，摒弃antd-design-pro复杂臃于功能，只留下antd-design 完美UI风格，webpack完全自主可配置"
        type="success"
        showIcon
        banner
        style={{
          margin: -12,
          marginBottom: 24,
        }}
      />
      <Typography.Text strong>
        <a target="_blank" rel="noopener noreferrer" href="/">启动项目 </a>
      </Typography.Text>
      <CodePreview> npm install</CodePreview>
      <CodePreview> npm run start</CodePreview>
      <Typography.Text
        strong
        style={{
          marginBottom: 12,
        }}
      >
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="/"
        >
          项目构建 测试环境 环境变量为rd
        </a>
      </Typography.Text>
      <CodePreview> npm run rd</CodePreview>
      <Typography.Text
        strong
        style={{
          marginBottom: 12,
        }}
      >
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="/"
        >
          项目构建 生产环境 环境变量为release
        </a>
      </Typography.Text>
      <CodePreview> npm run release</CodePreview>
      <Typography.Text
        strong
        style={{
          marginBottom: 12,
        }}
      >
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="/"
        >
          项目预览
        </a>
      </Typography.Text>
      <CodePreview> npm run preview</CodePreview>
    </Card>
    <p
      style={{
        textAlign: 'center',
        marginTop: 24,
      }}
    >
      Want to add more pages? Please refer to{' '}
      <a href="/" target="_blank" rel="noopener noreferrer">
        use block
      </a>
      。
    </p>
  </PageHeaderWrapper>
)
