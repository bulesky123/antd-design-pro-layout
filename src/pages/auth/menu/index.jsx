import React, { useState, useRef } from 'react'
import { Modal, Button, Switch } from 'antd'
import { PageHeaderWrapper } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
import { PlusOutlined } from '@ant-design/icons'

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
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '菜单名称',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '菜单icon',
      dataIndex: 'address',
      key: '1',
    },
    {
      title: '菜单地址',
      dataIndex: 'address',
      key: '2',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: '3',
      valueEnum: {
        0: {
          text: '关闭',
          status: 'Error',
        },
        1: {
          text: '运行中',
          status: 'Processing',
        },
        2: {
          text: '成功',
          status: 'Success',
        },
        3: {
          text: '运行中',
          status: 'Processing',
        },
      },
    },
    {
      title: '开关',
      dataIndex: 'checked',
      key: '4',
      render: (val) => {
        if (val === 1) {
          return <Switch size="small" checkedChildren="开" unCheckedChildren="关" defaultChecked />
        }
        return <Switch size="small" checkedChildren="开" unCheckedChildren="关" />
      },
    },
    {
      title: '操作',
      key: 'operation',
      dataIndex: 'option',
      valueType: 'option',
      render: () => <a href=" " onClick={showConfirm}>删除</a>,
    },
  ]
  const data = []
  for (let i = 0; i < 23; i++) {
    data.push({
      key: i,
      name: `Edrward ${i}`,
      age: 32,
      address: `London no. ${i}`,
      checked: Math.random() > 0.5 ? 1 : 0,
      status: Math.random() > 0.5 ? 1 : 3,
    })
  }
  return (
    <PageHeaderWrapper>
      <ProTable
        headerTitle="菜单管理"
        rowKey="key"
        actionRef={actionRef}
        onChange={(_, _filter, _sorter) => {
          setSorter(`${_sorter.field}_${_sorter.order}`)
        }}
        params={{
          sorter,
        }}
        columns={columns}
        dataSource={data}
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
