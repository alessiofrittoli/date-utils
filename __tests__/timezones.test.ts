import { getTimezoneHFromGMTDateString, getTimezoneName, getTimezoneOffsetH, getTimezoneOffsetHm, isDstObserved } from '@/timezones'

describe( 'getTimezoneHFromGMTDateString', () => {

	it( 'extracts offset from RFC 2822/5322 Date String', () => {
		const dateString = 'Fri Nov 29 2024 19:13:58 GMT+0100 (Central European Standard Time)'
		expect( getTimezoneHFromGMTDateString( dateString ) ).toBe( 1 )
	} )


	it( 'handles invalid date string', () => {
		expect( getTimezoneHFromGMTDateString( 'invalid date' ) ).toBeNaN()
	} )


	it( 'fallbacks to current TZ with valid date string and no GMT offset', () => {
		const dateString = 'Fri Nov 29 2024 19:13:58'
		expect( getTimezoneHFromGMTDateString( dateString ) ).not.toBeNaN()
	} )


	it( 'handles ISO date string', () => {
		expect( getTimezoneHFromGMTDateString( new Date().toISOString() ) ).toBe( 0 )
	} )

} )


describe( 'getTimezoneOffsetH', () => {

	it( 'retrieves the current machine Timezone', () => {

		expect( getTimezoneOffsetH() ).not.toBeNaN()
		
	} )


	it( 'retrieves the Timezone for a specific Date', () => {

		expect( getTimezoneOffsetH( new Date( '2024-06-01' ) ) ).not.toBeNaN()
		
	} )


	it( 'retrieves the given Timezone offset of a specific Date', () => {

		expect( getTimezoneOffsetH( new Date( '2024-11-29' ), 'Europe/Rome' ) ).toBe( 1 )
		expect( getTimezoneOffsetH( new Date( '2024-06-01' ), 'Europe/Rome' ) ).toBe( 2 )
		
	} )

	it( 'extracts offset from RFC 2822/5322 Date String', () => {
		const dateString = 'Fri Nov 29 2024 19:13:58 GMT+0100 (Central European Standard Time)'
		expect( getTimezoneOffsetH( dateString ) ).toBe( 1 )
	} )


	it( 'handles ISO date string', () => {
		expect( getTimezoneHFromGMTDateString( new Date().toISOString() ) ).toBe( 0 )
	} )

} )


describe( 'getTimezoneOffsetHm', () => {

	it( 'returns offset with default separator', () => {
		expect( getTimezoneOffsetHm( new Date( '2024-06' ), 'Europe/Rome' ) )
			.toBe( '+02:00' )
	} )


	it( 'returns offset with no separator', () => {
		expect( getTimezoneOffsetHm( new Date( '2024-06' ), 'Europe/Rome', false ) )
			.toBe( '+0200' )
	} )


	it( 'returns offset with a custom separator', () => {
		expect( getTimezoneOffsetHm( new Date( '2024-06' ), 'Europe/Rome', '.' ) )
			.toBe( '+02.00' )
	} )

} )


describe( 'getTimezoneName', () => {

	it( 'returns the current Timezone in shortOffset format', () => {
		expect( getTimezoneName().startsWith( 'GMT' ) ).toBe( true )
	} )


	it( 'returns the Timezone for the given Date and Timezone ID', () => {
		expect( getTimezoneName( {
			date		: new Date( '2024-06-01' ),
			timeZone	: 'America/New_York',
		} ) ).toBe( 'GMT-4' )
	} )


	it( 'returns the Timezone using custom locale', () => {
		expect( getTimezoneName( {
			date			: new Date( '2024-06-01' ),
			locale			: 'it-iT',
			timeZone		: 'Europe/Rome',
			timeZoneName	: 'long',
		} ) ).toBe( 'Ora legale dell’Europa centrale' )
	} )
	
} )


describe( 'isDstObserved', () => {

	it( 'accepts no arguments', () => {
		const isDst = isDstObserved()
	
		expect( isDst ).not.toBeNull()
	} )


	it( 'accepts a Date argument', () => {
		const isDst = isDstObserved( new Date( '2024-06-01' ) )		
		expect( isDst ).not.toBeNull()
	} )

	
	it( 'handles different Timezone other than System Timezone', () => {
		expect(
			isDstObserved( new Date( '2024-10-27T00:59:00.000Z' ), 'Europe/Rome' )
		).toBe( true )
		expect(
			isDstObserved( new Date( '2024-10-27T01:00:00.000Z' ), 'Europe/Rome' )
		).toBe( false )
	} )

} )