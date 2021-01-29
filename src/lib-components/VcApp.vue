<template>
    <div ref="vcApp" v-bind="$attrs" v-on="$listeners">
        <slot></slot>
        <vc-dialog-renderer :dialogs="dialogs"></vc-dialog-renderer>
    </div>
</template>

<script>
import createRegistrable from '../utils/CreateRegistrable'
import VcDialogRenderer from './VcDialogRenderer.vue'
import { focusNext, focusPrev } from '../utils/FocusTrap'

function getFocusables(el) {
    return [
        ...el.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]'
        )
    ].filter(el => el.getAttribute('tabindex') !== '-1')
}

export default {
    name: 'VcApp',
    components: {
        VcDialogRenderer
    },
    provide() {
        return { vcApp: this }
    },
    data() {
        return {
            dialogs: [],
            dialogWrappers: []
        }
    },
    watch: {
        dialogWrapperStates: {
            immediate: true,
            handler() {
                this.$nextTick(() => {
                    const lastDialogWrapper = this.lastDialogWrapper()

                    if (lastDialogWrapper) {
                        document.body.style.overflow = 'hidden'
                        const dialogEl = lastDialogWrapper.$el
                        if (lastDialogWrapper.autofocus) {
                            const focusables = getFocusables(dialogEl)

                            focusables.length > 0
                                ? focusables[0].focus()
                                : dialogEl.focus()
                        } else {
                            dialogEl?.focus()
                        }
                    } else {
                        document.body.style.overflow = ''
                    }
                })
            }
        }
    },
    computed: {
        dialogWrapperStates() {
            return this.dialogWrappers.map(wrapper => wrapper.showSelf)
        }
    },
    methods: {
        ...createRegistrable('dialogs', 'dialog'),
        ...createRegistrable('dialogWrappers', 'dialogWrapper'),
        lastDialogWrapper() {
            const { dialogWrappers } = this
            const index = dialogWrappers
                .map(wrapper => wrapper.showSelf)
                .lastIndexOf(true)
            return dialogWrappers[index]
        },
        toggleDialog(uid, val) {
            const index = this.indexOfDialog(uid)
            this.dialogWrappers[index].toggle(val)
        },
        escHandler() {
            const lastDialogWrapper = this.lastDialogWrapper()

            if (event.key === 'Escape' && lastDialogWrapper) {
                lastDialogWrapper.toggle(false)
            }
        },
        tabHandler() {
            const lastDialogWrapper = this.lastDialogWrapper()

            if (event.key === 'Tab' && lastDialogWrapper) {
                const dialogEl = lastDialogWrapper.$el

                const focusables = getFocusables(dialogEl)
                let toBeFocusIndex = event.shiftKey
                    ? focusPrev(focusables, focusables.indexOf(event.target))
                    : focusNext(focusables, focusables.indexOf(event.target))

                focusables[toBeFocusIndex].focus()
                event.preventDefault()
            }
        }
    },
    created() {
        document.body.addEventListener('keydown', this.escHandler)
        document.body.addEventListener('keydown', this.tabHandler)
    },
    beforeDestroy() {
        document.body.removeEventListener('keydown', this.escHandler)
        document.body.removeEventListener('keydown', this.tabHandler)
    }
}
</script>
