import { combineDates, getTimeDiff, InSeconds, isValidDate, sortByDate } from '@/common'


describe( 'isValidDate', () => {

	const invalidDate	= new Date( 'invalid date string' )
	const nonDateValue	= '2024-01-01'


	it( 'acts as type guard', () => {
		let pass = false
		const isValid = isValidDate( nonDateValue )
		try {
			if ( isValid ) {
				nonDateValue.toISOString()
			}
			pass = true
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch ( error ) {
			pass = false
		}
		expect( isValid ).toBe( false )
		expect( pass ).toBe( true )
	} )


	it( 'handles invalid dates', () => {
		expect( isValidDate( invalidDate ) ).toBe( false )
	} )

} )


describe( 'sortByDate', () => {

	const dates			= [ '2023-12-01', '2024-01-01', '2023-11-01' ]
	const timestamps	= [ 1701648000000, 1704067200000, 1698969600000 ]
	const invalidDates	= [ 'invalid-date', '2023-11-01', '2024-12-01' ]

	it( 'sorts in descending order', () => {
		const sorted = [ ...dates ].sort( sortByDate )

		expect( sorted.at( 0 ) ).toBe( '2024-01-01' )
		expect( sorted.at( 1 ) ).toBe( '2023-12-01' )
		expect( sorted.at( 2 ) ).toBe( '2023-11-01' )
	} )


	it( 'sorts in ascending order', () => {
		const sorted = [ ...dates ].sort( ( a, b ) => sortByDate( a, b, 'ASC' ) )

		expect( sorted.at( 0 ) ).toBe( '2023-11-01' )
		expect( sorted.at( 1 ) ).toBe( '2023-12-01' )
		expect( sorted.at( 2 ) ).toBe( '2024-01-01' )
	} )


	it( 'sorts timestamps', () => {
		const sorted = [ ...timestamps ].sort( sortByDate )

		expect( sorted.at( 0 ) ).toBe( 1704067200000 )
		expect( sorted.at( 1 ) ).toBe( 1701648000000 )
		expect( sorted.at( 2 ) ).toBe( 1698969600000 )

	} )


	it( 'skips invalid dates', () => {
		const sorted = [ ...invalidDates ].sort( sortByDate )

		expect( sorted.at( 0 ) ).toBe( 'invalid-date' )
		expect( sorted.at( 1 ) ).toBe( '2024-12-01' )
		expect( sorted.at( 2 ) ).toBe( '2023-11-01' )

	} )

} )


describe( 'getTimeDiff', () => {

	it( 'calculates difference between two dates', () => {

		const date1 = new Date( '2024-01-01T12:00:00' )
		const date2 = new Date( '2024-01-01T10:00:00' )

		expect( getTimeDiff( date1, date2 ) )
			.toBe( ( InSeconds._1Hour * 2 ) * 1000 )
		
	} )


	it( 'handles no parameters', () => {

		expect( getTimeDiff() ).toBe( 0 )

	} )


	it( 'handles date string parameters', () => {

		expect( getTimeDiff( '2024-01-01T12:00:00', '2024-01-01T10:00:00' ) )
			.toBe( ( InSeconds._1Hour * 2 ) * 1000 )

	} )


	it( 'handles timestamp parameters', () => {

		expect( getTimeDiff( 1704067200000, 1703980800000 ) )
			.toBe( InSeconds._1Day * 1000 )

	} )


	it( 'handles negative results', () => {

		const date1 = new Date( '2024-01-01T12:00:00' )
		const date2 = new Date( '2024-01-01T10:00:00' )

		expect( getTimeDiff( date2, date1 ) )
			.toBe( -( ( InSeconds._1Hour * 2 ) * 1000 ) )

	} )

} )


describe( 'combineDates', () => {

	it( 'combines time with the current date', () => {

		const addedMs	= 120 * 1000
		const combined	= combineDates( addedMs )

		expect( getTimeDiff( combined ) ).toBe( addedMs )
		
	} )


	it( 'adds time to the given date', () => {

		const addedMs	= 120 * 1000
		const date		= new Date( '2024-01-01T10:00:00' )
		const combined	= combineDates( addedMs, date )

		expect( getTimeDiff( combined, date ) ).toBe( addedMs )

	} )


	it( 'subtracts time to the given date', () => {

		const addedMs	= -120 * 1000
		const date		= new Date( '2024-01-01T10:00:00' )
		const combined	= combineDates( addedMs, date )

		expect( getTimeDiff( combined, date ) ).toBe( addedMs )

	} )

} )