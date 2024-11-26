import { InSeconds } from '../common'

export type SecondsToUnitReturn = {
	/** Years in given time. */
	years: number
	/** Months in given time. */
	months: number
	/** Weeks in given time. */
	weeks: number
	/** Days in given time. */
	days: number
	/** Hours in given time. */
	hours: number
	/** Minutes in given time. */
	minutes: number
	/** Seconds in given time. */
	seconds: number
	/** Milliseconds in given time. */
	milliseconds: number
}


/**
 * Translates seconds into human readable format of milliseconds, seconds, minutes, hours, days, weeks, months and years.
 * 
 * @see [StackOverflow thread](https://stackoverflow.com/questions/8211744/convert-time-interval-given-in-seconds-into-more-human-readable-form#answer-8211778)
 * 
 * @param	time	The number of seconds to be processed.
 * @returns			An object containing the amount of time for each unit.
 */
export const secondsToUnit = (
	time		: number,
	skipWeeks?	: boolean,
): SecondsToUnitReturn => {

	const isPast = time < 0
	if ( isPast ) time = time * -1
	
	const	yearInSeconds	= InSeconds._1Year,
			monthInSeconds	= InSeconds._1Month,
			weekInSeconds	= InSeconds._1Week,
			dayInSeconds	= InSeconds._1Day,
			hourInSeconds	= InSeconds._1Hour;

	const	years	= Math.floor( time / yearInSeconds ),
			months	= Math.floor( ( time % yearInSeconds ) / monthInSeconds ),
			weeks	= skipWeeks ? 0 : Math.floor( ( ( time % yearInSeconds ) % monthInSeconds ) / weekInSeconds ),
			days	= (
				skipWeeks
					? Math.floor( ( ( time % yearInSeconds ) % monthInSeconds ) / dayInSeconds )
					: Math.floor( ( ( ( time % yearInSeconds ) % monthInSeconds ) % weekInSeconds ) / dayInSeconds )
			),
			hours	= Math.floor( ( ( time % yearInSeconds ) % dayInSeconds ) / hourInSeconds ),
			minutes	= Math.floor( ( ( ( time % yearInSeconds ) % dayInSeconds ) % hourInSeconds ) / 60 ),
			seconds		= Math.floor( ( ( ( time % yearInSeconds ) % dayInSeconds ) % hourInSeconds ) % 60 ),
			milliseconds= Math.floor( ( ( ( ( time % yearInSeconds ) % dayInSeconds ) % hourInSeconds ) % 60 ) * 1000 % 1000 );
	
	if ( isPast ) {
		return {
			years: years * -1, months: months * -1, weeks: weeks * -1, days: days * -1,
			hours: hours * -1, minutes: minutes * -1, seconds: seconds * -1, milliseconds: milliseconds * -1,
		}
	}
	return {
		years, months, weeks, days,
		hours, minutes, seconds, milliseconds,
	}
	
}


/**
 * Format date.
 * 
 * @param	date	( Optional ) The date string | milliseconds since UNIX epoch time | Date object. Default: `new Date()`.
 * @param	locale	( Optional ) The Intl.LocalesArgument.
 * @param	options	( Optional ) The Intl.DateTimeFormatOptions.
 * @returns			An object containing the Date object and the localized time string based on the given locale.
 */
export const formatLocaleDate = (
	date		: string | number | Date = new Date(),
	locale?		: Intl.LocalesArgument,
	options?	: Intl.DateTimeFormatOptions
) => (
	new Date( date )
		.toLocaleString( locale, {
			day		: 'numeric',
			month	: 'long',
			year	: 'numeric',
			...options,
		} )
)