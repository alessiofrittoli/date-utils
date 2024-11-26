export enum InSeconds
{
	_1M		= 1 * 60,
	_10M	= 10 * 60,
	_30M	= 30 * 60,
	_1Hour	= 1 * 60 * 60,
	_1Day	= 1 * 24 * 60 * 60,
	_1Week	= 1 * 7 * 24 * 60 * 60,
	_1Month	= 30 * 24 * 60 * 60,
	_1Year	= 365 * 24 * 60 * 60,
}


/**
 * Check if date is a valid date.
 * 
 * @param	d The date to check. 
 * @returns	True if date is a Date object, false otherwise.
 */
export const isValidDate = ( d: unknown ): d is Date => d instanceof Date && ! isNaN( d as unknown as number )


/**
 * A compare function to use as the Array.prototype.sort() method.
 * 
 * @param	date1	The oldest date to compare.
 * @param	date2	The newest date to compare.
 * @param	method	( Optional ) The sorting method. Default: 'DESC'.
 * 					- 'ASC' from oldest to newest.
 * 					- 'DESC' from newest to oldest.
 * 
 * @see [Array.prototype.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
 * 
 * @returns The sorting result.
 */
export const sortByDate = (
	date1: string | number | Date,
	date2: string | number | Date,
	method: 'ASC' | 'DESC' = 'DESC'
) => {
	date1 = new Date( date1 )
	date2 = new Date( date2 )

	const _dt1	= date1.getTime(),
		_dt2	= date2.getTime();

	if ( isNaN( _dt1 ) || isNaN( _dt2 ) ) return 0

	if ( method === 'DESC' ) return ( _dt2 - _dt1 )

	return ( _dt1 - _dt2 )

}


/**
 * Get time difference in milliseconds between two dates.
 * 
 * @param	futureDate	( Optional ) The date string | milliseconds since UNIX epoch time | Date object. Default: `new Date()`.
 * @param	olderDate	( Optional ) The older date string | milliseconds since UNIX epoch time | Date object. Default: `new Date()`.
 * 
 * @returns	The difference between the future Date time and the older Date.
 */
export const getTimeDiff = (
	futureDate	: string | number | Date = new Date(),
	olderDate	: string | number | Date = new Date(),
) => (
	new Date( futureDate ).getTime() - new Date( olderDate ).getTime()
)


/**
 * Combine Dates.
 * 
 * By default it will perform an `add` operation.
 * 
 * You can use a negative number as the Date time value in milliseconds since midnight, January 1, 1970 UTC
 * to perform a `subtraction` to the reference Date.
 * 
 * @param	a The date string | milliseconds since UNIX epoch time | Date object. Default: `new Date()`.
 * @param	b ( Optional ) The reference date string | milliseconds since UNIX epoch time | Date object. Default: `new Date()`.
 * 
 * @usage
 * ```ts
 * combineDates( 120 * 1000 )
 * // will add 2 minutes to the actual local date
 * combineDates( 120 * 1000, new Date( '01/01/2024 10:00' ) )
 * // will add 2 minutes to the given date instance
 * combineDates( 120 * 1000, '01/01/2024 10:00' )
 * // Mon Jan 01 2024 10:02:00 GMT+0100 (Ora standard dell’Europa centrale)
 * combineDates( -120 * 1000, '01/01/2024 10:00' )
 * // Mon Jan 01 2024 09:58:00 GMT+0100 (Ora standard dell’Europa centrale)
 * ```
 * @returns	The combined Date.
 */
export const combineDates = (
	a	: string | number | Date,
	b	: string | number | Date = new Date(),
) => (
	new Date(
		( new Date( b ) ).getTime()
		+ new Date( a ).getTime()
	)
)