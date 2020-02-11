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
      width: 100,
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '用户名',
      width: 100,
      dataIndex: 'age',
      key: 'age',
      align: 'center',
    },
    {
      title: '所属组别',
      dataIndex: 'address',
      key: '1',
      width: 200,
      align: 'center',
    },
    {
      title: 'Email',
      dataIndex: 'address',
      key: '2',
      width: 200,
      align: 'center',
    },
    {
      title: '状态',
      dataIndex: 'address',
      key: '3',
      width: 200,
      align: 'center',
    },
    {
      title: '最后登录时间',
      dataIndex: 'address',
      key: '4',
      width: 150,
      align: 'center',
    },
    {
      title: '操作',
      key: 'operation',
      width: 100,
      align: 'center',
      render: () => <div><a href=" " onClick={showConfirm}>编辑</a><a href=" " onClick={showConfirm}>删除</a></div>,
    },
  ]
  const data = []
  for (let i = 0; i < 18; i++) {
    data.push({
      key: i,
      name: `Edrward ${i}`,
      age: 32,
      address: `London Park no. ${i}`,
    })
  }
  return (
    <div>
      <Table columns={columns} dataSource={data} bordered />
    </div>
  )
}
