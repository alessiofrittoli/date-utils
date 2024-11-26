import { InSeconds } from './common'

/**
 * Get the number of days in the given Date month.
 * 
 * @param	date ( Optional ) The date string | milliseconds since UNIX epoch time | Date object. Default: `new Date()`.
 * @returns	The number of days in the given Date month.
 */
export const daysInMonth = ( date: string | number | Date = new Date() ) => {
	const _date = new Date( date )
	return (
		new Date( _date.getFullYear(), _date.getMonth() + 1, 0 ).getDate()
	)
}


/**
 * Get the day number of the year.
 * 
 * @param	date ( Optional ) The date string | milliseconds since UNIX epoch time | Date object. Default: `new Date()`.
 * @returns	The day number of the year.
 */
export const getDayOfYear = ( date: string | number | Date = new Date() ) => {

	const _date			= new Date( date )
	const startOfYear	= new Date( _date.getFullYear(), 0, 0 )
	const diff			= _date.getTime() - startOfYear.getTime()
	const oneDay		= InSeconds._1Day * 1000
	
	return (
		Math.floor( diff / oneDay )
	)
}


/**
 * Get the ISO 8601 week number of the year.
 * 
 * @param	date ( Optional ) The date string | milliseconds since UNIX epoch time | Date object. Default: `new Date()`.
 * @returns	The ISO 8601 week number of the year.
 */
export const getISOWeekNumber = ( date: string | number | Date = new Date() ) => {
	
	const _date		= new Date( date )
	const dayNum	= _date.getUTCDay() || 7

	_date.setUTCDate( _date.getUTCDate() + 4 - dayNum )
	
	const yearStart		= new Date( _date.getUTCFullYear(), 0, 1 )
	return (
		Math.ceil( ( (
			( _date.getTime() - yearStart.getTime() ) / ( InSeconds._1Day * 1000 )
		) + 1 ) / 7 )
	)

}


/**
 * Gets the ISO 8601 numeric representation of the day of the week.
 * Monday = 1, Sunday = 7
 * 
 * @param	date The date to get the day for (defaults to today).
 * @returns	The ISO 8601 day of the week.
 */
export const getISODayOfWeek = ( date: string | number | Date = new Date() ) => {
    const day = new Date( date ).getDay()
    return day === 0 ? 7 : day
}


/**
 * Check whether the given year is a leap year or not.
 * 
 * @param	year The year to check.
 * @returns	Whether the given year is leap or not.
 */
export const isLeapYear = ( year: number ) => (
	new Date( year, 1, 29 ).getMonth() === 1
)


/**
 * Get Ante Meridiem or Post Meridiem based on the given Date time.
 * 
 * @param	date ( Optional ) The date string | milliseconds since UNIX epoch time | Date object. Default: `new Date()`.
 * @returns	'AM' or 'PM' based on the given Date time.
 */
export const getAmOrPm = ( date: string | number | Date = new Date() ) => {
	const _date = new Date( date )
	return (
		_date.getHours() < 12 ? 'AM' : 'PM'
	)
}


/**
 * Get Date Swatch Beat.
 * 
 * @param	date ( Optional ) The date string | milliseconds since UNIX epoch time | Date object. Default: `new Date()`.
 * @param	places ( Optional ) The fractional digits. Default: `3`. 
 * @returns	The Swatch Beat.
 */
export const getSwatchBeat = ( date: string | number | Date = new Date(), places = 3 ) => {
	const _date = new Date( date )
	return (
		( ( ( +_date + 3.6e6 ) % 8.64e7 ) / 8.64e4 ).toFixed( places )
	)
}