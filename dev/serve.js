import Vue from 'vue'
import Dev from './serve.vue'
import Entry from '../src/entry'

Vue.config.productionTip = false

Vue.use(Entry)

new Vue({
    render: h => h(Dev)
}).$mount('#app')
