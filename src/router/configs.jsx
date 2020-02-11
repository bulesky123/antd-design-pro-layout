export default [
  {
    path: '/login',
    import: () => import(/* webpackChunkName: "login" */ '@/pages/login'),
    title: '数据管理系统',
    layout: true,
  },
  // {
  //   path: '/user-login',
  //   import: () => import(/* webpackChunkName: "user-login" */ '@/pages/user-login'),
  //   title: '数据管理系统',
  //   layout: true,
  // },
  {
    path: '/home',
    import: () => import(/* webpackChunkName: "home" */ '@/pages/home'),
    title: '首页',
    layout: false,
  },
  {
    path: '/data/echart',
    import: () => import(/* webpackChunkName: "echart" */ '@/pages/echart'),
    title: '图表展示',
    layout: false,
  },
  {
    path: '/data/table',
    import: () => import(/* webpackChunkName: "table" */ '@/pages/table'),
    title: '表格展示',
    layout: false,
  },
  {
    path: '/data/from',
    import: () => import(/* webpackChunkName: "from" */ '@/pages/from'),
    title: '表单展示',
    layout: false,
  },
  {
    path: '/user/setting',
    import: () => import(/* webpackChunkName: "setting" */ '@/pages/setting'),
    title: '工作台',
    layout: false,
  },
  {
    path: '/auth/user',
    import: () => import(/* webpackChunkName: "auth/user" */ '@/pages/auth/user'),
    title: '用户管理',
    layout: false,
  },
  {
    path: '/auth/rules',
    import: () => import(/* webpackChunkName: "auth/rules" */ '@/pages/auth/rules'),
    title: '角色管理',
    layout: false,
  },
  {
    path: '/auth/menu',
    import: () => import(/* webpackChunkName: "auth/menu" */ '@/pages/auth/menu'),
    title: '菜单管理',
    layout: false,
  },
]


export const lang = [{
  icon: 'cn',
  name: language['简体汉语'],
  type: 'zh_CN',
}, {
  icon: 'us',
  name: language.English,
  type: 'en_US',
}]

