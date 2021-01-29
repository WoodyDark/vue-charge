import prependZero from './PrependZero'

export function serializeMonthDates(dateString) {
    const splitDate = dateString.split('-')
    const year = splitDate[0]
    const month = splitDate[1]
    const maxDate = new Date(year, month, 0).getDate()
    let dates = []

    for (let i = 0; i < maxDate; i++) {
        const formattedDate = `${year}-${prependZero(month)}-${prependZero(
            i + 1
        )}`

        dates.push(formattedDate)
    }

    return dates
}

export default serializeMonthDates
