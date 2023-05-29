const { Routes } = require('./routes.js')

module.exports = [
  {
    url: "/user/roles",
    type: "post",
    response: () => {
      return {
        meta: { status: 200 },
        data: { menus: Routes, role_name: "mock测试", id: "f3a6b40d-a4c2-4d49-a23b-4194ad2ebc13" }
      }
    }
  },
]
