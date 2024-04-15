const { UserList } = require('./data/user')
const { RolesList } = require('./data/role')

module.exports = [
  // user login
  {
    url: '/public/admin/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      let userInfo = UserList.filter(i => i.account === username)
      if (userInfo.length) {
        return {
          meta: { status: 200 },
          data: { token: `${username}-token`, userInfo: userInfo[0] }
        }
      }
      return {
        meta: { status: 500, msg: "用户不存在" }
      }

    }
  },
  {
    url: "/private/users/infor",
    type: 'get',
    response: _ => {
      return {
        meta: { status: 200 },
        data: UserList.filter(i => i.id == 1)[0],
      }
    }
  },
  {
    url: '/public/admin/login/out',
    type: 'post',
    response: _ => {
      return {
        meta: { status: 200 },
      }
    }
  }
]
