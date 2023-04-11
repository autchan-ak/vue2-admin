export const resolveComponentName = (component, componentFile = '') => {
    let componentName = (component.default || component).name
    if (!componentName && componentFile) {
        const fileName = componentFile.replace(/^.*\/([^/]+)\.js/, '$1')
        if (fileName !== 'index') {
            // 非 index.js 直接将文件名作为组件名
            componentName = fileName
        } else {
            // 文件名是index.js
            // 将该文件的最后一层的目录名作为组件名
            componentName = componentFile.replace(/^(.*\/)?([^/]+)\/index\.js$/, '$2')
        }
    }
    return componentName || ''
}
