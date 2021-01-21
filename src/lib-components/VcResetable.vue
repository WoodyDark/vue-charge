<script>
export default {
    name: 'VcResetable',
    props: {
        wrap: { type: String, default: undefined }
    },
    data() {
        return {
            key: 0
        }
    },
    methods: {
        reset() {
            this.key++
        }
    },
    render(h) {
        const { key, reset, wrap } = this
        const content = this.$scopedSlots.default({ key, reset })

        return wrap ? h(wrap, content) : content
    }
}
</script>
