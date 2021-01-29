export const createRegistrable = (storeKey, vmReference) => {
    const reference = vmReference.charAt(0).toUpperCase() + vmReference.slice(1)
    const registerFn = `register${reference}`
    const unregisterFn = `unregister${reference}`
    const indexFn = `indexOf${reference}`

    return {
        [registerFn]: function(vm) {
            this[storeKey].push(vm)
        },
        [unregisterFn]: function(uid) {
            const index = this[indexFn](uid)
            if (index < 0) return
            this[storeKey].splice(index, 1)
        },
        [indexFn]: function(uid) {
            return this[storeKey].findIndex(vm => vm._uid === uid)
        }
    }
}

export default createRegistrable
