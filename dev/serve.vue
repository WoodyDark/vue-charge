<template>
    <div id="app">
        <vc-toggle>
            <template v-slot="{ activated, toggle }">
                <vc-menu
                    @keydown.esc="toggle(false)"
                    @exitfocus="toggle(false)"
                >
                    <button @click="toggle">
                        Dropdown menu
                    </button>

                    <ul v-if="activated">
                        <li v-for="num in 10" :key="num">
                            <vc-option @click="toggle(false)" v-text="num">
                            </vc-option>
                        </li>
                    </ul>
                </vc-menu>
            </template>
        </vc-toggle>

        <vc-async :promise="fetchCoffee" default="idle">
            <template v-slot:idle="{ execute }">
                <button @click="execute">Get me Coffee!</button>
            </template>

            <template v-slot:pending>
                <div>Loading...</div>
            </template>

            <template v-slot:resolved="{ response, execute }">
                <div>
                    <button @click="execute">Retry</button>
                    <div v-text="response.data"></div>
                </div>
            </template>

            <template v-slot:rejected="{ error, execute }">
                <div>
                    <button @click="execute">Retry</button>
                    <div v-text="error.response">Rejected</div>
                </div>
            </template>
        </vc-async>

        <vc-resetable>
            <template v-slot:default="{ key, reset }">
                <div :key="key">
                    <button @click="reset" v-text="`My key is ${key}`"></button>
                </div>
            </template>
        </vc-resetable>

        <vc-multi-screen :screens="['hello', 'world']">
            <template v-slot:hello="{ transition }">
                <button @click="transition('world')">I am Hello</button>
            </template>

            <template v-slot:world="{ transition }">
                <button @click="transition('hello')">I am World</button>
            </template>
        </vc-multi-screen>

        <vc-menu></vc-menu>
    </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import {
    VcAsync,
    VcMultiScreen,
    VcResetable,
    VcMenu,
    VcOption,
    VcToggle
} from '@/entry'

export default Vue.extend({
    name: 'ServeDev',
    components: {
        VcAsync,
        VcMultiScreen,
        VcResetable,
        VcMenu,
        VcOption,
        VcToggle
    },
    methods: {
        fetchCoffee() {
            return axios.get(
                'https://random-data-api.com/api/coffee/random_coffee'
            )
        }
    }
})
</script>
