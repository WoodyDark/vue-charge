<script>
export default {
    name: 'VcAsync',
    props: {
        promise: { type: Function, required: true },
        default: { type: String, default: 'pending' },
        wrap: { type: String, default: undefined }
    },
    data() {
        return {
            state: 'idle',
            error: null,
            response: null
        }
    },
    watch: {
        state: {
            immediate: true,
            handler(val, oldval) {
                if (val === 'pending') this.executePromise()
                if (val !== 'resolved') this.response = null
                if (val !== 'rejected') this.error = null
            }
        }
    },
    methods: {
        execute() {
            this.$emit('pending')
            this.state = 'pending'
        },
        executePromise() {
            this.promise()
                .then(response => {
                    this.state = 'resolved'
                    this.response = response
                    this.$emit('resolved', response)
                })
                .catch(error => {
                    this.state = 'rejected'
                    this.error = error
                    this.$emit('rejected', error)
                })
        },
        reset() {
            this.state = 'idle'
        }
    },
    created() {
        this.state = this.default
    },
    render(h) {
        const { state, execute, reset, response, error, wrap } = this
        const renderSlot = this.$scopedSlots.default ? 'default' : state
        const content = this.$scopedSlots[renderSlot]?.({
            state,
            execute,
            reset,
            response,
            error
        })

        return wrap ? h(wrap, content) : content
    }
}
</script>
