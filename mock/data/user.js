
const { RolesList } = require('./role')

export const UserList = [
    {
        "id": "1",
        "nickName": "admin",
        "userAccount": "admin",
        "user_desc":"请不要恶意修改此账号",
        "introduction": "我就是我，不一样的烟火~",
        "createdAt": 1540533196000,
        "roleId": "aaabbbcccdddeeefff",
        "role_name": RolesList.filter(i => i.id === 'aaabbbcccdddeeefff')[0].role_name,
        "state": true,
        "avatar": 'https://t14.baidu.com/it/u=2637606604,2200077212&fm=224&app=112&f=JPEG',
        "password": "123456",
        "email": "autchan@163.com",
        "phone": "11012010086",
        "loginAt": "2023-01-09T03:50:48.000Z",
    },
    {
        "id": "2",
        "nickName": "体验",
        "user_desc":"开放访问",
        "avatar": 'https://t14.baidu.com/it/u=2637606604,2200077212&fm=224&app=112&f=JPEG',
        "userAccount": "test",
        "introduction": "哎，就是玩~",
        "createdAt": 1557042558000,
        "roleId": "qqqwwweeerrrttt",
        "role_name": RolesList.filter(i => i.id === 'qqqwwweeerrrttt')[0].role_name,
        "state": true,
        "password": "123456",
        "email": "",
        "avatar": 'https://t14.baidu.com/it/u=2637606604,2200077212&fm=224&app=112&f=JPEG',
        "phone": "",
        "loginAt": "2023-01-09T03:50:48.000Z",
    },
    {
        "id": "3",
        "nickName": "杰克",
        "userAccount": "jack",
        "introduction": "汤姆,汤姆！我是杰克啊",
        "createdAt": 1540533006000,
        "state": false,
        "user_desc":"",
        "password": "123456",
        "avatar": 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        "email": "",
        "phone": "",
        "loginAt": "2023-01-09T03:50:48.000Z",
        "roleId": "qqqwwweeerrrttt",
        "role_name": RolesList.filter(i => i.id === 'qqqwwweeerrrttt')[0].role_name,
    },
    {
        "id": "4",
        "nickName": "测试角色1",
        "userAccount": "test1",
        "introduction": "测试随便玩",
        "createdAt": 1557042558000,
        "state": false,
        "password": "123456",
        "email": "",
        "avatar": "",
        "phone": "",
        "loginAt": "2023-01-09T03:50:48.000Z",
        "roleId": "test-test",
        "role_name": RolesList.filter(i => i.id === 'qqqwwweeerrrttt')[0].role_name,

    },
]




