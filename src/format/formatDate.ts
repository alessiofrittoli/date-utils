import { englishOrdinalSuffix } from '@alessiofrittoli/math-utils/helpers'

import type { Timezone } from '@/timezones/types'
import {
	getCurrentTimeZoneId, getTimezoneName,
	getTimezoneOffsetH, getTimezoneOffsetHm,
	isDstObserved
} from '@/timezones'
import {
	daysInMonth, getAmOrPm, getDayOfYear,
	getISODayOfWeek, getISOWeekNumber,
	getSwatchBeat, isLeapYear
} from '@/utils'


/**
 * Format date.
 * 
 * @param	_date		( Optional ) The date string | milliseconds since UNIX epoch time | Date object. Default: `new Date()`.
 * @param	format		( Optional ) The format string or `Intl.DateTimeFormatOptions`.
 * @param	locales		( Optional ) The `Intl.LocalesArgument`.
 * @param	_timeZone	( Optional ) The Timezone name.
 * 
 * Day
 * - `d`: Day of the month, 2 digits with leading zeros
 * - `j`: Day of the month without leading zeros
 * - `D`: A textual representation of a day, three letters
 * - `J`: A textual representation of a day, one letter
 * - `l`: A full textual representation of the day of the week
 * - `w`: Numeric representation of the day of the week
 * - `N`: ISO 8601 numeric representation of the day of the week
 * - `S`: English ordinal suffix for the day of the month, 2 characters. Works well with `j`
 * - `z`: The day of the year (starting from 0)
 * - `b`: The day period
 * 
 * Week
 * - `W`: ISO 8601 week number of year, weeks starting on Monday
 * 
 * Month
 * - `m`: Numeric representation of a month, with leading zeros
 * - `n`: Numeric representation of a month, without leading zeros
 * - `M`: A short textual representation of a month, three letters
 * - `F`: A full textual representation of a month
 * - `E`: A narrow textual representation of a month
 * - `t`: Number of days in the given month
 * 
 * Year
 * - `L`: Whether it's a leap year - 1 if it is a leap year, 0 otherwise
 * - `Y`: A full numeric representation of a year, at least 4 digits, with - for years BCE
 * - `y`: A two digit representation of a year
 * 
 * Time
 * - `a`: Lowercase Ante Meridiem and Post Meridiem
 * - `A`: Uppercase Ante Meridiem and Post Meridiem
 * - `B`: Swatch Internet Time
 * - `g`: 12-hour format of an hour without leading zeros
 * - `G`: 24-hour format of an hour
 * - `h`: 12-hour format of an hour with leading zeros
 * - `H`: 24-hour format of an hour with leading zeros
 * - `i`: Minutes with leading zeros
 * - `s`: Seconds with leading zeros
 * - `v`: Milliseconds
 * - `u`: Microseconds
 * 
 * Timezone
 * - `e`: Current runtime Timezone identifier
 * - `C`: Timezone identifier - long
 * - `K`: Timezone identifier - long generic
 * - `Q`: Timezone identifier - long offset
 * - `q`: Same as `Q` but without colon
 * - `R`: Timezone identifier - short
 * - `V`: Timezone identifier - short generic
 * - `o`: Timezone identifier - short offset
 * - `I`: Whether or not the date is in Daylight Saving Time - 1 if it in DST, 0 otherwise
 * - `O`: Difference to Greenwich time (GMT) without colon between hours and minutes
 * - `P`: Difference to Greenwich time (GMT) with colon between hours and minutes
 * - `p`: The same as `P`, but returns 'Z' instead of +00:00
 * - `Z`: Timezone offset in seconds. The offset for timezones west of UTC is always negative, and for those east of UTC is always positive
 * 
 * Full Datetime
 * - `c`: ISO 8601 date
 * - `r`: » RFC 2822/» RFC 5322 formatted date
 * - `U`: Seconds since the Unix Epoch (January 1 1970 00:00:00 GMT)
 * 
 * Misc
 * - `T`: Time divider
 * 
 * @returns	The formatted Date string.
 */
export const formatDate = (
	_date		: string | number | Date = new Date(),
	format?		: string | ( Intl.DateTimeFormatOptions & { timeZone?: Timezone } ),
	locales?	: Intl.LocalesArgument,
	_timeZone?	: Timezone,
): string => {

	const date		= new Date( _date )
	const timeZone	= _timeZone as string

	if ( ! format ) {
		return (
			new Intl.DateTimeFormat( locales, { timeZone } )
				.format( date )
		)
	}

	if ( typeof format === 'object' ) {
		return (
			new Intl.DateTimeFormat( locales, { ...format, timeZone: format.timeZone || timeZone } )
				.format( date )
		)
	}


	const result = (
		format.split( '' ).map( ch => {
			switch ( ch ) {
				/** Day */
				case 'd':
					// Day of the month, 2 digits with leading zeros
					return new Intl.DateTimeFormat( locales, { day: '2-digit', timeZone } ).format( date )
				case 'j':
					// Day of the month without leading zeros
					return new Intl.DateTimeFormat( locales, { day: 'numeric', timeZone } ).format( date )
				case 'D':
					// A textual representation of a day, three letters
					return new Intl.DateTimeFormat( locales, { weekday: 'short', timeZone } ).format( date )
				case 'J':
					// A textual representation of a day, one letter
					return new Intl.DateTimeFormat( locales, { weekday: 'narrow' } ).format( date )
				case 'l':
					// A full textual representation of the day of the week
					return new Intl.DateTimeFormat( locales, { weekday: 'long', timeZone } ).format( date )
				case 'w':
					// Numeric representation of the day of the week
					return date.getDay().toString()
				case 'N':
					// ISO 8601 numeric representation of the day of the week
					return getISODayOfWeek( date )
				case 'S':
					// English ordinal suffix for the day of the month, 2 characters
					return englishOrdinalSuffix( date.getDate() )
				case 'z':
					// The day of the year (starting from 0)
					return getDayOfYear( date )
				case 'b':
					// The day period
					return new Intl.DateTimeFormat( locales, { dayPeriod: 'long', timeZone } ).format( date )
				
				/** Week */
				case 'W':
					// ISO 8601 week number of year, weeks starting on Monday
					return getISOWeekNumber( date )
				
				/** Month */
				case 'm':
					// Numeric representation of a month, with leading zeros
					return new Intl.DateTimeFormat( locales, { month: '2-digit', timeZone } ).format( date )
				case 'n':
					// Numeric representation of a month, without leading zeros
					return new Intl.DateTimeFormat( locales, { month: 'numeric', timeZone } ).format( date )
				case 'M':
					// A short textual representation of a month, three letters
					return new Intl.DateTimeFormat( locales, { month: 'short', timeZone } ).format( date )
				case 'F':
					// A full textual representation of a month
					return new Intl.DateTimeFormat( locales, { month: 'long', timeZone } ).format( date )
				case 'E':
					// A narrow textual representation of a month
					return new Intl.DateTimeFormat( locales, { month: 'narrow', timeZone } ).format( date )
				case 't':
					// Number of days in the given month
					return daysInMonth( date )
				
				/** Year */
				case 'L':
					// Whether it's a leap year - 1 if it is a leap year, 0 otherwise
					return Number( isLeapYear( date.getFullYear() ) )
				case 'Y':
					// A full numeric representation of a year, at least 4 digits, with - for years BCE
					return new Intl.DateTimeFormat( locales, { year: 'numeric', timeZone } ).format( date )
				case 'y':
					// A two digit representation of a year
					return new Intl.DateTimeFormat( locales, { year: '2-digit', timeZone } ).format( date )
				
				/** Time */
				case 'a':
					// Lowercase Ante Meridiem and Post Meridiem
					{
						const hours = Number( formatDate( date, 'G', locales, _timeZone ) )
						return getAmOrPm( hours ).toLowerCase()
					}
				case 'A':
					// Uppercase Ante Meridiem and Post Meridiem
					{
						const hours = Number( formatDate( date, 'G', locales, _timeZone ) )
						return getAmOrPm( hours )
					}
				case 'B':
					// Swatch Internet Time
					return getSwatchBeat( date, 0 )
				case 'h':
					// 12-hour format of an hour with leading zeros
					return (
						new Intl.DateTimeFormat( locales, { hour: '2-digit', hour12: true, timeZone } )
							.format( date )
							.replace( /(\sAM|\sPM)/gi, '' )
					)
				case 'g':
					// 12-hour format of an hour without leading zeros
					return (
						new Intl.DateTimeFormat( locales, { hour: 'numeric', hour12: true, timeZone } )
							.format( date )
							.replace( /(\sAM|\sPM)/gi, '' )
					)
				case 'H':
					// 24-hour format of an hour with leading zeros
					return new Intl.DateTimeFormat( locales, { hour: '2-digit', hour12: false, timeZone } ).format( date )
				case 'G':
					// 24-hour format of an hour
					return Number(
						new Intl.DateTimeFormat( locales, { hour: 'numeric', hour12: false, timeZone } )
							.format( date )
					).toString()
				case 'i':
					// Minutes with leading zeros
					return (
						new Intl.DateTimeFormat( locales, { minute: 'numeric', hour12: false, timeZone } )
							.format( date )
							.padStart( 2, '0' )
					)
				case 's':
					// Seconds with leading zeros
					return (
						date.getSeconds().toString().padStart( 2, '0' )
					)
				case 'v':
					// Milliseconds
					return date.getMilliseconds()
				case 'u':
					// Microseconds
					return date.getMilliseconds() * 1000
				
				/** Timezone */
				case 'e':
					// Current runtime Timezone identifier
					return (
						timeZone || getCurrentTimeZoneId()
					)
				case 'C':
					// Timezone identifier - long
					return (
						getTimezoneName( {
							date			: date,
							locale			: locales,
							timeZone		: _timeZone,
							timeZoneName	: 'long'
						} )
					)
				case 'K':
					// Timezone identifier - long generic
					return (
						getTimezoneName( {
							date			: date,
							locale			: locales,
							timeZone		: _timeZone,
							timeZoneName	: 'longGeneric'
						} )
					)
				case 'Q':
					// Timezone identifier - long offset
					return (
						getTimezoneName( {
							date			: date,
							locale			: locales,
							timeZone		: _timeZone,
							timeZoneName	: 'longOffset'
						} )
					)
				case 'q':
					// same as `Q` but without colon
					return (
						formatDate( date, 'Q', locales, _timeZone )
							.replace( /:/g, '') 
					)
				case 'R':
					// Timezone identifier - short
					return (
						getTimezoneName( {
							date			: date,
							locale			: locales,
							timeZone		: _timeZone,
							timeZoneName	: 'short'
						} )
					)
				case 'V':
					// Timezone identifier - short generic
					return (
						getTimezoneName( {
							date			: date,
							locale			: locales,
							timeZone		: _timeZone,
							timeZoneName	: 'shortGeneric'
						} )
					)
				case 'o':
					// Timezone identifier - short offset
					return (
						getTimezoneName( {
							date			: date,
							locale			: locales,
							timeZone		: _timeZone,
							timeZoneName	: 'shortOffset'
						} )
					)
				case 'I':
					// Whether or not the date is in Daylight Saving Time - 1 if it in DST, 0 otherwise
					return Number( isDstObserved( date, _timeZone ) )
				case 'O':
					// Difference to Greenwich time (GMT) without colon between hours and minutes
					return getTimezoneOffsetHm( _date, _timeZone, '' )
				case 'P':
					// Difference to Greenwich time (GMT) with colon between hours and minutes
					return getTimezoneOffsetHm( _date, _timeZone )
				case 'p':
					// The same as P, but returns Z instead of +00:00
					{ const offset = getTimezoneOffsetHm( _date, _timeZone )
					
					return (
						offset === '+00:00' ? 'Z' : offset
					) }
				case 'Z':
					// Timezone offset in seconds. The offset for timezones west of UTC is always negative, and for those east of UTC is always positive
					return getTimezoneOffsetH( _date, _timeZone ) * 60 * 60
	
				/** Full Datetime */
				case 'c':
					// ISO 8601 date
					return date.toISOString()
				case 'r':
					// » RFC 2822/» RFC 5322 formatted date
					// we need to reconstruct the `Date.toString()` output to add Timezone support.
					return formatDate( date, 'D M d Y H:i:s q (C)', locales, _timeZone )
				case 'U':
					// Seconds since the Unix Epoch (January 1 1970 00:00:00 GMT)
					return date.getTime() / 1000
				default:
					return ch
			}
		} )
	)


	return result.join( '' )

}