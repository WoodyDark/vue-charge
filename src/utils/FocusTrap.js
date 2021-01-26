export const focusNext = (focusables, currentIndex) => {
    if (focusables.length === 0) return -1

    if (currentIndex >= 0) {
        if (currentIndex === focusables.length - 1) {
            return 0
        } else {
            return currentIndex + 1
        }
    } else {
        return 0
    }
}

export const focusPrev = (focusables, currentIndex) => {
    if (focusables.length === 0) return -1

    if (currentIndex >= 0) {
        if (currentIndex === 0) {
            return focusables.length - 1
        } else {
            return currentIndex - 1
        }
    } else {
        return focusables.length - 1
    }
}
