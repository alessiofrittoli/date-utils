type Division = {
	amount	: number
	unit	: Intl.RelativeTimeFormatUnit
}

const DIVISIONS: Division[] = [
	{ amount: 60, unit: 'seconds' },
	{ amount: 60, unit: 'minutes' },
	{ amount: 24, unit: 'hours' },
	{ amount: 7, unit: 'days' },
	{ amount: ( 365 / 7 ) / 12, unit: 'weeks' },
	{ amount: 12, unit: 'months' },
	{ amount: Number.POSITIVE_INFINITY, unit: 'years' },
]


/**
 * Relative date format.
 * 
 * @param	date	The Date to format.
 * @param	locales	The Intl.RelativeTimeFormat locale to use. Defaults to user locale.
 * 
 * @link	[Relative Date Internationalization In JavaScript](https://blog.webdevsimplified.com/2020-07/relative-time-format)
 * 
 * @usage ```ts
 * const currentDate = new Date()
 * 
 * formatTimeAgo( new Date().setMonth( currentDate.getMonth() - 2 ) )
 * // 2 months ago
 * formatTimeAgo( new Date().setDate( currentDate.getDate() - 1 ) )
 * // yesterday
 * formatTimeAgo( new Date().setDate( currentDate.getDate() - 9 ) )
 * // last week
 * ```
 * 
 * @returns	The relative time formatted date string.
 */
export const formatTimeAgo = (
	date		: string | number | Date,
	locales?	: string | string[]
) => {

	date = date ? new Date( date ) : new Date()

	const formatter = new Intl.RelativeTimeFormat( locales, {
		numeric: 'auto',
	} )

	let duration = ( date.getTime() - new Date().getTime() ) / 1000

	for ( let i = 0; i < DIVISIONS.length; i++ ) {
		const division = DIVISIONS[ i ]
		if ( Math.abs( duration ) < division!.amount ) {
			return formatter.format( Math.round( duration ), division!.unit )
		}
		duration /= division!.amount
	}
}