// 全局注册指令
import Vue from 'vue'
import store from '@/store'
import Clickoutside from 'element-ui/src/utils/clickoutside'

/**
 * 权限指令的使用
 * v-permission="menu:view:add"
 * <button v-permission="menu:view:add">添加</button>
 */
Vue.directive("permission", {
  inserted(el, binding) {
    /**
     * el 当前指令的元素  
     * binding {name,expression,vale}等
     * */
    // 获取指令的值: 按钮要求的角色数组
    const { value: pRoles } = binding;
    //  获取用户角色
    const roles = store.getters && store.getters.roles

    if (pRoles && pRoles instanceof Array && pRoles.length > 0) {
      // 判断用户角色中是否有按钮要求的角色
      const hasPermission = roles.some(role => {
        return pRoles.includes(role);
      })
      // console.log(hasPermission)
      // 如果没有权限则删除当前DOM
      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    } else {
      throw new Error(`需要指定按钮要求按钮权限code,如v-permission="menu:view:add'`)
    }
  }
})

/**
 * 自定义粘贴指令
 */
Vue.directive('paste', {
  bind(el, binding) {
    el.addEventListener('paste', function(e) {
      //这里直接监听元素的粘贴事件
      binding.value(e)
    })
  },
})
/**
 * 拖拽指令
 */
Vue.directive('drag', {
  bind(el, binding, vnode) {
    // 因为拖拽还包括拖动时的经过事件，离开事件，和进入事件，放下事件，
    // 浏览器对于拖拽的默认事件的处理是打开拖进来的资源，
    // 所以要先对这三个事件进行默认事件的禁止
    el.addEventListener('dragenter', function (event) {
      event.stopPropagation()
      event.preventDefault()
    })
    el.addEventListener('dragover', function (event) {
      event.stopPropagation()
      event.preventDefault()
    })
    el.addEventListener('dragleave', function (event) {
      event.stopPropagation()
      event.preventDefault()
    })
    el.addEventListener('drop', function (event) {
      // 这里阻止默认事件，并绑定事件的对象，用来在组件上返回事件对象
      event.stopPropagation()
      event.preventDefault()
      binding.value(event)
    })
  },
})


// 点击其他地方隐藏指令
Vue.directive('outside', Clickoutside)