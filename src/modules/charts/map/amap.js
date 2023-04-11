/*
 * 异步创建script标签
 *  <script src="https://webapi.amap.com/maps?v=1.4.14&key="  type="text/javascript"></script>
 *  <script src="http://webapi.amap.com/ui/1.0/main.js?v=1.0.11"  type="text/javascript"></script>
 */
export default async function MapUILoader(key) {
    const mp = new Promise((resolve, reject) => {
        if (window.AMap) {
            resolve(window.AMap)
        } else {
            var script = document.createElement('script')
            script.type = 'text/javascript'
            script.async = true
            script.src = 'https://webapi.amap.com/maps?v=1.4.14&callback=initAMap&key=' + key
            script.onerror = reject
            document.head.appendChild(script)
        }
        window.initAMap = () => {
            resolve(window.AMap)
        }
    })

    const mpUI = new Promise((resolve, reject) => {
        if (window.AMapUI) {
            resolve(window.AMapUI)
        } else {
            var scriptUI = document.createElement('script')
            scriptUI.type = 'text/javascript'
            scriptUI.src = 'http://webapi.amap.com/ui/1.0/main.js?v=1.0.11'
            scriptUI.onerror = reject

            scriptUI.onload = function (su) {
                resolve(window.AMapUI)
            };
            document.head.appendChild(scriptUI)
        }

    })

    try {
        const res = await Promise.all([mp, mpUI]);
        // 确保都加载成功
        res.forEach(el => {
            if (!el) {
                return MapUILoader(key)
            }
        })
        return res
    } catch (e) {
        console.log(e)
    }
}

