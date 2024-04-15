
const { RoutesList } = require('./data/routes')
const { RolesList } = require('./data/role')
const { UserList } = require('./data/user')
const { Visitor } = require('./data/data')



module.exports = [
  {
    url: '/private/menus/RolesMenus',
    type: 'post',
    response: _ => {
      return {
        meta: { status: 200 },
        data: { data: RoutesList },
      }
    }
  },
  {
    url: '/private/menus/list',
    type: 'post',
    response: _ => {
      return {
        meta: { status: 200 },
        data: { data: RoutesList },
      }
    }
  },
  {
    url: '/private/users/list',
    type: 'post',
    response: _ => {
      return {
        meta: { status: 200 },
        data: { count: UserList.length, current: 1, data: UserList, limit: 15 }
      }
    }
  },
  {
    url: '/private/menus/RolesMenus',
    type: 'post',
    response: _ => {
      return {
        meta: { status: 200 },
        data: { data: RolesList },
      }
    }
  },
  {
    url: '/private/notice/list',
    type: 'post',
    response: _ => {
      return {
        meta: { status: 200 },
        data: { count: 1, current: 1, data: [{
          id: "1",
          title: "测试公告",
          content: "测试公告",
          type:"1",
          state:false,
        }], limit: 15 }
      }
    }
  },
  {
    url: '/private/visitor/list',
    type: 'post',
    response: _ => {
      return {
        meta: { status: 200 },
        data: { count: Visitor.length, current: 1, data: Visitor, limit: 15 }
      }
    }
  }
]