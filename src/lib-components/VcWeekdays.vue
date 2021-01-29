<script>
import serializeMonthDates from '../utils/SerializeMonthDates'
import formatDate from '../utils/FormatDate'

const wdays = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday'
]

const capString = string => string.charAt(0).toUpperCase() + string.slice(1)

const dayHelpers = {}

wdays.forEach(day => {
    dayHelpers[`${day}s`] = function() {
        const { value } = this
        if (!value) return []

        return serializeMonthDates(value).filter(formattedDate => {
            return new Date(formattedDate).getDay() === wdays.indexOf(day)
        })
    }
})

export default {
    name: 'VcWeekdays',
    props: {
        wrap: { type: String, default: undefined },
        weekStart: { type: String, default: 'sunday' },
        value: { type: String, default: undefined }
    },
    computed: {
        weekEnd() {
            let weekEndIndex = wdays.indexOf(this.weekStart) + 6
            if (weekEndIndex > 6) weekEndIndex -= 6
            return wdays[weekEndIndex]
        },
        weekdays() {
            let weekdays = []
            const startIndex = wdays.indexOf(this.weekStart)

            wdays.forEach(day => {
                if (wdays.indexOf(day) >= startIndex) {
                    weekdays.push(day)
                }
            })

            wdays.forEach(day => {
                if (wdays.indexOf(day) < startIndex) {
                    weekdays.push(day)
                }
            })

            return weekdays.map(day => {
                const capDay = capString(day)

                return {
                    day: capDay,
                    short: capDay.substr(0, 3),
                    value: day
                }
            })
        },
        ...dayHelpers
    },
    render(h) {
        const { wrap, weekdays } = this
        const helperNames = Object.keys(dayHelpers)
        const helpers = {}
        helperNames.forEach(fnName => {
            helpers[fnName] = this[fnName]
        })

        const content = this.$scopedSlots.default({ weekdays, ...helpers })

        return wrap ? h(wrap, content) : content
    }
}
</script>
