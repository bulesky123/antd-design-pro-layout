import React from 'react'
import { Table, Modal } from 'antd'

const { confirm } = Modal

export default () => {
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
      align: 'center',
    },
    {
      title: '菜单名称',
      dataIndex: 'age',
      key: 'age',
      align: 'center',
    },
    {
      title: '菜单icon',
      dataIndex: 'address',
      key: '1',
      align: 'center',
    },
    {
      title: '菜单地址',
      dataIndex: 'address',
      key: '2',
      align: 'center',
    },
    {
      title: '状态',
      dataIndex: 'address',
      key: '3',
      align: 'center',
    },
    {
      title: '开关',
      dataIndex: 'address',
      key: '4',
      align: 'center',
    },
    {
      title: '操作',
      key: 'operation',
      width: 150,
      align: 'center',
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
    })
  }
  return (
    <div>
      <Table columns={columns} dataSource={data} bordered />
    </div>
  )
}
