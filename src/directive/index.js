// 全局注册指令
import Vue from 'vue'
import { showLoading, confirm, showError } from "@/utils";
import Clickoutside from 'element-ui/src/utils/clickoutside'

/**
 * 权限指令的使用
 * v-permission="menu:view:add"
 * <button v-permission="menu:view:add">添加</button>
 */
Vue.directive("permission", {
  inserted(el, { value }, vnode) {
    /**
     * el 当前指令的元素  
     * binding 权限标识
     * vnode 当前this
     * */
    // 获取所有权限
    const Button = vnode.context.$route.meta.button;
    if (!Button || !Button.map(b => b.authority).includes(value)) {
      // 没有权限移除按钮
      if (el.parentNode) {
        el.parentNode.removeChild(el)
      }
      return
    }
    Button.forEach(btn => {
      if (btn.authority === value && btn.state) {
        el.__vue__.handleClick = () => {
          showError('已被禁用,请联系管理员')
        }
      }
    });
  },
})

/**
 * 全局权限检查方法
 * 用在无法删除齐元素
 * 使用v-if 进行渲染 返回true||false
 * v-if="$permission($route,'all')"
 */
Vue.prototype.$permission = ($route, value) => {
  return $route.meta.button.map(b => b.authority).includes(value)
}

/**
 * 自定义粘贴指令
 */
Vue.directive('paste', {
  bind(el, binding) {
    el.addEventListener('paste', function (e) {
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