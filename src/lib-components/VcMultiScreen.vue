<script>
export default {
    name: 'VcMultiscreen',
    props: {
        screens: { type: Array, required: true },
        wrap: { type: String, default: undefined }
    },
    data() {
        return {
            screen: ''
        }
    },
    methods: {
        transition(screen) {
            this.$emit('transition', screen)
            this.screen = screen
        }
    },
    created() {
        this.screen = this.screens[0]
    },
    render(h) {
        const { screen, transition, wrap } = this
        const content = this.$scopedSlots[screen]?.({ screen, transition })
        return wrap ? h(wrap, content) : content
    }
}
</script>
