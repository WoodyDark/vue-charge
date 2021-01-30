<template>
    <component
        ref="menu"
        @focusin="active = true"
        @focusout="handleFocusout"
        @keydown.up="focusPrev"
        @keydown.down="focusNext"
        v-bind="$attrs"
        v-on="$listeners"
        :is="tag"
    >
        <slot v-bind="{ focusNext, focusPrev }"></slot>
    </component>
</template>

<script>
import createRegistrable from '../utils/CreateRegistrable'
import { focusNext, focusPrev } from '../utils/FocusTrap'

export default {
    name: 'VcMenu',
    props: {
        tag: { type: String, default: 'div' }
    },
    data() {
        return {
            active: false,
            options: [],
            focusedChild: -1
        }
    },
    provide() {
        return {
            vcMenu: this
        }
    },
    watch: {
        focusedChild(val) {
            const { options } = this
            const index = this.indexOfOption(val)

            if (index < 0) return
            options[index].$el.focus()
        }
    },
    methods: {
        ...createRegistrable('options', 'option'),
        handleFocusout() {
            this.active = false
            this.focusedChild = -1

            if (this.$refs.menu.contains(event.relatedTarget)) return
            this.$emit('exitfocus')
        },
        registerFocus(uid) {
            const index = this.indexOfOption(uid)
            this.focusedChild = uid
        },
        registerBlur(uid) {
            const index = this.indexOfOption(uid)
            if (this.focusedChild !== index) return
            this.focusedChild = -1
        },
        focusNext() {
            const { active, options, indexOfOption, focusedChild } = this
            if (!active) return
            const index = focusNext(options, indexOfOption(focusedChild))
            this.focusedChild = index < 0 ? -1 : options[index]._uid
        },
        focusPrev() {
            const { active, options, indexOfOption, focusedChild } = this
            if (!active) return
            const index = focusPrev(options, indexOfOption(focusedChild))
            this.focusedChild = index < 0 ? -1 : options[index]._uid
        }
    }
}
</script>
