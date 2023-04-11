import Vue from 'vue'
import { resolveComponentName } from '../utils/ComponentUtil'

const context = require.context('./', true, /^(?!\.?\/?index\.js$).*\.(js|vue)$/)

context.keys().forEach(componentFilePath => {
    const component = context(componentFilePath)
    if (component.__ignore) {
        // true 表示该组件不会注册到vue组件中，但依然会被加载
        return
    }
    let componentName = resolveComponentName(component, componentFilePath)
    if (!componentName) {
        console.error(`Component ${componentFilePath} register faild, the component name is undefined`)
        return
    }
    // console.log(componentName,componentFilePath,component)
    Vue.component(componentName, component.default || component)
})
