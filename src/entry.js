// Import vue components
import * as components from '@/lib-components/index'
import formatDate from '@/utils/FormatDate'
import prependZero from '@/utils/PrependZero'

// install function executed by Vue.use()
const install = function installVueCharge(Vue) {
    if (install.installed) return
    install.installed = true

    Vue.prototype.$vc = {
        run() {
            const callbacks = [...arguments]

            callbacks.forEach(fn => {
                typeof fn === 'function' ? fn() : fn
            })
        },
        assign(key, value) {
            key = value
        },
        log() {
            console.log(...arguments)
        },
        formatDate,
        prependZero,
        goldenRatio: 1.618
    }
    Object.entries(components).forEach(([componentName, component]) => {
        Vue.component(componentName, component)
    })
}

// Create module definition for Vue.use()
const plugin = {
    install
}

// To auto-install on non-es builds, when vue is found
// eslint-disable-next-line no-redeclare
/* global window, global */
if ('false' === process.env.ES_BUILD) {
    let GlobalVue = null
    if (typeof window !== 'undefined') {
        GlobalVue = window.Vue
    } else if (typeof global !== 'undefined') {
        GlobalVue = global.Vue
    }
    if (GlobalVue) {
        GlobalVue.use(plugin)
    }
}
// Default export is library as a whole, registered via Vue.use()
export default plugin

// To allow individual component use, export components
// each can be registered via Vue.component()
export * from '@/lib-components/index'
