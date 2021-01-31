export const prependZero = (num, digitCount = 2) =>
    ('0'.repeat(digitCount - 1) + num).slice(digitCount * -1)

export default prependZero
