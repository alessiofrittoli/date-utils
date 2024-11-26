import type Timezone from './types'

/**
 * Get the current runtime Timezone ID.
 * 
 * If running on server it will match the `process.env.TZ` variable which defaults to `UTC`.
 * If running on client it will match the user current Timezone ID.
 * 
 * @returns The current Timezone ID.
 */
export const getCurrentTimeZoneId = () => (
	Intl.DateTimeFormat()
		.resolvedOptions()
		.timeZone as Timezone
)


/**
 * Get Timezone Offset Hours.
 * 
 * @param	date ( Optional ) The date string | milliseconds since UNIX epoch time | Date object. Default: `new Date()`.
 * @returns	The Timezone Offset Hours.
 */
export const getTimezoneOffsetH = ( date: string | number | Date = new Date() ) => (
	-(
		new Date( date )
			.getTimezoneOffset() / 60
	)
)


/**
 * Get Timezone Offset Hours and Minutes.
 * 
 * @param date		( Optional ) The date string | milliseconds since UNIX epoch time | Date object. Default: `new Date()`.
 * @param separator	( Optional ) The Timezone offset separator. Default: `:`.
 * 
 * @link [StackOverflow Thread#1091372](https://stackoverflow.com/questions/1091372/getting-the-clients-time-zone-and-offset-in-javascript#5114625)
 * 
 * @returns The formatted Timezone Offset.
 */
export const getTimezoneOffsetHm = (
	date		: string | number | Date = new Date(),
	separator	: string | false = ':',
) => {

	const pad = ( number: number, length: number ) => {
		let str = number.toString()		
		while ( str.length < length ) {
			str = '0' + str
		}
		return str
	}
	
	const offset = (
		new Date( date )
			.getTimezoneOffset()
	)

	return (
		( offset < 0 ? '+' : '-' ) +
			pad( parseInt( String( Math.abs( offset / 60 ) ) ), 2 ) +
			( separator || '' ) +
			pad( Math.abs( offset % 60 ), 2 )
	)

}


/**
 * Get Timezone name.
 * 
 * @param	options An object with `locales`, custom `timeZone` to format and `timeZoneName` format to use.
 * @returns	The formatted Timezone name.
 */
export const getTimezoneName = (
	options?: {		
		locale?		: Intl.LocalesArgument | string | string[],
		timeZone?	: Timezone,
		timeZoneName?: Intl.DateTimeFormatOptions[ 'timeZoneName' ],
	}
) => (
	Intl.DateTimeFormat( options?.locale, {
		timeZoneName: options?.timeZoneName || 'shortOffset',
		timeZone	: options?.timeZone as string,
	} )
		.formatToParts()
		.find( i => i.type === 'timeZoneName' )?.value
)


/**
 * Get Daylight Saving Time Timezone offset.
 * 
 * @param	date ( Optional ) The date string | milliseconds since UNIX epoch time | Date object. Default: `new Date()`.
 * @returns	The Daylight Saving Time Timezone offset.
 */
export const stdTimezoneOffset = ( date: string | number | Date = new Date() ) => {

	const _date	= new Date( date )
	const jan	= new Date( _date.getFullYear(), 0, 1 )
	const jul	= new Date( _date.getFullYear(), 6, 1 )

	return (
		Math.max( jan.getTimezoneOffset(), jul.getTimezoneOffset() )
	)

}


/**
 * Check whether the given Date is in Daylight Saving Time or not.
 * 
 * @param	date ( Optional ) The date string | milliseconds since UNIX epoch time | Date object. Default: `new Date()`.
 * @returns	True if the given Date is in Daylight Saving Time, false otherwise.
 */
export const isDstObserved = ( date: string | number | Date = new Date() ) => {
	const _date	= new Date( date )
	return (
		_date.getTimezoneOffset() < stdTimezoneOffset( _date )
	)
}