/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useRef } from 'react'
import { Modal, Divider, Button } from 'antd'
import { PageHeaderWrapper } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
import { PlusOutlined } from '@ant-design/icons'
import { getUserList } from './api'

const { confirm } = Modal

export default () => {
  const [sorter, setSorter] = useState({})
  const actionRef = useRef()
  const showConfirm = () => {
    confirm({
      title: '提示',
      content: '是否确实删除啊',
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
        }).catch(() => console.log('Oops errors!'))
      },
      onCancel() { },
    })
  }
  const columns = [
    {
      title: 'ID',
      width: 100,
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      sorter: true,
    },
    {
      title: '所属组别',
      dataIndex: 'groups_text',
      key: 'groups_text',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        normal: {
          text: '成功',
          status: 'Success',
        },
        4: {
          text: '运行中',
          status: 'Processing',
        },
      },
      key: 'status',
    },
    {
      title: '最后登录时间',
      dataIndex: 'logintime',
      key: 'logintime',
    },
    {
      title: '操作',
      key: 'operation',
      dataIndex: 'option',
      valueType: 'option',
      render: () => <div><a onClick={showConfirm}>编辑</a><Divider type="vertical" /><a onClick={showConfirm}>删除</a></div>,
    },
  ]
  return (
    <PageHeaderWrapper>
      {/* <Table columns={columns} dataSource={data} bordered /> */}
      <ProTable
        request={params => getUserList(params)}
        headerTitle="用户管理"
        rowKey="key"
        actionRef={actionRef}
        onChange={(_, _filter, _sorter) => {
          setSorter(`${_sorter.field}_${_sorter.order}`)
        }}
        params={{
          sorter,
        }}
        columns={columns}
        rowSelection={{}}
        toolBarRender={() => [
          <Button type="primary" onClick={showConfirm}>
            <PlusOutlined /> 新建
          </Button>,
        ]}
      />
    </PageHeaderWrapper>
  )
}
