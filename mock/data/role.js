
const { RoutesList } = require('./routes')

export const RolesList = [
    {
        "id": "aaabbbcccdddeeefff",
        "role_name": "管理员",
        "role_desc":"请不要恶意修改此角色权限",
        "state": false,
        "createdAt":"2023-01-01T07:04:36.000Z",
        "menus": RoutesList,
    }, {
        "id": "test-test",
        "role_name": "测试用户",
        "role_desc":"",
        "state": true,
        "createdAt":"2023-01-02T07:00:36.000Z",
        "updatedAt": "2023-01-03T07:04:36.000Z",
        "menus": RoutesList,
    },
    {
        "id": "qqqwwweeerrrttt",
        "role_name": "体验用户",
        "state": false,
        "createdAt":"2023-01-02T07:00:36.000Z",
        "role_desc":"",
        "updatedAt": "2023-01-03T07:04:36.000Z",
        "menus": RoutesList.filter(i=>i.lever!==3),
    }
]