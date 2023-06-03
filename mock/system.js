
const { RoutesList } = require('./data/routes')
const { RolesList } = require('./data/role')
const { UserList } = require('./data/user')



module.exports = [
  {
    url: '/system/menus/list',
    type: 'post',
    response: _ => {
      return {
        meta: { status: 200 },
        data: { data: RoutesList },
      }
    }
  },
  {
    url: '/system/users/list',
    type: 'post',
    response: _ => {
      return {
        meta: { status: 200 },
        data: { count: UserList.length, current: 1, data: UserList, limit: 15 }
      }
    }
  },
  {
    url: '/system/roles/list',
    type: 'post',
    response: _ => {
      return {
        meta: { status: 200 },
        data: { data: RolesList },
      }
    }
  },
]