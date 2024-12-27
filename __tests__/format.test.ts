import { InSeconds } from '@/common'
import { formatLocaleDate, secondsToUnit } from '@/format'
import { formatDate } from '@/format/formatDate'
import { formatRelativeTime } from '@/format/formatRelativeTime'


describe( 'formatDate', () => {

	it( 'formats a date with no parameters', () => {
		const formatted = new Intl.DateTimeFormat( undefined )
			.format( new Date() )

		expect( formatDate() ).toBe( formatted )
	} )


	it( 'formats a date with tokenized parameter', () => {
		const date		= new Date( '2024-04-20T16:20:35.420Z' )
		const tokensMap = {
			d: '20',
			j: '20',
			D: 'Sat',
			J: 'S',
			l: 'Saturday',
			w: '6',
			N: '6',
			S: 'th',
			z: '111',
			b: 'in the evening',
			W: '16',
			m: '04',
			n: '4',
			M: 'Apr',
			F: 'April',
			E: 'A',
			t: '30',
			L: '1',
			Y: '2024',
			y: '24',
			a: 'pm',
			A: 'PM',
			B: '723',
			g: '6',
			G: '18',
			h: '06',
			H: '18',
			i: '20',
			s: '35',
			v: '420',
			u: '420000',
			e: 'Europe/Rome',
			C: 'Central European Summer Time',
			K: 'Central European Time',
			Q: 'GMT+02:00',
			q: 'GMT+0200',
			R: 'GMT+2',
			V: 'Italy Time',
			T: 'GMT+2',
			I: '1',
			O: '+0200',
			P: '+02:00',
			p: '+02:00',
			Z: '7200',
			c: '2024-04-20T16:20:35.420Z',
			r: 'Sat Apr 20 2024 18:20:35 GMT+0200 (Central European Summer Time)',
			U: '1713630035.42',
		}
		const tokens	= Object.keys( tokensMap ).join( ' - ' )
		const expected	= Object.values( tokensMap ).join( ' - ' )		
		
		expect( formatDate( date, tokens, 'en-US', 'Europe/Rome' ) )
			.toBe( expected )
		
	} )


	it( 'returns Z instead of +00:00 with `p` token', () => {
		expect( formatDate( new Date( '2024-04-20T16:20:35.420Z' ), 'p', 'en-US', 'UTC' ) )
			.toBe( 'Z' )
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


	it( 'formats a date with the current Timezone', () => {

		expect( formatDate( '2024-11-24T21:20:00.000Z', 'e', 'en-US' ) )
			.toBeTruthy() // cannot test it's result since it depends on the current machine Timezone.

	} )


	it( 'formats a date with the given Timezone', () => {

		expect( formatDate( '2024-11-24T21:20:00.000Z', 'Y-m-d g.i A', 'en-US', 'America/New_York' ) )
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
		
		expect( secondsToUnit( total ) )
			.toStrictEqual( expect.objectContaining( {
				years			: 3,
				months			: 2,
				weeks			: 3,
				days			: 4,
				hours			: 4,
				minutes			: 35,
				seconds			: 23,
				milliseconds	: 230,
				microseconds	: 245,
			} ) )

	} )


	it( 'converts seconds to the right units with negative value', () => {
		
		expect( secondsToUnit( total * -1 ) )
			.toStrictEqual( expect.objectContaining( {
				years			: -3,
				months			: -2,
				weeks			: -3,
				days			: -4,
				hours			: -4,
				minutes			: -35,
				seconds			: -23,
				milliseconds	: -230,
				microseconds	: -245,
			} ) )

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


	it( 'skips weeks with negative value', () => {
		
		const result = secondsToUnit( total * -1, true )

		expect( result.weeks ).toBe( null )
		expect( result.days ).toBe( nDays * -1 )

	} )

} )

describe( 'formatLocaleDate', () => {

	const date = new Date( '2024-04-20T14:20:00.000Z' )

	it( 'formats the current Date', () => {
		expect( typeof formatLocaleDate() ).toBe( 'string' )
	} )


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
				timeZone: 'Europe/Rome',
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

describe( 'formatRelativeTime', () => {

	it( 'formats relative time', () => {

		expect( formatRelativeTime() ).toBe( 'now' )

	} )


	it( 'formats past dates', () => {
		const currentDate = new Date()

		expect( formatRelativeTime(
			new Date().setMonth( currentDate.getMonth() - 2 )
		) ).toBe( '2 months ago' )
	} )


	it( 'formats future dates', () => {
		const currentDate = new Date()

		expect( formatRelativeTime(
			new Date().setHours( currentDate.getHours() + 2 )
		) ).toBe( 'in 2 hours' )
	} )
	
	
	it( 'formats dates with a custom locale', () => {
		const currentDate = new Date()
	
		expect( formatRelativeTime(
			new Date().setDate( currentDate.getDate() - 1 ), 'it-IT'
		) ).toBe( 'ieri' )
	} )


	it( 'formats dates with a custom options', () => {
		const currentDate	= new Date()
		const yesterdayDate	= new Date().setDate( currentDate.getDate() - 1 )

		expect(
			formatRelativeTime( yesterdayDate, undefined, { numeric: 'always' } )
		).toBe( '1 day ago' )
	} )

} )