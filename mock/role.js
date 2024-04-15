const { RolesList } = require('./data/role')
const { RoutesList } = require('./data/routes')

module.exports = [
  {
    url: '/private/roles/one',
    type: 'post',
    response: _ => {
      return {
        meta: { status: 200 },
        data: RolesList[0]
      }
    }
  },
  {
    url: '/private/roles/list',
    type: 'post',
    response: _ => {
      return {
        meta: { status: 200 },
        data: { count: RolesList.length, current: 1, data: RolesList, limit: 15 }
      }
    }
  }
]