# Timezone Utility functions

[🔙 Back](../README.md)

## getCurrentTimeZoneId

The `getCurrentTimeZoneId` function retrieves the current runtime timezone identifier, adapting to whether the code is executed on a client or server environment.

- Server Environment:
Returns the timezone identifier set in the `process.env.TZ` environment variable. Defaults to the current machine settings if `TZ` is not explicitly defined.

- Client Environment:
Returns the user's current timezone identifier based on their local system settings.

### Returns

Type: `Timezone`

The current runtime timezone identifier (e.g., `"America/New_York"`, `"Europe/London"`, `"Asia/Tokyo"`).

<details>

<sumamry>Usage</sumamry>

### Getting the Current Timezone

```ts
import { getCurrentTimeZoneId } from '@alessiofrittoli/date-utils'
// or
import { getCurrentTimeZoneId } from '@alessiofrittoli/date-utils/timezones'

console.log( getCurrentTimeZoneId() )
```

### Using Timezone with a Custom Formatter

```ts
import { formatDate, getCurrentTimeZoneId } from '@alessiofrittoli/date-utils'
// or
import { formatLocaleDate } from '@alessiofrittoli/date-utils/format'
import { getCurrentTimeZoneId } from '@alessiofrittoli/date-utils/timezones'

const formattedDate = formatLocaleDate( new Date(), 'en-US', {
  day     : '2-digit',
  month   : 'long',
  hour    : '2-digit',
  minute  : '2-digit',
  hour12  : false,
  timeZone: getCurrentTimeZoneId(),
} )
console.log( `Today is ${ formattedDate } in your timezone.` )
```

</details>

---

## getCurrentMachineDateTimezoneOffsetH

The `getCurrentMachineDateTimezoneOffsetH` function retrieves the timezone offset in hours for a specified date, based on the current machine's timezone settings.

### Notes

- The offset is based on the current machine's timezone settings and accounts for daylight saving time when applicable.
- The returned value is influenced by the operating system's timezone configuration.
- Useful for local timezone calculations and debugging timezone-specific issues.

<details>

<summary>Parameters</summary>

| Parameter   | Type                          | Default | Description                        |
|-------------|-------------------------------|---------|------------------------------------|
| `date`      | `string \| number \| Date`    | `new Date()` | (Optional) The date for which to calculate the timezone offset. Accepts a date string, a timestamp, or a `Date` object. |

</details>

---

<details>

<summary>Returns</summary>

Type: `number`

The timezone offset in hours from UTC, based on the current machine's timezone settings. Positive values indicate offsets ahead of UTC, and negative values indicate offsets behind UTC.

</details>

---

<details>

<summary>Usage</summary>

### Retrieve the Current Machine's Timezone Offset

```ts
import { getCurrentMachineDateTimezoneOffsetH } from '@alessiofrittoli/date-utils'
// or
import { getCurrentMachineDateTimezoneOffsetH } from '@alessiofrittoli/date-utils/timezones'

console.log( getCurrentMachineDateTimezoneOffsetH() )
// Outputs: -8 (for UTC-8)
```

### Determine the Offset for a Specific Date

```ts
import { getCurrentMachineDateTimezoneOffsetH } from '@alessiofrittoli/date-utils'
// or
import { getCurrentMachineDateTimezoneOffsetH } from '@alessiofrittoli/date-utils/timezones'

console.log( getCurrentMachineDateTimezoneOffsetH( '2024-06-01T16:20:00Z' ) )
// Outputs: 2 (if the machine is set to UTC+2 for the specified date)
```

### Perform Timezone Comparisons

```ts
import { getCurrentMachineDateTimezoneOffsetH } from '@alessiofrittoli/date-utils'
// or
import { getCurrentMachineDateTimezoneOffsetH } from '@alessiofrittoli/date-utils/timezones'

const offsetNow   = getCurrentMachineDateTimezoneOffsetH()
const offsetPast  = getCurrentMachineDateTimezoneOffsetH( '2000-01-01T12:00:00Z' )

if ( offsetNow !== offsetPast ) {
  console.log( 'The machine timezone offset has changed over time.' )
}
```

</details>

---

## getTimezoneHFromGMTDateString

The `getTimezoneHFromGMTDateString` function parses a date string in RFC 2822/RFC 5322 format to retrieve the GMT offset (e.g., `GMT+0100`).\
It calculates the corresponding timezone offset in hours, taking into account both hours and minutes.

If no valid GMT offset is found in the string, the function defaults to the current machine Timezone offset (see [getCurrentMachineDateTimezoneOffsetH](#getcurrentmachinedatetimezoneoffseth)).

<details>

<summary>Parameters</summary>

| Parameter   | Type     | Description                        |
|-------------|----------|------------------------------------|
| `date`      | `string` | The RFC 2822/RFC 5322 formatted date string containing a GMT offset (e.g., GMT+0100). |

</details>

---

<details>

<summary>Returns</summary>

Type: `number`

The timezone offset in hours extracted from the GMT offset in the input string.

- Positive values indicate offsets ahead of UTC.
- Negative values indicate offsets behind UTC.

</details>

---

<details>

<summary>Usage</summary>

### Valid GMT Offset in Date String

```ts
import { getTimezoneHFromGMTDateString } from '@alessiofrittoli/date-utils'
// or
import { getTimezoneHFromGMTDateString } from '@alessiofrittoli/date-utils/timezones'

const dateString = 'Fri Nov 29 2024 11:00:13 GMT+0100 (Central European Standard Time)'
console.log( getTimezoneHFromGMTDateString( dateString ) )
// Outputs: 1
```

### GMT Offset with Negative Timezone

```ts
import { getTimezoneHFromGMTDateString } from '@alessiofrittoli/date-utils'
// or
import { getTimezoneHFromGMTDateString } from '@alessiofrittoli/date-utils/timezones'

const dateString = 'Fri Nov 29 2024 03:00:13 GMT-0800 (Pacific Standard Time)'
console.log( getTimezoneHFromGMTDateString( dateString ) )
// Outputs: -8
```

### No GMT Offset Present

```ts
import { getTimezoneHFromGMTDateString } from '@alessiofrittoli/date-utils'
// or
import { getTimezoneHFromGMTDateString } from '@alessiofrittoli/date-utils/timezones'

const invalidString = 'Fri Nov 29 2024 11:00:13'
const isoString     = '2024-11-29T10:00:13.000Z'
console.log( getTimezoneHFromGMTDateString( invalidString ) ) 
// Outputs: N (fallbacks to the current machine Timezone offset)
console.log( getTimezoneHFromGMTDateString( isoString ) ) 
// Outputs: 0
```

</details>

---

## getTimezoneOffsetH

The `getTimezoneOffsetH` function retrieves the timezone offset in hours for a given date and optional timezone identifier.\
The function adapts to various date formats and accounts for timezone-specific differences.

This function works differently depending on the input:

1. **Date with GMT offset:** If the `date` string includes a GMT offset (e.g., `"Fri Nov 29 2024 11:00:13 GMT+0100"`), the function uses that offset.
2. **Date without GMT offset**: If the date does not contain a GMT offset or is not a string (timestamp/Date object), the function calculates the offset based on the current machine's timezone settings or the specified `timeZone`.

It provides consistent results for various date representations and ensures that timezone identifiers are handled appropriately.

<details>

<summary>Parameters</summary>

| Parameter   | Type                          | Default      | Description                        |
|-------------|-------------------------------|--------------|------------------------------------|
| `date`      | `string \| number \| Date`    | `new Date()` | (Optional) The input date, which can be a date string, milliseconds since the UNIX epoch, or a `Date` object. |
| `timeZone`  | `Timezone`                    | -            | (Optional) The timezone identifier (e.g., America/New_York). Ignored if the date string contains a GMT offset. |

</details>

---

<details>

<summary>Returns</summary>

Type: `number`

The timezone offset in hours from UTC for the specified date and timezone.

- Positive values indicate offsets ahead of UTC.
- Negative values indicate offsets behind UTC.

</details>

---

<details>

<summary>Usage</summary>

### Current Machine's Timezone Offset

```ts
import { getTimezoneOffsetH } from '@alessiofrittoli/date-utils'
// or
import { getTimezoneOffsetH } from '@alessiofrittoli/date-utils/timezones'

console.log( getTimezoneOffsetH() )
// Outputs: 1 (if the machine's timezone is UTC+1)
```

### Timezone Offset for a Specific Date

```ts
import { getTimezoneOffsetH } from '@alessiofrittoli/date-utils'
// or
import { getTimezoneOffsetH } from '@alessiofrittoli/date-utils/timezones'

cconsole.log( getTimezoneOffsetH( new Date( '2024-06' ) ) ) 
// Outputs: 2 ( for UTC+2 during summer in Europe/Rome )
```

### Offset Using Timezone Identifier

```ts
import { getTimezoneOffsetH } from '@alessiofrittoli/date-utils'
// or
import { getTimezoneOffsetH } from '@alessiofrittoli/date-utils/timezones'

console.log( getTimezoneOffsetH( new Date(), 'America/Los_Angeles' ) )
// Outputs: -8 (UTC-8 for America/Los_Angeles in winter)

console.log( getTimezoneOffsetH( new Date( '2024-06' ), 'America/Los_Angeles' ) )
// Outputs: -7 (UTC-7 for America/Los_Angeles in summer)
```

### Offset from RFC 2822/5322 Date String

```ts
import { getTimezoneOffsetH } from '@alessiofrittoli/date-utils'
// or
import { getTimezoneOffsetH } from '@alessiofrittoli/date-utils/timezones'

const dateString = 'Fri Nov 29 2024 11:00:13 GMT+0100 (Central European Standard Time)'

console.log( getTimezoneOffsetH( dateString ) ) 
// Outputs: 1 (from GMT+0100 in the date string)

console.log( getTimezoneOffsetH( dateString, 'America/Los_Angeles' ) ) 
// Outputs: 1 (timezone identifier is ignored since GMT+0100 is present)

console.log( getTimezoneOffsetH( new Date( dateString ), 'America/Los_Angeles' ) ) 
// Outputs: -8 (UTC-8 for America/Los_Angeles in winter)
```

### Offset from ISO Date String

```ts
import { getTimezoneOffsetH } from '@alessiofrittoli/date-utils'
// or
import { getTimezoneOffsetH } from '@alessiofrittoli/date-utils/timezones'

const isoString = '2024-11-29T10:00:00.000Z'

console.log( getTimezoneOffsetH( isoString ) ) 
// Outputs: 1 (based on the machine's timezone)

console.log( getTimezoneOffsetH( isoString, 'America/Los_Angeles' ) )
// Outputs: -8 (UTC-8 for the specified timezone)
```

</details>

---

## getTimezoneOffsetHm

The `getTimezoneOffsetHm` function retrieves the timezone offset for a specified date and timezone identifier, formatted as hours and minutes with an optional separator.

<details>

<summary>Parameters</summary>

| Parameter   | Type                          | Default      | Description                        |
|-------------|-------------------------------|--------------|------------------------------------|
| `date`      | `string \| number \| Date`    | `new Date()` | (Optional) The date to calculate the timezone offset for. |
| `timeZone`  | `Timezone`                    | -            | (Optional) The timezone identifier for the offset calculation. |
| `separator` | `string \| false`             | `':'`        | (Optional) Separator between hours and minutes in the formatted offset. If false, no separator is added. |

</details>

---

<details>

<summary>Returns</summary>

Type: `string`

The timezone offset as a string formatted in `±hh:mm` (or `±hhmm` if separator is `false`).

</details>

---

<details>

<summary>Usage</summary>

### Default Separator (:)

```ts
import { getTimezoneOffsetHm } from '@alessiofrittoli/date-utils'
// or
import { getTimezoneOffsetHm } from '@alessiofrittoli/date-utils/timezones'

console.log( getTimezoneOffsetHm() )
// Outputs: "+01:00" (depending on Date and Timezone)
```

### No Separator

```ts
import { getTimezoneOffsetHm } from '@alessiofrittoli/date-utils'
// or
import { getTimezoneOffsetHm } from '@alessiofrittoli/date-utils/timezones'

console.log( getTimezoneOffsetHm( new Date(), 'America/Los_Angeles', false ) )
// Outputs: "-0800"
```

### Custom Separator

```ts
import { getTimezoneOffsetHm } from '@alessiofrittoli/date-utils'
// or
import { getTimezoneOffsetHm } from '@alessiofrittoli/date-utils/timezones'

console.log( getTimezoneOffsetHm( new Date(), 'Asia/Tokyo', '-' ) )
// Outputs: "+09-00"
```

</details>

---

## getTimezoneName

The `getTimezoneName` function retrieves a formatted timezone name based on the provided date, locale, and options.

<details>

<summary>Parameters</summary>

| Parameter              | Type                                         | Default         | Description                        |
|------------------------|----------------------------------------------|-----------------|------------------------------------|
| `options`              | `object`                                     | -               | (Optional) Configuration object for the function. |
| `options.date`         | `string \| number \| Date`                   | -               | (Optional) The date to format. Defaults to the current date if not provided. |
| `options.locale`       | `Intl.LocalesArgument`                       | `System Locale` | (Optional) The locale(s) to use for formatting. |
| `options.timeZone`     | `Timezone`                                   | -               | (Optional) The timezone identifier to format. Defaults to the system timezone. |
| `options.timeZoneName` | `Intl.DateTimeFormatOptions['timeZoneName']` | `shortOffset`   | (Optional) Format for the timezone name, e.g., `'short'`, `'long'`, `'shortOffset'`, `'longOffset'`. |

</details>

---

<details>

<summary>Returns</summary>

Type: `string`

The formatted timezone name as a string, based on the provided options.

</details>

---

<details>

<summary>Usage</summary>

### Default Behavior

```ts
import { getTimezoneName } from '@alessiofrittoli/date-utils'
// or
import { getTimezoneName } from '@alessiofrittoli/date-utils/timezones'

console.log( getTimezoneName() )
// Outputs: "GMT+2" (depending on the system timezone and date)
```

### Specific Date and Timezone

```ts
import { getTimezoneName } from '@alessiofrittoli/date-utils'
// or
import { getTimezoneName } from '@alessiofrittoli/date-utils/timezones'

console.log( getTimezoneName( {
  date    : new Date( '2024-06-15' ),
  timeZone: 'America/New_York',
} ) )
// Outputs: "GMT-4" (during daylight saving time)
```

### Custom Locale

```ts
import { getTimezoneName } from '@alessiofrittoli/date-utils'
// or
import { getTimezoneName } from '@alessiofrittoli/date-utils/timezones'

console.log( getTimezoneName( {
  date          : new Date( '2024-06-01' ),
  locale        : 'it-iT',
  timeZone      : 'Europe/Rome',
  timeZoneName  : 'long',
} ) )
// Outputs: "Ora legale dell’Europa centrale"
```

</details>

---

## isDstObserved

The `isDstObserved` function determines whether a given date falls within Daylight Saving Time (DST).

<details>

<summary>Parameters</summary>

| Parameter   | Type                          | Default      | Description                                                  |
|-------------|-------------------------------|--------------|--------------------------------------------------------------|
| `date`      | `string \| number \| Date`    | `new Date()` | (Optional) The date to check for DST.                        |
| `timeZone`  | `Timezone`                    | -            | (Optional) The timezone identifier used for the calculation. |

</details>

<details>

<summary>Returns</summary>

Type: `boolean`

- Returns `true` if the provided date falls within Daylight Saving Time.
- Returns `false` if it does not.

</details>

<details>

<summary>Usage</summary>

### Default Behavior

```ts
import { isDstObserved } from '@alessiofrittoli/date-utils'
// or
import { isDstObserved } from '@alessiofrittoli/date-utils/timezones'

console.log( isDstObserved() )
// Outputs: `true` or `false` based on the current date and system timezone.
```

### Specific Date

```ts
import { isDstObserved } from '@alessiofrittoli/date-utils'
// or
import { isDstObserved } from '@alessiofrittoli/date-utils/timezones'

console.log( isDstObserved( new Date( '2024-06-01' ) ) )
// Outputs: `true` ( June typically observes DST in most regions ).
```

### Specific Timezone

```ts
import { isDstObserved } from '@alessiofrittoli/date-utils'
// or
import { isDstObserved } from '@alessiofrittoli/date-utils/timezones'

console.log( isDstObserved( new Date( '2024-12-01' ), 'America/New_York' ) )
// Outputs: `false` (December does not observe DST in New York).
```

</details>
