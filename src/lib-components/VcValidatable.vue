<script>
export default {
    name: 'VcValidatable',
    inject: ['vcForm'],
    props: {
        wrap: { type: String, default: ' ' },
        value: { type: undefined, default: undefined },
        rules: {
            type: Array,
            default: () => [],
            validator: val => val.every(fn => typeof fn === 'function')
        }
    },
    data() {
        return {
            validity: false,
            error: undefined
        }
    },
    watch: {
        value() {
            this.validate()
        }
    },
    methods: {
        validate() {
            const { rules, value } = this

            if (rules.length === 0) {
                this.validity = true
                this.error = undefined
            } else {
                rules.forEach(rule => {
                    const result = rule(value)

                    if (typeof result === 'string') {
                        this.error = result
                        this.validity = false
                    } else {
                        this.validity = !!result
                        this.error = undefined
                    }
                })
            }
        },
        resetValidation() {
            this.error = undefined
        }
    },
    beforeDestroy() {
        this.vcForm.unregisterValidatable(this._uid)
    },
    created() {
        this.vcForm.registerValidatable(this)
    },
    render(h) {
        const { error, validity, validate, resetValidation, wrap } = this
        const content = this.$scopedSlots.default({
            error,
            validity,
            validate,
            resetValidation
        })

        return wrap ? h(wrap, content) : content
    }
}
</script>
