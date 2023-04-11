import Vue from 'vue'
import Vuex from 'vuex'
import { pathNormalize,isEmpty } from '../utils/BaseUtil'

import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

/**
 * require.context(directory, useSubdirectories = false, regExp = /^\.\//);
 * @see https://webpack.docschina.org/guides/dependency-management/
 */
class StoreModule {
    storeModuleContext() {
        return require.context('../modules', true, /\.store\.js$/)
    }
    baseStoreModulesContext() {
        return require.context('./modules', true, /\.js$/)
    }
    getStoresModules() {
        const context = this.storeModuleContext()
        const modules = {}
        context.keys().forEach(modulePath => {
            // 使用目录路径名称作为命名空间
            const moduleName = modulePath.replace(/^\.\/(.*)\/[^/]+\.\w+$/, '$1')

            const _module = context(modulePath)
            if (isEmpty(_module)) {
                return
            }
            const storeModule = _module.default || _module
            if (storeModule.namespaced !== false) {
                // 默认添加命名空间
                storeModule.namespaced = true
            }
            modules[moduleName] = storeModule
        })
        return modules
    }
    getBaseStoreModules() {
        const context = this.baseStoreModulesContext()
        const modules = {}
        context.keys().forEach(modulePath => {
            const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
            const _module = context(modulePath)
            modules[moduleName] = _module.default || _module
        })
        return modules
    }
    getModuleFilesByContext(context, prefixPath) {
        const moduleFiles = context.keys().map(modulePath => pathNormalize(prefixPath + modulePath))
        return moduleFiles
    }
    getModuleFiles() {
        const baseModuleFiles = this.getModuleFilesByContext(this.baseStoreModulesContext(), './modules/')
        const moduleFiles = this.getModuleFilesByContext(this.storeModuleContext(), '../modules/')
        return baseModuleFiles.concat(moduleFiles)
    }
    getModules() {
        const baseModules = this.getBaseStoreModules()
        const modules = this.getStoresModules()
        Object.keys(modules).forEach(moduleName => {
            if (baseModules[moduleName]) {
                // 说明已经存在，提示错误
                throw new Error(`store namespaced ${moduleName} has been found at src/store/modules/, please rename it`)
            } else {
                baseModules[moduleName] = modules[moduleName]
            }
        })
        return baseModules
    }
}
const storeModule = new StoreModule()

const store = new Vuex.Store({
    // strict: process.env.NODE_ENV !== 'production',
    // plugins: process.env.NODE_ENV !== 'production' ? [createLogger()] : [],
    state: {
    },
    mutations: {
    },
    actions: {

    },
    getters: {

    },
    modules: storeModule.getModules()
})
if (module.hot) {
    module.hot.accept(storeModule.getModuleFiles(), () => {
        store.hotUpdate({
            modules: storeModule.getModules()
        });
    });
}

export default store
