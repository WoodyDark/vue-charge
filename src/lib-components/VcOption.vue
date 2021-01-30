<template>
    <component
        :is="tag"
        @focus="registerFocus"
        @blur="registerBlur"
        v-bind="$attrs"
        v-on="$listeners"
    >
        <slot></slot>
    </component>
</template>

<script>
export default {
    name: 'VcOption',
    props: {
        tag: { type: String, default: 'button' }
    },
    inject: ['vcMenu'],
    methods: {
        registerFocus() {
            this.vcMenu.registerFocus(this._uid)
        },
        registerBlur() {
            this.vcMenu.registerBlur(this._uid)
        }
    },
    created() {
        this.vcMenu.registerOption(this)
    },
    beforeDestroy() {
        this.vcMenu.unregisterOption(this._uid)
    },
    render(h, { props, scopedSlots }) {
        h(props.tag, scopedSlots.default())
    }
}
</script>
