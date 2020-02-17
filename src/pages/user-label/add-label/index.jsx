/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Card, Steps, Icon, Divider } from 'antd'
import { PageHeaderWrapper } from '@ant-design/pro-layout'
import { Step1 } from './components'
import './index.less'

const { Step } = Steps


export default () => (
  <PageHeaderWrapper title="人群管理" content="新建or编辑标签">
    <Card bordered={false}>
      <Steps current={0}>
        <Step icon={<Icon type="solution" />} title="基本信息" description="请定义人群包名称及人群包数据刷新机制。例行刷新，每天特定时间进行人群包数据更新手动刷新，需人群包制定者手动更新数据是否入资源位，该人群包是否需要投放APP各资源位" />
        <Step icon={<Icon type="user" />} title="人群规则" description="根据用户不同属性、行为标签圈选指定的人群" />
        <Step icon={<Icon type="file-search" />} title="人群预览" description="确认圈选人群是否满足所需人群条件，及可以拆分对照组人群包" />
        <Step icon={<Icon type="trademark" />} title="触发渠道" description="指定特定渠道进行人群包精准投放" />
      </Steps>
      <Divider
        style={{
          margin: '40px 0 24px',
        }}
      />
      <Step1 />
    </Card>
  </PageHeaderWrapper>
)
