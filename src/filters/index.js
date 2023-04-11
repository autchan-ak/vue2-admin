import Vue from 'vue'

const context = require.context('./', true, /^(.(?!index\.js$))+\.js$/)
context.keys().forEach(componentFilePath => {
    const component = context(componentFilePath)
    const moduleName = componentFilePath.replace(/^\S+\/(\w+)\.js$/, '$1')
    Object.keys(component).forEach(filterKey => {
        const filterFn = component[filterKey]
        const filterName = filterKey === 'default' ? filterFn.name : filterKey
        if (typeof filterFn !== 'function') {
            throw new Error(`filters/${moduleName}.${filterName} need function, but found ${typeof filterFn}`)
        }
        Vue.filter(filterName, filterFn)
    })
})
