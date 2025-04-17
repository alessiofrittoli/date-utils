# Timezone Identifiers Types

[🔙 Back](../README.md)

This module defines TypeScript types for timezone identifiers categorized by geographic regions.

These types are based on the constants provided in the identifiers module. See [Timezone Identifiers constants](../constants/README.md)

## Types

### `AfricaTimezone`

Represents a valid timezone identifier for the African continent.

Type: `ValueOf<typeof AFRICA_TIMEZONES>`

---

### `AmericaTimezone`

Represents a valid timezone identifier for the Americas.

Type: `ValueOf<typeof AMERICA_TIMEZONES>`

---

### `AsiaTimezone`

Represents a valid timezone identifier for the Asian continent.

Type: `ValueOf<typeof ASIA_TIMEZONES>`

---

### `EuropeTimezone`

Represents a valid timezone identifier for the European continent.

Type: `ValueOf<typeof EUROPE_TIMEZONES>`

---

### `OceaniaTimezone`

Represents a valid timezone identifier for the Oceania region.

Type: `ValueOf<typeof OCEANIA_TIMEZONES>`

---

### `AntarcticaTimezone`

Represents a valid timezone identifier for Antarctica.

Type: `ValueOf<typeof ANTARCTICA_TIMEZONES>`

---

### `AtlanticTimezone`

Represents a valid timezone identifier for the Atlantic region.

Type: `ValueOf<typeof ATLANTIC_TIMEZONES>`

---

### `OthersTimezone`

Represents timezone identifiers not specific to a continent, such as UTC.

Type: `ValueOf<typeof OTHERS_TIMEZONES>`

---

### `Timezone`

A union type that represents any valid timezone identifier from all categories.

Type:

```ts
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
```

---

## Usage

### Using a Specific Timezone Type

```ts
import type { AfricaTimezone } from '@alessiofrittoli/date-utils'
// or
import type { AfricaTimezone } from '@alessiofrittoli/date-utils/timezones/types'

const africanTimezone: AfricaTimezone = 'Africa/Lagos'
```

---

### Using Timezone Type in your functions

```ts
import type { Timezone } from '@alessiofrittoli/date-utils'
// or
import type Timezone from '@alessiofrittoli/date-utils/timezones/types'

const yourAwesomeFunction = ( timezone: Timezone ) => { ... }

console.log( yourAwesomeFunction( 'America/New_York' ) )
```

---

### Validating Timezone

```ts
import type { Timezone } from '@alessiofrittoli/date-utils'
// or
import type Timezone from '@alessiofrittoli/date-utils/timezones/types'

const isValidTimezone = ( input: string ): input is Timezone => {
  // Logic to validate against TIMEZONE_IDENTIFIERS constants
  return true // Simplified
}

console.log( isValidTimezone( 'America/New_York' ) ) // true
```
