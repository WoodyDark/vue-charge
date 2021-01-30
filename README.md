# VueCharge

A collection of renderless Vue 2 components that supercharges your existing components!

## What are renderless components?

> A renderless component is a component that doesn't render any of its own HTML. Instead it only manages state and behavior, exposing a single scoped slot that gives the parent/consumer complete control over what should actually be rendered.
> [- Adam Wathan](https://adamwathan.me/renderless-components-in-vuejs/)

If you're new to the concept of renderless components and want to learn more about it, I highly recommend reading Adam Wathan's [Renderless Components in Vuejs](https://adamwathan.me/renderless-components-in-vuejs/) as he does a fantastic job explaining the concept with some code examples.

TLDR: Renderless components abstracts UI state management, so you never have to write `this.loading = true` or `this.showDialog = false` again. [See examples below.](#documentation)

# Important Note

This library is currently still in alpha. There is likely to be breaking change in updates.

# Features

-   No dependencies
-   Ensure UI logics stay within the `<template>` tag.

# Installation

`npm i vue-charge`

or

`yarn add vue-charge`

# Usage

Register globally:

```js
import Vue from 'vue'
import VueCharge from 'vue-charge'

Vue.use(VueCharge)
```

or

```js
import { VcAsync } from 'vue-charge'

export default {
    components: {
        VcAsync
    }
}
```

# Component Documentation

## VcAsync

**VcAsync** is a component to help you manage rendering affected asynchronous Javscript. Please note that there are 2 ways of using **VcAsync**, either only using `default` slot or using the promise states. Example below.
<br/><br/>

### **Props**

| Name    | Type       | Default     | Description                                                                                                                                                                                                                                                         |
| ------- | ---------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| promise | `Function` | _required_  | Function that returns a `Promise`                                                                                                                                                                                                                                   |
| default | `String`   | `'pending'` | Default starting state when the component is created. With the default set to `'pending'`, the component will automatically execute the `promise` function upon mount. If you prefer to trigger the promise manually, you should set the default state to `'idle'`. |

<br/>

### **Events**

| Name     | Value                                         |
| -------- | --------------------------------------------- |
| pending  | `undefined`                                   |
| resolved | response returned by resolvation of `promise` |
| rejected | error returned by the rejection of `promise`  |

<br/>

### **Slot Scopes**

| Scope    | Description                                                                                      |
| -------- | ------------------------------------------------------------------------------------------------ |
| state    | Current state of the promise. Possible values: `'idle'`, `'pending'`, `'resolved'`, `'rejected'` |
| execute  | Executes the promise function.                                                                   |
| reset    | Resets the state to `'idle'`                                                                     |
| response | Response returned by resolvation of `promise`                                                    |
| error    | Error returned by the rejection of `promise`                                                     |

<br/>

### **Example 1 (Default Slot)**

If the `default` slot is used, the other slots will not be rendered.

```html
<template>
    <vc-async :promise="handleSubmit" default="idle">
        <template v-slot:default="{ execute, state }">
            <form @submit.prevent="execute">
                <button type="submit" :disabled="state === 'pending'">
                    Save
                </button>
            </form>
        </template>
    </vc-async>
</template>

<script>
    export default {
        methods: {
            handleSubmit() {
                return axios.post('https://...')
            }
        }
    }
</script>
```

### **Example 2 (Promise States)**

```html
<template>
    <vc-async :promise="fetchCoffee" default="idle">
        <template v-slot:idle="{ execute }">
            <button @click="execute">Show me cats!</button>
        </template>

        <template v-slot:pending>
            <div>Loading...</div>
        </template>

        <template v-slot:resolved="{ execute, response }">
            <div>
                <button @click="execute">Retry</button>

                <div v-if="response">
                    <div v-for="cat in response.data" :key="cat.id">
                        <img :src="cat.url" />
                    </div>
                </div>
            </div>
        </template>

        <template v-slot:rejected="{ error, execute }">
            <div>
                <button @click="execute">Retry</button>
                <div v-text="error.response">Rejected</div>
            </div>
        </template>
    </vc-async>
</template>

<script>
    export default {
        methods: {
            fetchCoffee() {
                return axios.get('https://example.com/cats.json')
            }
        }
    }
</script>
```

---

## VcMultiScreen

**VcMultiScreen** ensures you only render 1 of few possible screens in the same DOM hierarchy. For example, a dialog that displays either a login or sign up form. This can also be used for multi-part forms.
<br/><br/>

### **Props**

| Name    | Type    | Default    | Description                                                                                  |
| ------- | ------- | ---------- | -------------------------------------------------------------------------------------------- |
| screens | `Array` | _required_ | Array of screen names. E.g. `['login', 'sign-up']`. Defaults to the first item in the array. |

<br/>

### **Events**

| Name       | Value                                                  |
| ---------- | ------------------------------------------------------ |
| transition | Name of the screen the component is transitioning into |

<br/>

### **Slot Scopes**

| Scope      | Description                                                                                                             |
| ---------- | ----------------------------------------------------------------------------------------------------------------------- |
| screen     | Name of current active screen                                                                                           |
| transition | `Function` to transition into another screen. Requires you to pass in the screen name that you want to transition into. |

<br/>

### **Example**

```html
<template>
    <vc-multi-screen :screens="['login', 'sign-up']">
        <template v-slot:login="{ transition }">
            <button @click="transition('sign-up')">Register now</button>
        </template>

        <template v-slot:sign-up="{ transition }">
            <button @click="transition('login')">
                I already have an account
            </button>
        </template>
    </vc-multi-screen>
</template>
```

---

## VcResetable

**VcResetable** provides you a key which you can update anytime to force a component re-render. For example, after submitting a Contact Us form, you may want to reset the form state. Changing the key re-creates and remount the form component in a fresh state.
<br/><br/>

### **Slot Scopes**

| Scope | Description                                                                                                             |
| ----- | ----------------------------------------------------------------------------------------------------------------------- |
| key   | A key                                                                                                                   |
| reset | `Function` to transition into another screen. Requires you to pass in the screen name that you want to transition into. |

<br/>

### **Example**

```html
<template>
    <vc-resetable>
        <template v-slot:default="{ key, reset }">
            <contact-us-form :key="key" @submit.prevent="reset">
            </contact-us-form>
        </template>
    </vc-resetable>
</template>
```

# Extra Note

By default all VueCharge only add functionalities to your components and does not add any wrapper HTMLElement to the DOM tree. You can imagine VueCharge components behaving like so:

```html
<template>
    <slot></slot>
</template>
```

For this reason, you still have to abide by Vue's convention of only pass in 1 root node. However, if you prefer that VueCharge components be rendered as part of the DOM tree, all components come with a `wrap` prop, which you can use to specify your desired HTML tag.

**Default**

```html
<vc-resetable>
    <div>My text</div>
</vc-resetable>

<!-- This will output -->
<div>My text</div>
```

```html
<vc-resetable>
    <div>My text</div>
    <div>More text</div>
</vc-resetable>

<!-- This will result in error -->
```

**With `wrap` prop**

```html
<!-- With wrap prop -->
<vc-resetable wrap="div">
    <div>My text</div>
    <div>More text</div>
</vc-resetable>

<!-- This will output -->
<div>
    <div>My text</div>
    <div>More text</div>
</div>
```
