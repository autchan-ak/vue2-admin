const tokens = {
  admin: {
    token: 'admin-token'
  },
  autchan:{
    token:'autchan-token'
  },
  test:{
    token:'test-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'autchan-token': {
    roles: ['autchan','admin'],
    introduction: 'I am an editor',
    avatar: require('./assets/image/profile.jpg'),
    name: '阿坤'
  },
  'test-token':{
    // roles: ['editor'],
    roles: ['test'],
    introduction: 'I am an editor',
    avatar: 'https://t14.baidu.com/it/u=2637606604,2200077212&fm=224&app=112&f=JPEG',
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
      const token = tokens[username]
      if (!token) {
        return {
          code: 1000,
          message: '用户不存在'
        }
      }
      const userInfo = users[token.token]
      // mock error
      console.log("mock--登陆");
      if (!token) {
        return {
          code: 1000,
          message: '用户不存在'
        }
      }
      return {
        code: 2000,
        data: {...token,userInfo}
      }
    }
  },
  {
    url: '/user/page',
    type: 'get',
    response:()=>{
      return
    }
  },
  // get user info
  {
    url: '/vue-element-admin/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/vue-element-admin/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
