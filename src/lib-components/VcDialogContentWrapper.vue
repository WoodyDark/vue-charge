<template>
    <transition
        name="fade"
        @after-enter="showContent = true"
        @after-leave="emitInput(false)"
    >
        <div
            v-if="showSelf"
            tabindex="-1"
            role="document"
            class="vc-dialog-content-wrapper__document"
            :style="`background-color: rgba(0,0,0, ${backgroundOpacity});`"
        >
            <button
                @click="showContent = false"
                tabindex="-1"
                class="vc-dialog-content-wrapper__button"
            ></button>

            <transition @after-leave="showSelf = false" v-bind="transition">
                <div
                    v-if="showContent"
                    class="vc-dialog-content-wrapper__content-holder"
                    :style="{ width, maxHeight, maxWidth, margin }"
                >
                    <slot></slot>
                </div>
            </transition>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'VcDialogContentWrapper',
    props: {
        value: { type: Boolean, default: false },
        emitInput: { type: Function, required: true },
        transition: { type: undefined, default: undefined },
        autofocus: { type: Boolean, default: false },
        width: { type: String, default: '600px' },
        maxHeight: { type: String, default: '90%' },
        maxWidth: { type: String, default: '90%' },
        removeCenter: { type: Boolean, default: false },
        backgroundOpacity: { type: Number, default: 0.5 },
        registerWrapper: { type: Function, required: true }
    },
    inject: ['vcApp'],
    data() {
        return {
            showSelf: false,
            showContent: false
        }
    },
    watch: {
        value: {
            immediate: true,
            handler(val) {
                if (val) {
                    this.showSelf = val
                } else {
                    this.showContent = val
                }
            }
        }
    },
    methods: {
        toggle() {
            const state = [true, false].includes(arguments[0])
                ? arguments[0]
                : !showSelf

            if (state) {
                this.showSelf = state
            } else {
                this.showContent = state
            }
        }
    },
    computed: {
        margin() {
            return this.removeCenter ? '' : 'auto'
        }
    },
    created() {
        this.vcApp.registerDialogWrapper(this)
        this.registerWrapper(this)
    },
    beforeDestroy() {
        this.registerWrapper(null)
        this.vcApp.unregisterDialogWrapper(this._uid)
    }
}
</script>

<style scoped>
.vc-dialog-content-wrapper__button {
    font-family: inherit;
    font-size: 100%;
    line-height: 1.15;
    margin: 0;
    text-transform: none;
    -webkit-appearance: button;
    background-color: transparent;
    background-image: none;
    padding: 0;
    line-height: inherit;
    color: inherit;
    cursor: default;
    outline: none;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

.vc-dialog-content-wrapper__document {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1050;
    touch-action: none;
}

.vc-dialog-content-wrapper__content-holder {
    overflow: auto;
    position: absolute;
    height: fit-content;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity ease-in-out 0.1s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.scale-enter-active,
.scale-leave-active {
    transition: transform ease-out 0.1s;
}

.scale-enter,
.scale-leave-to {
    transform: scale(0);
}
</style>
