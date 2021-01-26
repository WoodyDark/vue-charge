<script>
export default {
    name: 'VcResetable',
    props: {
        wrap: { type: String, default: undefined }
    },
    data() {
        return {
            counter: 0
        }
    },
    methods: {
        reset() {
            this.counter++
        }
    },
    computed: {
        key() {
            return `vc-resetable-${this._uid * 1000 + this.counter}`
        }
    },
    render(h) {
        const { key, reset, wrap } = this
        const content = this.$scopedSlots.default({ key, reset })

        return wrap ? h(wrap, content) : content
    }
}
</script>
