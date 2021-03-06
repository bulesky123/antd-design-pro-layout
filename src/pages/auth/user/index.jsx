/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useRef } from 'react'
import { Modal, Divider, Button } from 'antd'
import { PageHeaderWrapper } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
import { PlusOutlined } from '@ant-design/icons'
import { CreateForm } from './components'
import { getUserList, addUser } from './api'

const { confirm } = Modal

export default () => {
  const [sorter, setSorter] = useState({})
  const [createModalVisible, handleModalVisible] = useState(false)
  const [updateValues, setUpdateValues] = useState({})
  const actionRef = useRef()
  const showConfirm = (record) => {
    confirm({
      title: '提示',
      content: '是否确实删除啊',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        console.log(record)
        if (actionRef.current) {
          actionRef.current.reload()
        }
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
        hidden: {
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
      valueType: 'dateTime',
    },
    {
      title: '操作',
      key: 'operation',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => <div><a onClick={() => { setUpdateValues({ ...record, Modaltitle: '编辑用户' }); handleModalVisible(true) }}>编辑</a><Divider type="vertical" /><a onClick={() => showConfirm(record)}>删除</a></div>,
    },
  ]
  return (
    <PageHeaderWrapper>
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
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新建
          </Button>,
        ]}
      />
      <CreateForm
        onSubmit={async (value) => {
          const success = await addUser(value)
          if (success) {
            handleModalVisible(false)
            if (actionRef.current) {
              actionRef.current.reload()
            }
          }
        }}
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
        values={updateValues}
      />
    </PageHeaderWrapper>
  )
}
