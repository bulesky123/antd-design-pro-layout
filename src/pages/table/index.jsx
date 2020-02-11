import React from 'react'
import { Table, Modal, Button, Tree } from 'antd'
import { history } from 'utils'
import styles from './index.less'

const { confirm } = Modal
const { TreeNode } = Tree

const treeData = [{
  name: '首页',
  icon: 'smile',
  path: '/home',
  key: '/home',
  exact: true,
  routes: [],
  children: [],
  parentKeys: [
    '/',
  ],
}, {
  name: '示例展示',
  icon: 'menu',
  hideInMenu: false,
  path: '/data',
  key: '/data',
  exact: true,
  routes: [{
    name: '图表展示',
    path: '/data/echart',
    icon: 'smile',
    key: '/data/analysis',
    exact: true,
    routes: [],
  }, {
    name: '表格展示',
    path: '/data/table',
    icon: 'smile',
    key: '/data/monitor',
    exact: true,
    routes: [],
  }, {
    name: '表单展示',
    path: '/data/from',
    icon: 'user',
    key: '/data/from',
    exact: true,
    routes: [],
  }],
}, {
  name: '权限管理',
  icon: 'menu',
  hideInMenu: false,
  path: '/auth',
  key: '/auth',
  exact: true,
  routes: [{
    name: '用户管理',
    path: '/auth/user',
    icon: 'smile',
    key: '/auth/user',
    exact: true,
    routes: [],
  }, {
    name: '角色管理',
    path: '/auth/rules',
    icon: 'smile',
    key: '/auth/rules',
    exact: true,
    routes: [],
  }, {
    name: '菜单管理',
    path: '/auth/menu',
    icon: 'user',
    key: '/auth/menu',
    exact: true,
    routes: [],
  }],
}, {
  name: '个人设置',
  path: '/user/setting',
  icon: 'setting',
  key: '/user/setting',
  exact: true,
  routes: [],
}, {
  path: 'https://www.baidu.com',
  name: '跳转外站',
  key: '/my',
  icon: 'pushpin',
  exact: true,
  routes: [],
  parentKeys: [
    '/',
  ],
}]

export default class Demo extends React.Component {
  state = {
    expandedKeys: ['/data', '/auth'],
    autoExpandParent: true,
    checkedKeys: [],
    selectedKeys: [],
  }
  onExpand = (expandedKeys) => {
    console.log('onExpand', expandedKeys)
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    })
  };

  onCheck = (checkedKeys) => {
    console.log('onCheck', checkedKeys)
    this.setState({ checkedKeys })
  };

  onSelect = (selectedKeys, info) => {
    console.log('onSelect', info)
    this.setState({ selectedKeys })
  };

  renderTreeNodes = data =>
    data.map((item) => {
      if (item.routes) {
        return (
          <TreeNode title={item.name} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.routes)}
          </TreeNode>
        )
      }
      return <TreeNode key={item.key} {...item} />
    });
  render() {
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
        title: 'Full Name',
        width: 100,
        dataIndex: 'name',
        key: 'name',
        fixed: 'left',
      },
      {
        title: 'Age',
        width: 100,
        dataIndex: 'age',
        key: 'age',
        fixed: 'left',
      },
      {
        title: 'Column 1',
        dataIndex: 'address',
        key: '1',
        width: 200,
      },
      {
        title: 'Column 2',
        dataIndex: 'address',
        key: '2',
        width: 200,
      },
      {
        title: 'Column 3',
        dataIndex: 'address',
        key: '3',
        width: 200,
      },
      {
        title: 'Column 4',
        dataIndex: 'address',
        key: '4',
        width: 150,
      },
      {
        title: 'Column 5',
        dataIndex: 'address',
        key: '5',
        width: 150,
      },
      {
        title: 'Column 6',
        dataIndex: 'address',
        key: '6',
        width: 150,
      },
      {
        title: 'Column 7',
        dataIndex: 'address',
        key: '7',
        width: 150,
      },
      { title: 'Column 8', dataIndex: 'address', key: '8' },
      {
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        width: 100,
        render: () => <Button onClick={showConfirm}>删除</Button>,
      },
    ]
    const data = []
    for (let i = 0; i < 100; i++) {
      data.push({
        key: i,
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`,
      })
    }
    return (
      <div>
        <Button onClick={() => history.push('/home')}>跳转页面啊</Button>
        <div>
          <Tree
            checkable
            onExpand={this.onExpand}
            expandedKeys={this.state.expandedKeys}
            autoExpandParent={this.state.autoExpandParent}
            onCheck={this.onCheck}
            checkedKeys={this.state.checkedKeys}
            onSelect={this.onSelect}
            selectedKeys={this.state.selectedKeys}
          >
            {this.renderTreeNodes(treeData)}
          </Tree>
        </div>
        <div className={styles['table-container']}>
          <Table columns={columns} dataSource={data} bordered scroll={{ x: 1000, y: 600 }} />
        </div>
      </div>
    )
  }
}
