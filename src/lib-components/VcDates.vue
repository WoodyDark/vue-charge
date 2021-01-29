<script>
import serializeMonthDates from '../utils/SerializeMonthDates'
import formatDate from '../utils/FormatDate'
import prependZero from '../utils/PrependZero'

const weekdays = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday'
]

const padRight = (formattedDate, weekday) => {
    let date = new Date(formattedDate)
    const dates = []

    while (weekdays[date.getDay()] !== weekday) {
        const newDate = formatDate(date.setDate(date.getDate() + 1))
        dates.push(newDate)
    }

    return dates
}
const padLeft = (formattedDate, weekday) => {
    let date = new Date(formattedDate)
    const dates = []

    while (weekdays[date.getDay()] !== weekday) {
        const newDate = formatDate(date.setDate(date.getDate() - 1))
        dates.push(newDate)
    }

    return dates.reverse()
}

const dateMeta = formattedDate => {
    const jsDate = new Date(formattedDate)

    return {
        formatted: formattedDate,
        js: jsDate,
        weekday: weekdays[jsDate.getDay()],
        date: jsDate.getDate(),
        prepended: prependZero(jsDate.getDate())
    }
}

export default {
    name: 'VcDates',
    props: {
        wrap: { type: String, default: undefined },
        value: { type: String, default: formatDate(new Date()) },
        weekStart: {
            type: String,
            default: 'sunday',
            validator: val => weekdays.indexOf(val) > -1
        },
        fill: {
            type: String,
            default: 'right',
            validator: val => ['left', 'right'].indexOf(val) > -1
        }
    },
    computed: {
        weekEnd() {
            let weekEndIndex = weekdays.indexOf(this.weekStart) + 6
            if (weekEndIndex > 6) weekEndIndex -= 6
            return weekdays[weekEndIndex]
        },
        monthView() {
            return serializeMonthDates(this.value).map(formattedDate =>
                dateMeta(formattedDate)
            )
        },
        paddedMonthView() {
            const { weekStart, weekEnd } = this
            const formattedMonthDates = this.monthView.map(
                meta => meta.formatted
            )

            const leftPads = padLeft(formattedMonthDates[0], weekStart).map(
                formattedDate => ({
                    ...dateMeta(formattedDate),
                    padding: true
                })
            )

            const rightPads = padRight(
                formattedMonthDates[formattedMonthDates.length - 1],
                weekEnd
            ).map(formattedDate => ({
                ...dateMeta(formattedDate),
                padding: true
            }))

            const mainDates = formattedMonthDates.map(formattedDate =>
                dateMeta(formattedDate)
            )

            return [...leftPads, ...mainDates, ...rightPads]
        },
        filledMonthView() {
            const { paddedMonthView, weekEnd, weekStart, fill } = this
            let dates = paddedMonthView.map(meta => ({
                ...meta,
                js: new Date(meta.formatted)
            }))

            while (dates.length < 42) {
                const index = fill === 'right' ? dates.length - 1 : 0
                const lastDate = new Date(dates[index].formatted)

                const date =
                    fill === 'right'
                        ? lastDate.getDate() + 1
                        : lastDate.getDate() - 1

                const nextDay = lastDate.setDate(date)

                const paddings = [
                    formatDate(nextDay),
                    ...(fill === 'right'
                        ? padRight(formatDate(nextDay), weekEnd)
                        : padLeft(formatDate(nextDay), weekStart))
                ]

                dates = [
                    ...dates,
                    ...paddings.map(formattedDate => ({
                        ...dateMeta(formattedDate),
                        padding: true
                    }))
                ].sort((a, b) => a.js - b.js)
            }

            return dates
        },
        weekView() {
            const { value, weekStart, weekEnd } = this

            return [
                ...padLeft(value, weekStart),
                value,
                ...padRight(value, weekEnd)
            ].map(formattedDate => dateMeta(formattedDate))
        }
    },
    render(h) {
        const {
            wrap,
            monthView,
            weekView,
            paddedMonthView,
            filledMonthView
        } = this

        const content = this.$scopedSlots.default({
            monthView,
            weekView,
            paddedMonthView,
            filledMonthView
        })

        return wrap ? h(wrap, content) : content
    }
}
</script>
