export const loginData = {
    "autchan": {
        "userName": "阿坤",
        "account": "autchan",
        "userId": "autchan",
        "token": null,
        "roles": [
            {
                "name": "系统管理员",
                "code": "SystemManager"
            },
            {
                "name": "用户管理员",
                "code": "AdminUser"
            },
            {
                "name": "测试角色",
                "code": "test"
            }
        ],
        "menus": []
    },
    "admin": {
        "userName": "超级管理员",
        "account": "admin",
        "userId": "admin",
        "token": null,
        "roles": [
            {
                "name": "系统管理员",
                "code": "SystemManager"
            },
            {
                "name": "用户管理员",
                "code": "AdminUser"
            },
            {
                "name": "测试角色",
                "code": "test"
            }
        ],
        "menus": []
    },
    "test": {
        "userName": "用户1",
        "account": "test",
        "userId": "test",
        "token": null,
        "roles": [
            {
                "name": "测试角色",
                "code": "test"
            }
        ],
    }
}

export const userList = {
    "success":true,
    "code":"2000",
    "data": [
        {
            "id":"1",
            "userName":"admin",
            "account":"admin",
            "locked":false,
            "introduction":"我是超级管理员",
            "createTime": 1540533196000,
        },
        {
            "id": "2",
            "userName": "阿坤",
            "account": "autchan",
            "introduction":"啥也不是~~~",
            "locked": false,
            "createTime": 1540533023000,
        },
        {
            "id": "3",
            "userName": "杰克",
            "account": "jack",
            "introduction":"汤姆,汤姆！我是杰克啊",
            "locked": true,
            "createTime": 1540533006000,
        },
        {
            "id": "4",
            "userName": "测试角色1",
            "account": "test1",
            "locked": true,
            "introduction":"测试随便玩",
            "createTime": 1557042558000,
        },
    ]
}




