<script>
export default {
    name: 'VcDialog',
    inject: ['vcApp'],
    props: {
        value: { type: Boolean, default: false },
        autofocus: { type: Boolean, default: false },
        transition: { type: undefined, default: () => ({ name: 'scale' }) },
        width: { type: String, default: '600px' },
        maxHeight: { type: String, default: '90%' },
        maxWidth: { type: String, default: '90%' },
        removeCenter: { type: Boolean, default: false },
        backgroundOpacity: { type: Number, default: 0.5 }
    },
    data() {
        return {
            wrapper: null
        }
    },
    methods: {
        emitInput(val) {
            this.$emit('input', val)
        },
        registerWrapper(wrapper) {
            this.wrapper = wrapper
        },
        toggle() {
            this.wrapper.toggle(
                [true, false].includes(arguments[0]) ? arguments[0] : undefined
            )
        }
    },
    created() {
        this.vcApp.registerDialog(this)
    },
    beforeDestroy() {
        this.vcApp.unregisterDialog(this._uid)
    },
    render(h) {
        const { toggle } = this
        return this.$scopedSlots.activator?.({ toggle })
    }
}
</script>
