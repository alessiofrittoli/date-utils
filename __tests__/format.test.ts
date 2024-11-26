import { InSeconds } from '@/common'
import { formatLocaleDate, secondsToUnit } from '@/format'
import formatDate from '@/format/formatDate'

describe( 'formatDate', () => {

	it( 'formats a date with no parameters', () => {
		const formatted = new Intl.DateTimeFormat( undefined )
			.format( new Date() )

		expect( formatDate() ).toBe( formatted )
	} )


	it( 'formats a date with tokenized parameter', () => {
		const date		= new Date( '2024-04-20T16:20:00.000Z' )
		const tokens	= "d - j - D - J - l - w - N - S - z - b - W - m - n - M - F - E - t - L - Y - y - a - A - g - G - h - H - i - s - v - e - O - P - Z - c - r - U"
		const expected	= "20 - 20 - Sat - S - Saturday - 6 - 6 - th - 111 - in the evening - 16 - 04 - 4 - Apr - April - A - 30 - 1 - 2024 - 24 - pm - PM - 6 - 18 - 06 - 18 - 20 - 00 - 0 - Europe/Rome - +0200 - +02:00 - 7200 - 2024-04-20T16:20:00.000Z - Sat Apr 20 2024 18:20:00 GMT+0200 (Central European Summer Time) - 1713630000"
		
		expect( formatDate( date, tokens, 'en-US', 'Europe/Rome' ) )
			.toBe( expected )
	} )


	it( 'formats a date with Intl.DateTimeFormatOptions parameter', () => {
		const formatted = (
			formatDate( '2024-11-24', {
				year	: 'numeric',
				month	: 'long',
				day		: 'numeric',
			}, 'en-US' )
		)
		expect( formatted ).toBe( 'November 24, 2024' )
	} )


	it( 'formats a date with the given Timezone', () => {

		expect( formatDate( '2024-11-24T21:20:00Z', 'Y-m-d g.i A', 'en-US', 'America/New_York' ) )
			.toBe( '2024-11-24 4.20 PM' )

	} )

} )

describe( 'secondsToUnit', () => {

	const years			= 3 * InSeconds._1Year
	const months		= 2 * InSeconds._1Month
	const nDays			= 25
	const days			= nDays * InSeconds._1Day
	const hours			= 4 * InSeconds._1Hour
	const minutes		= 35 * InSeconds._1M
	const seconds		= 23
	const milliseconds	= 230 * InSeconds._1ms
	const microseconds	= 245 * InSeconds._1us
	const total			= years + months + days + hours + minutes + seconds + milliseconds + microseconds
	

	it( 'converts seconds to the right units', () => {
		
		const result = secondsToUnit( total )

		const pass = (
			result.years === 3 &&
			result.months === 2 &&
			result.weeks === 3 &&
			result.days === 4 &&
			result.hours === 4 &&
			result.minutes === 35 &&
			result.seconds === 23 &&
			result.milliseconds === 230 &&
			result.microseconds === 245
		)		

		expect( pass ).toBe( true )

	} )


	it( 'splits units', () => {
		
		const ninetyMinutes = InSeconds._1Hour + InSeconds._30M
		const { hours, minutes } = secondsToUnit( ninetyMinutes )
		
		expect( hours ).toBe( 1 )
		expect( minutes ).toBe( 30 )

	} )


	it( 'skips weeks', () => {

		const result = secondsToUnit( total, true )

		expect( result.weeks ).toBe( null )
		expect( result.days ).toBe( nDays )

	} )

} )

describe( 'formatLocaleDate', () => {

	const date = new Date( '2024-04-20T14:20:00.000Z' )

	it( 'formats a date with custom locale', () => {
		expect( formatLocaleDate( date, 'it-IT' ) ).toBe( '20 aprile 2024' )
	} )


	it( 'formats a date with custom options', () => {

		expect(
			formatLocaleDate( date, 'it-IT', {
				day		: '2-digit',
				month	: 'long',
				hour	: '2-digit',
				minute	: '2-digit',
				hour12	: false,
			} )
		).toBe( '20 aprile alle ore 16:20' )

	} )


	it( 'formats a date with a custom timezone identifier', () => {} )
		expect(
			formatLocaleDate( date, 'en-US', {
				day		: '2-digit',
				month	: 'long',
				hour	: '2-digit',
				minute	: '2-digit',
				hour12	: false,
				timeZone: 'America/New_York',
			} )
		).toBe( 'April 20 at 10:20' )
} )