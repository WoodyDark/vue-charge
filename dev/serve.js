import Vue from 'vue'
import Dev from './serve.vue'
import VueCharge from '../src/entry'

Vue.config.productionTip = false

Vue.use(VueCharge)

new Vue({
    render: h => h(Dev)
}).$mount('#app')
