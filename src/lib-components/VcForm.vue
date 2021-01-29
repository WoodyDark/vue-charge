<template>
    <form v-bind="$attrs" v-on="$listeners">
        <slot v-bind="{ validate, resetValidation, value: status }"></slot>
    </form>
</template>

<script>
import createRegistrable from '../utils/CreateRegistrable'

export default {
    name: 'VcForm',
    data() {
        return {
            validatables: []
        }
    },
    provide() {
        return { vcForm: this }
    },
    methods: {
        ...createRegistrable('validatables', 'validatable'),
        validate() {
            this.validatables.forEach(validatable => validatable.validate())
        },
        resetValidation() {
            this.validatables.forEach(validatable =>
                validatable.resetValidation()
            )
        }
    },
    computed: {
        status() {
            const result = this.validatables.every(
                validatable => validatable.validity
            )
            this.$emit('input', result)
            return result
        }
    },
    mounted() {
        this.validate()
        this.resetValidation()
    }
}
</script>
