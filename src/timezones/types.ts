import type {
	AFRICA_TIMEZONES,
	AMERICA_TIMEZONES,
	ANTARCTICA_TIMEZONES,
	ASIA_TIMEZONES,
	ATLANTIC_TIMEZONES,
	EUROPE_TIMEZONES,
	OCEANIA_TIMEZONES,
	OTHERS_TIMEZONES
} from './identifiers'

/**
 * Africa Timezone.
 */
export type AfricaTimezone = ValueOf<typeof AFRICA_TIMEZONES>


/**
 * America Timezone.
 */
export type AmericaTimezone = ValueOf<typeof AMERICA_TIMEZONES>

/**
 * Asia Timezone.
 */
export type AsiaTimezone = ValueOf<typeof ASIA_TIMEZONES>


/**
 * Europe Timezone.
 */
export type EuropeTimezone = ValueOf<typeof EUROPE_TIMEZONES>


/**
 * Oceania Timezone.
 */
export type OceaniaTimezone = ValueOf<typeof OCEANIA_TIMEZONES>


/**
 * Antarctica Timezone.
 */
export type AntarcticaTimezone = ValueOf<typeof ANTARCTICA_TIMEZONES>


/**
 * Atlantic Timezone.
 */
export type AtlanticTimezone = ValueOf<typeof ATLANTIC_TIMEZONES>


/**
 * Other Timezone.
 */
export type OthersTimezone = ValueOf<typeof OTHERS_TIMEZONES>


/**
 * Timezone Identifier.
 */
type Timezone = (
	| OthersTimezone
	| AfricaTimezone
	| AmericaTimezone
	| AsiaTimezone
	| EuropeTimezone
	| OceaniaTimezone
	| AntarcticaTimezone
	| AtlanticTimezone
)


export default Timezone