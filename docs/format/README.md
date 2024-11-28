# Formatting functions

[🔙 Back](../../README.md)

### formatDate

The `formatDate` function provides a flexible way to format dates using custom tokens or `Intl.DateTimeFormatOptions`.\
It supports various granularities such as day, week, month, year, time, and timezone components.

<details>

<summary>Parameters</summary>

| Parameter | Type                       | Default      | Description                        |
|-----------|----------------------------|--------------|------------------------------------|
| `_date`   | `string \| number \| Date` | `new Date()` | The date to format. Accepts a date string, milliseconds since UNIX epoch, or a `Date` object. |
| `format`  | `string \| Intl.DateTimeFormatOptions` | - | (Optional) The format string or `Intl.DateTimeFormatOptions` object for custom formatting. |
| `locales` | `Intl.LocalesArgument` | - | Specifies the locale(s) for formatting. |
| `_timeZone` | `string` | - | The timezone to use for formatting. |

</details>

<details>

<summary>Returns</summary>

Type: `string`

Returns a formatted date string based on the provided `format` and options.

</details>

<details>

<summary>Supported Format Tokens</summary>

The following tokens can be used in the format string for custom formatting:

#### Day

| Token | Description                                                  |
|-------|--------------------------------------------------------------|
| `d`   | Day of the month, 2 digits with leading zeros                |
| `j`   | Day of the month without leading zeros                       |
| `D`   | Textual representation of a day, three letters               |
| `J`   | Textual representation of a day, one letter                  |
| `l`   | Full textual representation of the day of the week           |
| `w`   | Numeric representation of the day of the week                |
| `N`   | ISO 8601 numeric representation of the day of the week       |
| `S`   | English ordinal suffix for the day of the month (e.g., "st") |
| `z`   | Day of the year (starting from 0)                            |
| `b`   | Day period (e.g., "AM", "PM")                                |

---

#### Week

| Token | Description                                                  |
|-------|--------------------------------------------------------------|
| `W`   | ISO 8601 week number of the year                             |

---

#### Month

| Token | Description                                                  |
|-------|--------------------------------------------------------------|
| `m`   | Numeric representation of a month, with leading zeros        |
| `n`   | Numeric representation of a month, without leading zeros     |
| `M`   | Short textual representation of a month, three letters       |
| `F`   | Full textual representation of a month                       |
| `E`   | Narrow textual representation of a month                     |
| `t`   | Number of days in the given month                            |

---

#### Year

| Token | Description                                          |
|-------|------------------------------------------------------|
| `L`   | Whether it's a leap year (1 for true, 0 for false)   |
| `Y`   | Full numeric representation of a year, including BCE |
| `y`   | Two-digit representation of a year                   |

---

#### Time

| Token | Description                                     |
|-------|-------------------------------------------------|
| `a`   | Lowercase Ante/Post Meridiem (e.g., "am", "pm") |
| `A`   | Uppercase Ante/Post Meridiem (e.g., "AM", "PM") |
| `g`   | 12-hour format of an hour without leading zeros |
| `G`   | 24-hour format of an hour without leading zeros |
| `h`   | 12-hour format of an hour with leading zeros    |
| `H`   | 24-hour format of an hour with leading zeros    |
| `i`   | Minutes with leading zeros                      |
| `s`   | Seconds with leading zeros                      |
| `v`   | Milliseconds                                    |

---

#### Timezone

| Token | Description                         |
|-------|-------------------------------------|
| `e`   | Current runtime timezone identifier |
| `O`   | Difference to GMT without a colon   |
| `P`   | Difference to GMT with a colon      |
| `Z`   | Timezone offset in seconds          |

---

#### Full Datetime

| Token | Description                      |
|-------|----------------------------------|
| `c`   | ISO 8601 date                    |
| `r`   | RFC 2822/RFC 5322 formatted date |
| `U`   | Seconds since Unix Epoch         |

</details>

<details>

<summary>Usage</summary>

#### Default Formatting

```ts
import { formatDate } from '@alessiofrittoli/date-utils'
// or
import formatDate from '@alessiofrittoli/date-utils/format/formatDate'

formatDate() // Outputs the current date in the default locale and format
```

#### Custom Tokenized Formatting

```ts
import { formatDate } from '@alessiofrittoli/date-utils'
// or
import formatDate from '@alessiofrittoli/date-utils/format/formatDate'

formatDate( '2024-11-24', 'Y-d-m' ) // Outputs: "2024-24-11"
```

#### Using `Intl.DateTimeFormatOptions`

```ts
import { formatDate } from '@alessiofrittoli/date-utils'
// or
import formatDate from '@alessiofrittoli/date-utils/format/formatDate'

formatDate( '2024-11-24', {
	year	: 'numeric',
	month	: 'long',
	day		: 'numeric',
}, 'en-US' )
// Outputs: "November 24, 2024"
```

#### Specifying a Timezone

```ts
import { formatDate } from '@alessiofrittoli/date-utils'
// or
import formatDate from '@alessiofrittoli/date-utils/format/formatDate'

formatDate( '2024-11-24T12:00:00Z', 'Y-m-d H:i', 'en-US', 'America/New_York' )
// Outputs: "2024-11-24 07:00" (formatted in the specified timezone)
```

</details>

<details>

<summary>Notes</summary>

- If format is not provided, the function defaults to `Intl.DateTimeFormat`.
- When using a timezone, ensure it is a valid IANA timezone string (e.g., America/New_York).
- Custom tokens are processed character-by-character, making the format highly customizable.

</details>

---

### secondsToUnit

The `secondsToUnit` function converts a given number of seconds into a more human-readable format, breaking it down into years, months, weeks, days, hours, minutes, seconds, and milliseconds.

Each unit of time (years, months, weeks, days, etc.) is calculated in sequence, representing the cumulative contribution of all larger units.

<details>

<summary>Parameters</summary>

| Parameter   | Type      | Default | Description                        |
|-------------|-----------|---------|------------------------------------|
| `time`      | `number`  | -       | The number of seconds to process. Can be positive (future) or negative (past). |
| `skipWeeks` | `boolean` | `false` | (Optional) If `true`, the calculation skips weeks and adds their time to the `days` property. |

</details>

<details>

<summary>Returns</summary>

Type: `SecondsToUnitReturn`

The function returns an object with the following properties, representing the cumulative breakdown of the input time:

| Property       | Type             | Description                                                                  |
|----------------|------------------|------------------------------------------------------------------------------|
| `years`        | `number`         | The number of whole years contained in the given time. |
| `months`       | `number`         | The remaining months after accounting for years. |
| `weeks`        | `number \| null` | The remaining weeks after accounting for years and months. Will be `null` if `skipWeeks` is set to `true`. |
| `days`         | `number`         | The remaining days after accounting for years, months, and weeks. |
| `hours`        | `number`         | The remaining hours after accounting for all larger units. |
| `minutes`      | `number`         | The remaining minutes after accounting for all larger units. |
| `seconds`      | `number`         | The remaining seconds after accounting for all larger units. |
| `milliseconds` | `number`         | The remaining milliseconds after accounting for all larger units, calculated from fractional seconds. |
| `microseconds` | `number`         | The remaining microseconds after accounting for all larger units, calculated from fractional seconds. |

For example:
Input `100483200` seconds results in:

```ts
{
	years: 3,
	months: 2,
	weeks: 1,
	days: 1,
	hours: 0,
	minutes: 0,
	seconds: 0,
	milliseconds: 0,
	microseconds: 0,
}
```

This corresponds to 3 years, 2 months, 1 week, and 1 day, with no remaining hours, minutes, seconds, milliseconds, or microseconds.

</details>

<details>

<summary>Usage</summary>

#### Basic Usage

```ts
import { secondsToUnit } from '@alessiofrittoli/date-utils'
// or
import { secondsToUnit } from '@alessiofrittoli/date-utils/format'

console.log( secondsToUnit( 100483200 ) )
// Outputs: { years: 3, months: 2, weeks: 1, days: 1, hours: 0, minutes: 0, seconds: 0, milliseconds: 0, microseconds: 0 }
```

#### Skipping Weeks

```ts
import { secondsToUnit } from '@alessiofrittoli/date-utils'
// or
import { secondsToUnit } from '@alessiofrittoli/date-utils/format'

console.log( secondsToUnit( 100483200, true ) )
// Outputs: { years: 3, months: 2, weeks: null, days: 8, hours: 0, minutes: 0, seconds: 0, milliseconds: 0, microseconds: 0 }
```

#### Milliseconds and Microseconds

```ts
import { secondsToUnit } from '@alessiofrittoli/date-utils'
// or
import { secondsToUnit } from '@alessiofrittoli/date-utils/format'

console.log( secondsToUnit( 0.123456 ) )
// Outputs: { years: 0, months: 0, weeks: 0, days: 0, hours: 0, minutes: 0, seconds: 0, milliseconds: 123, microseconds: 456 }
```

#### Negative Time

```ts
import { secondsToUnit } from '@alessiofrittoli/date-utils'
// or
import { secondsToUnit } from '@alessiofrittoli/date-utils/format'

console.log( secondsToUnit( -10000 ) )
// Outputs: { years: 0, months: 0, weeks: 0, days: 0, hours: -2, minutes: -46, seconds: -40, milliseconds: 0, microseconds: 0 }
```

</details>

---

### formatLocaleDate

The `formatLocaleDate` function formats a date into a human-readable string based on the provided locale and formatting options.\
It leverages JavaScript's `Intl.DateTimeFormat` API to customize the output for different regions and styles.

<details>

<summary>Parameters</summary>

| Parameter   | Type                          | Default | Description                        |
|-------------|-------------------------------|---------|------------------------------------|
| `date`      | `string \| number \| Date`    | `new Date()` | (Optional) The input date, which can be a date string, milliseconds since the UNIX epoch, or a `Date` object. |
| `locale`    | `Intl.LocalesArgument`        | -            | (Optional) Specifies the locale (e.g., `"en-US"`, `"fr-FR"`) for formatting. Defaults to the runtime's locale. |
| `options`    | `Intl.DateTimeFormatOptions` | `{ ... }` | (Optional) Options to customize the formatting. Default properties: |
|              |                              |              | - day: 'numeric' |
|              |                              |              | - month: 'long' |
|              |                              |              | - year: 'numeric' |

</details>

<details>

<summary>Returns</summary>

The function returns a formatted date string based on the given `locale` and `options`.

</details>

<details>

<summary>Usage</summary>

#### Basic Usage

```ts
import { formatLocaleDate } from '@alessiofrittoli/date-utils'
// or
import { formatLocaleDate } from '@alessiofrittoli/date-utils/format'

console.log( formatLocaleDate() )
// Outputs: "November 26, 2024" (depending on the current locale)
```

#### Custom locale

```ts
import { formatLocaleDate } from '@alessiofrittoli/date-utils'
// or
import { formatLocaleDate } from '@alessiofrittoli/date-utils/format'

console.log( formatLocaleDate( new Date(), 'en-US' ) )
// Outputs: "November 26, 2024"
```

#### Custom Options

```ts
import { formatLocaleDate } from '@alessiofrittoli/date-utils'
// or
import { formatLocaleDate } from '@alessiofrittoli/date-utils/format'

console.log( formatLocaleDate( new Date(), 'en-US', {
	weekday	: 'long',
	hour	: 'numeric',
	minute	: 'numeric',
} ) )
// Outputs: "Tuesday 7:09 PM"
```

#### Custom Timezone

```ts
import { formatLocaleDate } from '@alessiofrittoli/date-utils'
// or
import { formatLocaleDate } from '@alessiofrittoli/date-utils/format'

console.log( formatLocaleDate( new Date( '2024-11-25T09:30:00.000Z' ), 'en-US', {
	weekday		: 'long',
	hour		: '2-digit',
	minute		: '2-digit',
	second		: '2-digit',
	timeZone	: 'America/Los_Angeles',
} ) )
// Outputs: "Monday 01:30:00 AM"
```

</details>

---

### formatRelativeTime

The `formatRelativeTime` function formats a given date into a relative time string (e.g., "2 months ago," "yesterday," or "last week").\
It leverages the [Intl.RelativeTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat) API for internationalized relative time formatting.

<details>

<summary>Parameters</summary>

| Parameter | Type                             | Default      | Description                        |
|-----------|----------------------------------|--------------|------------------------------------|
| `date`    | `string \| number \| Date`       | `new Date()` | The date to format. Accepts a date string, milliseconds since UNIX epoch, or a `Date` object. |
| `locales` | `Intl.LocalesArgument`           | -            | Specifies the locale(s) for formatting. |
| `options` | `Intl.RelativeTimeFormatOptions` | `{ ... }`            | (Optional) Options to customize the formatting. Default properties: |
|           |                                  |              | - numeric: 'auto' |

</details>

<details>

<summary>Returns</summary>

Type: `string`\
A `string` representing the relative time in a human-readable format.

</details>

<details>

<summary>Usage</summary>

#### Basic usage

```ts
import formatRelativeTime from '@alessiofrittoli/date-utils/format/formatRelativeTime'

console.log( formatRelativeTime() ) // Outputs: "now"
```

#### Two months ago

```ts
import formatRelativeTime from '@alessiofrittoli/date-utils/format/formatRelativeTime'

const currentDate = new Date()

console.log( formatRelativeTime(
	new Date().setMonth( currentDate.getMonth() - 2 )
) )
// Outputs: "2 months ago"
```

#### Last week

```ts
import formatRelativeTime from '@alessiofrittoli/date-utils/format/formatRelativeTime'

const currentDate = new Date()

console.log( formatRelativeTime(
	new Date().setDate( currentDate.getDate() - 9 )
) )
// Outputs: "last week"
```

#### Yesterday

```ts
import formatRelativeTime from '@alessiofrittoli/date-utils/format/formatRelativeTime'

const currentDate = new Date()

console.log( formatRelativeTime(
	new Date().setDate( currentDate.getDate() - 1 )
) )
// Outputs: "yesterday"
```

#### Yesterday - always numeric

```ts
import formatRelativeTime from '@alessiofrittoli/date-utils/format/formatRelativeTime'

const currentDate	= new Date()
const yesterdayDate	= new Date().setDate( currentDate.getDate() - 1 )

console.log(
	formatRelativeTime( yesterdayDate, undefined, { numeric: 'always' } )
)
// Outputs: "1 day ago"
```

#### Custom locale

```ts
import formatRelativeTime from '@alessiofrittoli/date-utils/format/formatRelativeTime'

const currentDate = new Date()

console.log( formatRelativeTime(
	new Date().setDate( currentDate.getDate() - 1 ), 'it-IT'
) )
// Outputs: "ieri"
```

#### Future date

```ts
import formatRelativeTime from '@alessiofrittoli/date-utils/format/formatRelativeTime'

const currentDate = new Date()

console.log( formatRelativeTime(
	new Date().setHours( currentDate.getHours() + 2 )
) )
// Outputs: "in 2 hours"
```

</details>