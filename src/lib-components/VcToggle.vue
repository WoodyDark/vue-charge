<script>
export default {
    data() {
        return {
            activated: false
        }
    },
    methods: {
        toggle() {
            if ([true, false].includes(arguments[0])) {
                this.activated = arguments[0]
            } else {
                this.activated = !this.activated
            }
        }
    },
    render() {
        const { activated, toggle } = this
        return this.$scopedSlots.default({ activated, toggle })
    }
}
</script>
