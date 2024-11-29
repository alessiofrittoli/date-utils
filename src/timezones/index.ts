import { pad } from '@alessiofrittoli/math-utils'
import type Timezone from './types'

/**
 * Get the current runtime Timezone ID.
 * 
 * If running on server it will match the `process.env.TZ` or the current machine settings.
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
 * Get Current machine Date Timezone Offset Hours.
 * 
 * @param	date ( Optional ) The date string | milliseconds since UNIX epoch time | Date object. Default: `new Date()`.
 * @returns	The Timezone Offset Hours for the given Date in the current machine.
 */
export const getCurrentMachineDateTimezoneOffsetH = ( date: string | number | Date = new Date() ) => (
	-(
		new Date( date )
			.getTimezoneOffset() / 60
	)
)


/**
 * Get Timezone offset Hours from a RFC 2822/RFC 5322 Date string.
 * 
 * @param date The RFC 2822/RFC 5322 formatted Date string.
 * @returns The Date Timezone Offset in Hours.
 */
export const getTimezoneHFromGMTDateString = ( date: string ) => {

	if ( date.endsWith( 'Z' ) ) return 0
	
	const match = (
		date
			.replace( /:/g, '' )
			.match( /GMT([+-]\d{4})/ )
	)
	
	if ( ! match?.[ 1 ] ) {
		return getCurrentMachineDateTimezoneOffsetH( date )
	}

	const offset		= match[ 1 ]
	const hours			= parseInt( offset.slice( 0, 3 ), 10 )
	const minutes		= parseInt( offset.slice( 3 ), 10 )
	const offsetSeconds	= ( hours * 60 * 60 ) + ( minutes * 60 )

	return offsetSeconds / 60 / 60

}


/**
 * Get Date Timezone Offset in Hours.
 * 
 * Retrieve the Timezone Offset based on the given Date/Timezone identifier.
 * 
 * @param date		( Optional ) The date string (ISO or » RFC 2822/» RFC 5322) | milliseconds since UNIX epoch time | Date object.
 * @param timeZone	( Optional ) The Timezone identifier used to retrieve the Timezone Offset.\
 * 					This will be ignored if a » RFC 2822/» RFC 5322 formatted Date string is provided.
 * @returns The Date Timezone Offset in Hours.
 * 
 * @examples
 * - Today is 29.11.2024 - 11:00 and we are based in Europe/Rome\
 *     ( today » RFC 2822/» RFC 5322 Date string: "Fri Nov 29 2024 11:00:13 GMT+0100 (Central European Standard Time)" )
 * 
 * ```ts
 * // Get current Date Timezone offset.
 * getTimezoneOffsetH() // Outputs: 1
 * // Get Timezone offset in the summer (Europe/Rome).
 * getTimezoneOffsetH( new Date( '2024-06' ) ) // Outputs: 2
 * // Get Timezone offset for a given Timezone identifier (29.11.2024 - 11:00).
 * getTimezoneOffsetH( new Date(), 'America/Los_Angeles' ) // Outputs: -8
 * // Get Timezone offset in the summer (America/Los_Angeles).
 * getTimezoneOffsetH( new Date( '2024-06' ), 'America/Los_Angeles' ) // Outputs: -7
 * // Get Timezone offset from » RFC 2822/» RFC 5322 formatted Date string
 * const dateString = new Date().toString() // Fri Nov 29 2024 11:00:13 GMT+0100 (Central European Standard Time)
 * getTimezoneOffsetH( dateString ) // Outputs: 1
 * getTimezoneOffsetH( dateString, 'America/Los_Angeles' ) // Outputs: 1 - TZ identifier is ignored since "GMT+0100" is in the date string
 * // Get Timezone offset from Date ISO string
 * const dateString = new Date().toISOString() // 2024-11-29T10:00:00.000Z
 * getTimezoneOffsetH( dateString ) // Outputs: 1
 * getTimezoneOffsetH( dateString, 'America/Los_Angeles' ) ) // Outputs: -8
 * ```
 */
export const getTimezoneOffsetH = (
	date?		: string | number | Date,
	timeZone?	: Timezone,
) => {


	if ( ! timeZone ) {

		return (
			typeof date === 'string'
				? getTimezoneHFromGMTDateString( date )
				: getCurrentMachineDateTimezoneOffsetH( date )
		)

	}

	return (
		typeof date === 'string'
			? getTimezoneHFromGMTDateString( date ) || getTimezoneHFromGMTDateString( getTimezoneName( {
				date			: date,
				timeZone		: timeZone,
				timeZoneName	: 'longOffset'
			} ) )
			: getTimezoneHFromGMTDateString( getTimezoneName( {
				date			: date,
				timeZone		: timeZone,
				timeZoneName	: 'longOffset'
			} ) )
	)

}


/**
 * Get Timezone Offset Hours and Minutes.
 * 
 * @param date		( Optional ) The date string | milliseconds since UNIX epoch time | Date object.
 * @param timeZone	( Optional ) The Timezone identifier used to retrieve the Timezone Offset.
 * @param separator	( Optional ) The Timezone offset separator. Default: `:`.
 * 
 * @returns The formatted Timezone Offset.
 */
export const getTimezoneOffsetHm = (
	date?		: string | number | Date,
	timezone?	: Timezone,
	separator	: string | false = ':',
) => {
	
	const offset = -( getTimezoneOffsetH( date, timezone ) * 60 )

	return (
		( offset <= 0 ? '+' : '-' ) +
			pad( parseInt( String( Math.abs( offset / 60 ) ) ), 2 ) +
			( separator || '' ) +
			pad( Math.abs( offset % 60 ), 2 )
	)

}


/**
 * Get Timezone name.
 * 
 * @param	options An object with `date`, `locales`, custom `timeZone` to format and `timeZoneName` format to use.
 * @returns	The formatted Timezone name.
 */
export const getTimezoneName = (
	options?: {
		date?		: string | number | Date,
		locale?		: Intl.LocalesArgument,
		timeZone?	: Timezone,
		timeZoneName?: Intl.DateTimeFormatOptions[ 'timeZoneName' ],
	}
) => (
	Intl.DateTimeFormat( options?.locale, {
		timeZoneName: options?.timeZoneName || 'shortOffset',
		timeZone	: options?.timeZone as string,
	} )
		.formatToParts( options?.date ? new Date( options?.date ) : undefined )
		.find( i => i.type === 'timeZoneName' )!.value
)


/**
 * Get Daylight Saving Time Timezone offset.
 * 
 * @param	date		( Optional ) The date string | milliseconds since UNIX epoch time | Date object. Default: `new Date()`.
 * @param	timeZone	( Optional ) The Timezone identifier used to retrieve the Timezone Offset.\
 * @returns	The Daylight Saving Time Timezone offset.
 */
export const stdTimezoneOffset = (
	date		: string | number | Date = new Date(),
	timeZone?	: Timezone,
) => {

	const _date	= new Date( date )
	const jan	= new Date( _date.getFullYear(), 0, 1 )
	const jul	= new Date( _date.getFullYear(), 6, 1 )

	return (
		Math.max( ( getTimezoneOffsetH( jan, timeZone ) * -60 ), ( getTimezoneOffsetH( jul, timeZone ) * -60 ) )
	)

}


/**
 * Check whether the given Date is in Daylight Saving Time or not.
 * 
 * @param	date		( Optional ) The date string | milliseconds since UNIX epoch time | Date object. Default: `new Date()`.
 * @param	timeZone	( Optional ) The Timezone identifier used to retrieve the Timezone Offset.\
 * @returns	True if the given Date is in Daylight Saving Time, false otherwise.
 */
export const isDstObserved = (
	date		: string | number | Date = new Date(),
	timeZone?	: Timezone,
) => (
	( getTimezoneOffsetH( date, timeZone ) * -60 ) < stdTimezoneOffset( date, timeZone )
)