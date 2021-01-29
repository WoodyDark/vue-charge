import prependZero from './PrependZero'

export const formatDate = datetime => {
    const date = new Date(datetime)
    return `${date.getFullYear()}-${prependZero(
        date.getMonth() + 1
    )}-${prependZero(date.getDate())}`
}

export default formatDate
