import {
    add,
    format,
    formatDistanceStrict,
    formatISO, hoursToMinutes, hoursToSeconds,
    isAfter,
    isBefore, isValid, minutesToHours,
    minutesToSeconds, secondsToHours,
    secondsToMinutes,
    sub
} from "date-fns";
import {zonedTimeToUtc} from "date-fns-tz";

export class DateAdapter {

    constructor() {
        this.timezone = 'America/Sao_Paulo'
        this.value = null
    }

    parseToMyTimeZone(date) {
        this.value = zonedTimeToUtc(date ?? this.value, this.timezone)
        return this
    }

    getToday() {
        this.value = this.parseToMyTimeZone(new Date()).value
        return this
    }

    getTomorrow() {
        this.value = add(this.getToday().value, {days: 1})
        return this
    }

    getTodayMoreDays(numberOfDays) {
        this.value = add(this.getToday().value, {days: numberOfDays})
        return this
    }

    getTodayMinusDays(numberOfDays) {
        this.value = sub(this.getToday().value, {days: numberOfDays})
        return this
    }

    diffCurrentDateFor(dateToCompare, unit = 'hour') {
        return parseInt(formatDistanceStrict(dateToCompare, this.getToday().value, {unit, roundingMethod: 'ceil'}))
    }

    isBefore(date, dateToCompare) { return isBefore(date, dateToCompare) }

    isAfter(date, dateToCompare) { return isAfter(date, dateToCompare) }

    isValid(date) { return isValid(date ?? this.value) }

    toDate(dateString) {
        this.value = this.parseToMyTimeZone(new Date(dateString)).value
        return this
    }

    toISOString(date) { return formatISO(date ?? this.value) }

    formatTo(date, pattern) { return format(date ?? this.value, pattern) }

    formatToDayMonthYear(date) { return format(date ?? this.value, 'dd-MM-yyyy') }

    formatToYearMonthDay(date) { return format(date ?? this.value, 'yyyy-MM-dd') }

    secondsToMinutes(seconds) { return secondsToMinutes(seconds) }

    secondsToHours(seconds) { return secondsToHours(seconds) }

    minutesToSeconds(minutes) { return minutesToSeconds(minutes) }

    minutesToHours(minutes) { return minutesToHours(minutes) }

    hoursToMinutes(hour) { return hoursToMinutes(hour) }

    hoursToSeconds(hour) { return hoursToSeconds(hour) }

}