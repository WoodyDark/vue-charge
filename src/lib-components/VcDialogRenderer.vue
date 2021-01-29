<script>
import VcDialogContentWrapper from './VcDialogContentWrapper.vue'

export default {
    name: 'VcDialogRenderer',
    functional: true,
    components: { VcDialogContentWrapper },
    props: {
        dialogs: { type: Array, default: [] }
    },
    render(h, { props }) {
        return props.dialogs.map(dialog =>
            h(VcDialogContentWrapper, {
                attrs: {
                    id: `vc-dialog-${dialog._uid}`
                },
                props: {
                    value: dialog.value,
                    emitInput: dialog.emitInput,
                    transition: dialog.transition,
                    autofocus: dialog.autofocus,
                    width: dialog.width,
                    maxHeight: dialog.maxHeight,
                    maxWidth: dialog.maxWidth,
                    removeCenter: dialog.removeCenter,
                    backgroundOpacity: dialog.backgroundOpacity,
                    registerWrapper: dialog.registerWrapper
                },
                scopedSlots: {
                    default() {
                        return dialog.$scopedSlots.default({
                            toggle: dialog.toggle
                        })
                    }
                }
            })
        )
    }
}
</script>
