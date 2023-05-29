const tokens = {
  admin: {
    token: 'admin-token'
  },
  autchan: {
    token: 'autchan-token'
  },
  test: {
    token: 'test-token'
  }
}

const users = {
  'admin-token': {
    roleId: "f3a6b40d-a4c2-4d49-a23b-4194ad2ebc13",
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin',
    login_time:"2023-05-20T05:20:00.000Z",
  },
  'autchan-token': {
    roleId: "f3a6b40d-a4c2-4d49-a23b-4194ad2ebc13",
    introduction: '我就是我，不一样的烟火~',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    login_time:"2023-05-20T05:20:00.000Z",
    name: '阿坤'
  },
  'test-token': {
    roleId: "f3a6b40d-a4c2-4d49-a23b-4194ad2ebc13",
    introduction: 'I am an editor',
    avatar: 'https://t14.baidu.com/it/u=2637606604,2200077212&fm=224&app=112&f=JPEG',
    login_time:"2023-05-20T05:20:00.000Z",
    name: '测试'
  }
}

module.exports = [
  // user login
  {
    url: '/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username] || false
      if (!token) {
        return {
          meta: { status: 500, msg: "用户不存在", },
        }
      }
      const userInfo = users[token.token]
      return {
        meta: { status: 200 },
        data: { ...token, userInfo }
      }
    }
  },
  // user logout
  {
    url: '/user/logout',
    type: 'post',
    response: _ => {
      return {
        meta: { status: 200 },
      }
    }
  }
]
