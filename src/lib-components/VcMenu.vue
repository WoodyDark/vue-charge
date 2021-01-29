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
            focusables: [],
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
            const { focusables } = this
            const index = this.indexOfFocusable(val)

            if (index < 0) return
            focusables[index].$el.focus()
        }
    },
    methods: {
        ...createRegistrable('focusables', 'focusable'),
        handleFocusout() {
            this.active = false
            this.focusedChild = -1

            if (this.$refs.menu.contains(event.relatedTarget)) return
            this.$emit('exitfocus')
        },
        registerFocus(uid) {
            const index = this.indexOfFocusable(uid)
            this.focusedChild = uid
        },
        registerBlur(uid) {
            const index = this.indexOfFocusable(uid)
            if (this.focusedChild !== index) return
            this.focusedChild = -1
        },
        focusNext() {
            const { active, focusables, indexOfFocusable, focusedChild } = this
            if (!active) return
            const index = focusNext(focusables, indexOfFocusable(focusedChild))
            this.focusedChild = index < 0 ? -1 : focusables[index]._uid
        },
        focusPrev() {
            const { active, focusables, indexOfFocusable, focusedChild } = this
            if (!active) return
            const index = focusPrev(focusables, indexOfFocusable(focusedChild))
            this.focusedChild = index < 0 ? -1 : focusables[index]._uid
        }
    }
}
</script>
