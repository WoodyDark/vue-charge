<template>
    <div id="app">
        <link
            href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
            rel="stylesheet"
        />

        <vc-app>
            <vc-dialog>
                <template v-slot:activator="first">
                    <button @click="first.toggle(true)">Dialog</button>
                </template>

                <template v-slot:default="first">
                    <div
                        class="bg-white rounded-lg"
                        style="background-color: white;"
                    >
                        <button @click="first.toggle(false)">close</button>
                        <div
                            v-for="n in 20"
                            :key="n"
                            class="p-2"
                            style="padding: 1px;"
                        >
                            hello uwu
                        </div>

                        <vc-dialog>
                            <template v-slot:activator="second">
                                <button @click="second.toggle(true)">
                                    Second
                                </button>
                            </template>

                            <template v-slot:default="second">
                                <div style="background-color: purple;">
                                    <button @click="second.toggle(false)">
                                        close
                                    </button>
                                    <vc-toggle>
                                        <template
                                            v-slot="{ activated, toggle }"
                                        >
                                            <vc-menu
                                                @keydown.esc.stop="
                                                    toggle(false)
                                                "
                                                @exitfocus="toggle(false)"
                                            >
                                                <template
                                                    v-slot:default="{
                                                        focusNext,
                                                        focusPrev
                                                    }"
                                                >
                                                    <div
                                                        @keydown.left="
                                                            focusPrev
                                                        "
                                                        @keydown.right="
                                                            focusNext
                                                        "
                                                    >
                                                        <button @click="toggle">
                                                            Dropdown menu
                                                        </button>

                                                        <ul v-if="activated">
                                                            <li
                                                                v-for="num in 10"
                                                                :key="num"
                                                            >
                                                                <vc-focusable
                                                                    @click="
                                                                        toggle(
                                                                            false
                                                                        )
                                                                    "
                                                                    v-text="num"
                                                                >
                                                                </vc-focusable>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </template>
                                            </vc-menu>
                                        </template>
                                    </vc-toggle>
                                </div>
                            </template>
                        </vc-dialog>
                    </div>
                </template>
            </vc-dialog>

            <vc-form>
                <template v-slot:default="{ value }">
                    <vc-validatable
                        wrap="div"
                        :value="username"
                        :rules="[val => val.length > 5 || 'Too short']"
                    >
                        <template v-slot:default="{ error, validate }">
                            <input
                                type="text"
                                :value="username"
                                @blur="validate"
                                @input="username = $event.target.value"
                            />
                            <div v-if="error" v-text="error"></div>
                        </template>
                    </vc-validatable>

                    <button :disabled="!value">Submit</button>
                </template>
            </vc-form>

            <vc-weekdays wrap="div" value="2021-02-27" week-start="wednesday">
                <template v-slot:default="wday">
                    <div>
                        <div
                            v-for="dayMeta in wday.weekdays"
                            :key="dayMeta.short"
                        >
                            <div v-text="dayMeta"></div>

                            <div
                                v-for="date in wday[`${dayMeta.value}s`]"
                                :key="date"
                            >
                                <div v-text="date"></div>
                            </div>
                        </div>
                    </div>
                </template>
            </vc-weekdays>

            <vc-dates value="2021-06-25" wrap="div">
                <template v-slot:default="{ weekView }">
                    <div>
                        <div
                            v-for="date in weekView"
                            :key="date.formatted"
                            v-text="date"
                        ></div>
                    </div>
                </template>
            </vc-dates>

            <vc-toggle>
                <template v-slot="{ activated, toggle }">
                    <vc-menu
                        @keydown.esc="toggle(false)"
                        @exitfocus="toggle(false)"
                    >
                        <template v-slot:default="{ focusNext, focusPrev }">
                            <div
                                @keydown.left="focusPrev"
                                @keydown.right="focusNext"
                            >
                                <button @click="toggle">
                                    Dropdown menu
                                </button>

                                <ul v-if="activated">
                                    <li v-for="num in 10" :key="num">
                                        <vc-focusable
                                            @click="toggle(false)"
                                            v-text="num"
                                        >
                                        </vc-focusable>
                                    </li>
                                </ul>
                            </div>
                        </template>
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
                        <button
                            @click="reset"
                            v-text="`My key is ${key}`"
                        ></button>
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
        </vc-app>
    </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VcFocusable from '../src/lib-components/VcFocusable.vue'

export default Vue.extend({
    components: { VcFocusable },
    name: 'ServeDev',
    data() {
        return {
            username: 'fds'
        }
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
