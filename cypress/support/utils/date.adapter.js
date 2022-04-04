import {add, isBefore, isAfter, toDate, sub, format, formatDistanceStrict} from "date-fns";
import { utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";

export class DateAdapter {

    constructor (location) {
        this.location = location ?? 'en-US'
        this.timezone = 'America/Sao_Paulo'
        this.value = null
    }

    parseToMyTimeZone(date) {
        this.value = utcToZonedTime(date ?? this.value, this.timezone)
        return this
    }

    toISOString(date) {
        return format(date ?? this.value, 'yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'')
    }

    getToday() {
        this.value = this.parseToMyTimeZone(new Date()).value
        return this
    }

    getTomorrow() {
        this.value = add(this.getToday().value, { days: 1 })
        return this
    }

    getTodayMoreDays(numberOfDays) {
        this.value = add(this.getToday().value, { days: numberOfDays })
        return this
    }

    getTodayMinusDays(numberOfDays) {
        this.value = sub(this.getToday().value, { days: numberOfDays })
        return this
    }

    formatToDayMonthYear(date) {
        return format(date ?? this.value, 'dd-MM-yyyy')
    }

    formatToYearMonthDay(date) {
        return format(date ?? this.value, 'yyyy-MM-dd')
    }

    toDate(dateString) {
        this.value = this.parseToMyTimeZone(new Date(dateString)).value
        return this
    }

    isBefore(date, dateToCompare) {
        return isBefore(date, dateToCompare)
    }

    isBeforeString(dateString, dateStringToCompare) {
        return this.isBefore(this.toDate(dateString), this.toDate(dateStringToCompare))
    }

    isAfter(date, dateToCompare) {
        return isAfter(date, dateToCompare)
    }

    isAfterString(dateString, dateStringToCompare) {
        return this.isAfter(this.toDate(dateString), this.toDate(dateStringToCompare))
    }

    diffCurrentDateFor(dateToCompare, unit = 'hour') {
        return parseInt(formatDistanceStrict(dateToCompare, this.getToday().value, { unit, roundingMethod: 'ceil' }))
    }
}