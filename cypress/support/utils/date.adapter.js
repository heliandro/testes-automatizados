import { add, format, isBefore, isAfter, toDate, sub } from "date-fns";

export class DateAdapter {

    constructor (location) {
        this.location = location ?? 'en-US'
    }

    getToday() {
        return this.formatPerLocation(new Date())
    }

    getTomorrow() {
        const tomorrow = add(new Date(), { days: 1 })
        return this.formatPerLocation(tomorrow)
    }

    getTodayMoreDays(numberOfDays) {
        const futureDate = add(new Date(), { days: numberOfDays })
        return this.formatPerLocation(futureDate)
    }

    getTodayMinusDays(numberOfDays) {
        const pastDate = sub(new Date(), { days: numberOfDays })
        return this.formatPerLocation(pastDate)
    }

    formatToDayMonthYear(date) {
        return format(date, 'dd-MM-yyyy')
    }

    formatToYearMonthDay(date) {
        return format(date, 'yyyy-MM-dd')
    }

    formatPerLocation(date) {
        return this.location.includes('en-US') ? this.formatToYearMonthDay(date) : this.formatToDayMonthYear(date)
    }

    toDate(dateString) {
        return toDate(dateString)
    }

    compareDateIsBefore(date, dateToCompare) {
        return isBefore(date, dateToCompare)
    }

    compareDateStringIsBefore(dateString, dateStringToCompare) {
        return this.compareDateIsBefore(this.toDate(dateString), this.toDate(dateStringToCompare))
    }

    compareDateIsAfter(date, dateToCompare) {
        return isAfter(date, dateToCompare)
    }

    compareDateStringIsAfter(dateString, dateStringToCompare) {
        return this.compareDateIsAfter(this.toDate(dateString), this.toDate(dateStringToCompare))
    }
}