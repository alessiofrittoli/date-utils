# Timezone Identifiers constants

[🔙 Back](../README.md)

This module provides constants for timezone identifiers categorized by geographic regions. These identifiers follow the IANA Time Zone Database format.

---

## Constants

| Name                 | Type                | Description                                              |
|----------------------|---------------------|----------------------------------------------------------|
| AFRICA_TIMEZONES     | `readonly string[]` | List of timezone identifiers for the African continent.  |
| AMERICA_TIMEZONES    | `readonly string[]` | List of timezone identifiers for the Americas.           |
| ASIA_TIMEZONES       | `readonly string[]` | List of timezone identifiers for the Asian continent.    |
| EUROPE_TIMEZONES     | `readonly string[]` | List of timezone identifiers for the European continent. |
| OCEANIA_TIMEZONES    | `readonly string[]` | List of timezone identifiers for the Oceania region.     |
| ANTARCTICA_TIMEZONES | `readonly string[]` | List of timezone identifiers for Antarctica.             |
| ATLANTIC_TIMEZONES   | `readonly string[]` | List of timezone identifiers for the Atlantic region.    |
| OTHER_TIMEZONES      | `readonly string[]` | List of other timezone identifiers not tied to a specific continent, such as UTC. |
| TIMEZONE_IDENTIFIERS | `object`          | An object grouping all timezone identifiers by geographic region. |

---

## Usage

### Accessing All European Timezones

```ts
import { EUROPE_TIMEZONES } from '@alessiofrittoli/date-utils'
// or
import { EUROPE_TIMEZONES } from '@alessiofrittoli/date-utils/timezones/identifiers'
// or 
import { TIMEZONE_IDENTIFIERS } from '@alessiofrittoli/date-utils/timezones/identifiers'

console.log( EUROPE_TIMEZONES )
// or
console.log( TIMEZONE_IDENTIFIERS.europe )
// Outputs: [ ... ]
```

---

### Retrieving Other Tmezones

```ts
import { OTHERS_TIMEZONES } from '@alessiofrittoli/date-utils'
// or
import { OTHERS_TIMEZONES } from '@alessiofrittoli/date-utils/timezones/identifiers'
// or 
import { TIMEZONE_IDENTIFIERS } from '@alessiofrittoli/date-utils/timezones/identifiers'

console.log( OTHERS_TIMEZONES )
// or
console.log( TIMEZONE_IDENTIFIERS.others )
// Output: [ 'UTC' ]
```