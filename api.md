# 接口文档
```

baseUrl: 待定

```

## 目录：

[1、登录](#1登录)<br/>
[2、用户token换菜单权限](#2用户token换菜单权限)<br/>
[3、用户管理--用户列表](#3用户管理--用户列表)<br/>
[4、用户管理--添加用户](#4用户管理--添加用户)<br/>
[5、用户管理--编辑用户](#5用户管理--编辑用户)<br/>
[6、用户管理--删除用户](#6用户管理--删除用户)<br/>
[7、用角色管理--角色列表](#7角色管理--角色列表)<br/>
[8、角色管理--菜单树](#8角色管理--菜单树)<br/>
[9、角色管理--添加角色](#9角色管理--添加角色)<br/>
[10、角色管理--编辑角色](#10角色管理--编辑角色)<br/>
[11、角色管理--删除角色](#11角色管理--删除角色)<br/>
[12、菜单管理--菜单列表](#12菜单管理--菜单列表)<br/>
[13、菜单管理--添加菜单](#13菜单管理--添加菜单)<br/>
[14、菜单管理--修改菜单](#14菜单管理--修改菜单)<br/>
[15、菜单管理--删除菜单](#15菜单管理--删除菜单)<br/>






## 接口列表：

### 1、登录

#### 请求URL:  
```
/user/login
```


#### 请求方式: 
```
POST
```

#### 参数类型：query

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|username      |Y       |string  |用户名|
|password      |Y       |string  |密码|
|captcha      |Y       |string  |验证码|

#### 返回示例：

```javascript
{
    code: 200,
    retMsg: '调用成功',
    data: {
      token: 'AAA', // 用户登录的token
      rules: 'admin', // 用户的角色 admin user 
      routes: [{ // 该用户能看见的菜单
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
          routes: null,
        }, {
          name: '角色管理',
          path: '/auth/rules',
          icon: 'smile',
          key: '/auth/rules',
          exact: true,
          routes: null,
        }, {
          name: '菜单管理',
          path: '/auth/menu',
          icon: 'user',
          key: '/auth/menu',
          exact: true,
          routes: null,
        }],
      }],
    },
  }
```

### 2、用户token换菜单权限

#### 请求URL:  
```
/user/withtoken
```


#### 请求方式: 
```
POST
```

#### 参数类型：query

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|token      |Y       |string  |用户token|

#### 返回示例：

```javascript
{
    code: 200,
    retMsg: '调用成功',
    data: {
      token: 'AAA', // 用户登录的token
      rules: 'admin', // 用户的角色 admin user 
      routes: [{ // 该用户能看见的菜单
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
          routes: null,
        }, {
          name: '角色管理',
          path: '/auth/rules',
          icon: 'smile',
          key: '/auth/rules',
          exact: true,
          routes: null,
        }, {
          name: '菜单管理',
          path: '/auth/menu',
          icon: 'user',
          key: '/auth/menu',
          exact: true,
          routes: null,
        }],
      }],
    },
  }
```


### 3、用户管理--用户列表

#### 请求URL:  
```
/user/getuserlist
```


#### 请求方式: 
```
POST
```

#### 参数类型：query

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|current      |Y       |number  |页码|
|pageSize      |Y       |number  |每页条数|

#### 返回示例：

```javascript
{
    code: 200,
    retMsg: '调用成功',
    data: {
      total: 100, // 总条数
      rows: [
        {
          id: 10,
          username: "周飞",
          nickname: "周飞",
          avatar: "\/assets\/img\/avatar.png",
          email: "yaoyingzhe-jk",
          loginfailure: 0,
          logintime: '2020-02-10 10:20:12',
          createtime: '2020-02-10 10:20:12',
          updatetime: '2020-02-10 10:20:12',
          status: "normal",
          groups: "6",
          groups_text: "dsp规则组"
        }
      ]
    },
  }
```

### 4、用户管理--添加用户

#### 请求URL:  
```
/user/adduser
```


#### 请求方式: 
```
POST
```

#### 参数类型：query

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|username      |Y       |string  |用户名|
|nickname      |Y       |string  |昵称|
|group      |Y       |string  |分组|
|email      |Y       |string  |邮箱|
|password      |Y       |string  |密码|
|status      |Y       |string  |状态|

#### 返回示例：

```javascript
{
    code: 200,
    retMsg: '调用成功',
    data: {
      
    },
  }
```

### 5、用户管理--编辑用户

#### 请求URL:  
```
/user/edituser
```


#### 请求方式: 
```
POST
```

#### 参数类型：query

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|username      |Y       |string  |用户名|
|nickname      |Y       |string  |昵称|
|group      |Y       |string  |分组|
|email      |Y       |string  |邮箱|
|password      |Y       |string  |密码|
|status      |Y       |string  |状态|

#### 返回示例：

```javascript
{
    code: 200,
    retMsg: '调用成功',
    data: {
      
    },
  }
```

### 6、用户管理--删除用户

#### 请求URL:  
```
/user/deluser
```


#### 请求方式: 
```
POST
```

#### 参数类型：query

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|id      |Y       |string  |id|

#### 返回示例：

```javascript
{
    code: 200,
    retMsg: '调用成功',
    data: {
      
    },
  }
```

### 7、角色管理--角色列表

#### 请求URL:  
```
/rule/list
```


#### 请求方式: 
```
POST
```

#### 参数类型：query

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|current      |Y       |number  |页码|
|pageSize      |Y       |number  |每页条数|

#### 返回示例：

```javascript
{
    code: 200,
    retMsg: '调用成功',
    data: {
      total: 100, // 总条数
      rows: [
        {
          id: 6
          pid: 1
          name: "&nbsp;└ dsp规则组"
          rules: "11347,"
          createtime: '2020-02-10 10:20:12',
          updatetime: '2020-02-10 10:20:12',
          status: "normal"
        }
      ]
    },
  }
```

### 8、角色管理--菜单树

#### 请求URL:  
```
/rule/group/tree
```


#### 请求方式: 
```
POST
```

#### 参数类型：query

无

#### 返回示例：

```javascript
{
    code: 200,
    retMsg: '调用成功',
    data: {
      data: [
        {
          id: 11256
          parentId: 1
          text: "常规管理"
          type: "menu"
          state: {selected: false}
        },
        {
          id: 11257
          parentId: 1
          text: "常规管理"
          type: "menu"
          state: {selected: false}
        }
      ]
    },
  }
```

### 9、角色管理--添加角色

#### 请求URL:  
```
/rule/addrule
```


#### 请求方式: 
```
POST
```

#### 参数类型：query

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|rules      |Y       |Array  |包含的菜单|
|pid      |Y       |number  |parentId|
|name      |Y       |string  |角色名称|
|status      |Y       |string  |状态|

#### 返回示例：

```javascript
{
    code: 200,
    retMsg: '调用成功',
    data: {
      
    },
  }
```

### 10、角色管理--编辑角色

#### 请求URL:  
```
/rule/editrule
```


#### 请求方式: 
```
POST
```

#### 参数类型：query

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|rules      |Y       |Array  |包含的菜单|
|id      |Y       |number  |id|
|pid      |Y       |number  |parentId|
|name      |Y       |string  |角色名称|
|status      |Y       |string  |状态|

#### 返回示例：

```javascript
{
    code: 200,
    retMsg: '调用成功',
    data: {
      
    },
  }
```
### 11、角色管理--删除角色

#### 请求URL:  
```
/rule/delrule
```


#### 请求方式: 
```
POST
```

#### 参数类型：query

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|id      |Y       |string  |id|

#### 返回示例：

```javascript
{
    code: 200,
    retMsg: '调用成功',
    data: {
      
    },
  }
```
### 12、菜单管理--菜单列表

#### 请求URL:  
```
/menu/list
```


#### 请求方式: 
```
POST
```

#### 参数类型：query

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|current      |Y       |number  |页码|
|pageSize      |Y       |number  |每页条数|

#### 返回示例：

```javascript
{
    code: 200,
    retMsg: '调用成功',
    data: {
      total: 100, // 总条数
      rows: [
        {
          id: 11437
          type: "file"
          pid: 0
          name: "report/home/index"
          title: " 仪表盘"
          icon: "fa fa-circle-o"
          condition: ""
          remark: ""
          ismenu: 0
          createtime: '2020-02-10 10:20:12',
          updatetime: '2020-02-10 10:20:12',
          weigh: 150
          status: "normal"
          spacer: ""
          haschild: 0
        }
      ]
    },
  }
```
### 13、菜单管理--添加菜单

#### 请求URL:  
```
/menu/addmenu
```


#### 请求方式: 
```
POST
```

#### 参数类型：query

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|ismenu      |Y       | number |菜单|
|pid      |Y       |number  |parentId|
|name      |Y       |string  |名称|
|title      |Y       |string  |标题|
|icon      |Y       |string  |icon|
|weight      |Y       |number  |权重|
|condition      |Y       |string  |规则条件|
|remark      |Y       |string  |备注|
|status      |Y       |number  |状态|

#### 返回示例：

```javascript
{
    code: 200,
    retMsg: '调用成功',
    data: {
      
    },
  }
```
### 14、菜单管理--修改菜单

#### 请求URL:  
```
/menu/editmenu
```


#### 请求方式: 
```
POST
```

#### 参数类型：query

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|ismenu      |Y       | number |菜单|
|pid      |Y       |number  |parentId|
|name      |Y       |string  |名称|
|title      |Y       |string  |标题|
|icon      |Y       |string  |icon|
|weight      |Y       |number  |权重|
|condition      |Y       |string  |规则条件|
|remark      |Y       |string  |备注|
|status      |Y       |number  |状态|

#### 返回示例：

```javascript
{
    code: 200,
    retMsg: '调用成功',
    data: {
      
    },
  }
```
### 15、菜单管理--删除菜单

#### 请求URL:  
```
/menu/delmenu
```


#### 请求方式: 
```
POST
```

#### 参数类型：query

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|id      |Y       |string  |id|

#### 返回示例：

```javascript
{
    code: 200,
    retMsg: '调用成功',
    data: {
      
    },
  }
```