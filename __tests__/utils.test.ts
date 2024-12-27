import { daysInMonth, getAmOrPm, getDayOfYear, getISODayOfWeek, getISOWeekNumber, getSwatchBeat, isLeapYear } from '@/utils'

describe( 'daysInMonth', () => {

	it( 'retrieve the number of days in the current Date', () => {

		expect( daysInMonth() )
			.toBeGreaterThanOrEqual( 28 )

	} )


	it( 'retrieve the number of days in the given date', () => {

		expect( daysInMonth( new Date( '2024-11-01' ) ) )
			.toBe( 30 )

	} )


	it( 'handles leap years', () => {
		
		expect( daysInMonth( new Date( '2025-02-01' ) ) )
			.toBe( 28 )
		expect( daysInMonth( new Date( '2024-02-01' ) ) )
			.toBe( 29 )

	} )

} )


describe( 'getDayOfYear', () => {

	it( 'retrieves the number of the day of the current Date', () => {
		expect( getDayOfYear() )
			.toBeGreaterThanOrEqual( 1 )
	} )


	it( 'retrieves the number of the day of a given date', () => {
		expect( getDayOfYear( new Date( '2025-01-01' ) ) )
			.toBe( 1 )
		expect( getDayOfYear( new Date( '2025-12-31' ) ) )
			.toBe( 365 )
	} )


	it( 'handles leap years', () => {
		expect( getDayOfYear( new Date( '2024-02-29' ) ) )
			.toBe( 60 )
		expect( getDayOfYear( new Date( '2024-12-31' ) ) )
			.toBe( 366 )
	} )

} )


describe( 'getISOWeekNumber', () => {

	it( 'retrieves the week number of the current Date', () => {
		expect( getISOWeekNumber() )
			.toBeGreaterThanOrEqual( 1 )
	} )


	it( 'retrieves the correct value', () => {
		expect( getISOWeekNumber( new Date( '2024-12-29' ) ) )
			.toBe( 52 )
		expect( getISOWeekNumber( new Date( '2024-12-31' ) ) )
			.toBe( 1 )
	} )

} )


describe( 'getISODayOfWeek', () => {

	it( 'returns the ISO day of the week of the current Date', () => {
		expect( getISODayOfWeek() )
			.toBeGreaterThanOrEqual( 1 )
		expect( getISODayOfWeek() )
			.toBeLessThanOrEqual( 7 )
	} )


	it( 'returns 1 for Monday', () => {
		expect( getISODayOfWeek( new Date( '2025-01-06' ) ) )
			.toBe( 1 )
	} )


	it( 'returns 7 for Sunday', () => {
		expect( getISODayOfWeek( new Date( '2025-01-12' ) ) )
			.toBe( 7 )
	} )

} )


describe( 'isLeapYear', () => {

	it( 'returns true for a leap year', () => {
		expect( isLeapYear( 2024 ) )
			.toBe( true )
	} )


	it( 'returns false for a non-leap year', () => {
		expect( isLeapYear( 2025 ) )
			.toBe( false )
	} )

} )


describe( 'getAmOrPm', () => {

	it( 'returns the correct value', () => {
		expect( getAmOrPm( 0 ) )
			.toBe( 'AM' )
		expect( getAmOrPm( 12 ) )
			.toBe( 'PM' )
	} )

} )


describe( 'getSwatchBeat', () => {

	it( 'returns the swatch beat of the current Date', () => {
		expect( typeof getSwatchBeat() )
			.toBe( 'string' )
	} )


	it( 'returns the correct value', () => {
		expect( getSwatchBeat( new Date( '2024-11-29' ) ) )
			.toBe( '41.667' )
	} )


	it( 'handles custom places', () => {
		expect( getSwatchBeat( new Date( '2024-11-29' ), 2 ) )
			.toBe( '41.67' )
	} )

} )

