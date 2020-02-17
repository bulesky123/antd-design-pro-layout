/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useRef } from 'react'
import { Modal, Divider, Button } from 'antd'
import { PageHeaderWrapper } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
import { PlusOutlined } from '@ant-design/icons'
import { history } from 'utils'
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
      title: '人群编号',
      width: 100,
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '人群名称',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '人群数量',
      dataIndex: 'groups_text',
      key: 'groups_text',
      hideInSearch: true,
    },
    {
      title: '拆分比例',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '人群定向',
      dataIndex: 'status',
      key: 'status',
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'logintime',
      key: 'logintime',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '数据更新时间',
      dataIndex: 'logintime',
      key: 'logintime',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '编辑人',
      dataIndex: 'groups_text',
      key: 'groups_text',
      hideInSearch: true,
    },
    {
      title: '操作',
      key: 'operation',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => <div><a onClick={() => { setUpdateValues({ ...record, Modaltitle: '编辑用户' }); handleModalVisible(true) }}>人群透视</a><Divider type="vertical" /><a onClick={() => { setUpdateValues({ ...record, Modaltitle: '编辑用户' }); handleModalVisible(true) }}>编辑</a><Divider type="vertical" /><a onClick={() => showConfirm(record)}>删除</a></div>,
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
        // rowSelection={{}}
        toolBarRender={() => [
          <Button type="primary" onClick={() => history.push('/add/label')}>
            <PlusOutlined /> 新建标签人群
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
