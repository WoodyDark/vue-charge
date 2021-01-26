<template>
    <component
        ref="menu"
        @focusin="active = true"
        @focusout="handleFocusout"
        @keydown.up="handleKeydownUp"
        @keydown.down="handleKeydownDown"
        v-bind="$attrs"
        v-on="$listeners"
        :is="tag"
    >
        <slot></slot>
    </component>
</template>

<script>
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
            const index = this.indexOfUid(val)

            if (index < 0) return
            focusables[index].$el.focus()
        }
    },
    methods: {
        handleFocusout() {
            this.active = false
            this.focusedChild = -1

            if (this.$refs.menu.contains(event.relatedTarget)) return
            this.$emit('exitfocus')
        },
        registerFocus(uid) {
            const index = this.indexOfUid(uid)
            this.focusedChild = uid
        },
        registerBlur(uid) {
            const index = this.indexOfUid(uid)
            if (this.focusedChild !== index) return
            this.focusedChild = -1
        },
        registerOption(optionVm) {
            this.focusables.push(optionVm)
        },
        unregisterOption(uid) {
            const index = this.indexOfUid(uid)
            if (index < 0) return
            this.focusables.splice(index, 1)
        },
        indexOfUid(uid) {
            return this.focusables.findIndex(
                focusable => focusable._uid === uid
            )
        },
        handleKeydownDown() {
            const { active, focusables, indexOfUid, focusedChild } = this
            if (!active) return
            const index = focusNext(focusables, indexOfUid(focusedChild))
            this.focusedChild = focusables[index]._uid
        },
        handleKeydownUp() {
            const { active, focusables, indexOfUid, focusedChild } = this
            if (!active) return
            const index = focusPrev(focusables, indexOfUid(focusedChild))
            this.focusedChild = focusables[index]._uid
        }
    }
}
</script>
