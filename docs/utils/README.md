# Utility functions

[🔙 Back](../../README.md)

## daysInMonth

The `daysInMonth` function determines the total number of days in the month for a given date.\
If no date is provided, it defaults to the current date.

<details>

<summary>Parameters</summary>

| Parameter   | Type                          | Default | Description                        |
|-------------|-------------------------------|---------|------------------------------------|
| `date`      | `string \| number \| Date`    | `new Date()` | (Optional) The date for which the number of days in the month is calculated. |

</details>

<details>

<summary>Returns</summary>

Type: `number`

Returns the total number of days in the month of the provided date.

</details>

<details>

<summary>Usage</summary>

### Default Behavior

```ts
import { daysInMonth } from '@alessiofrittoli/date-utils'
// or
import { daysInMonth } from '@alessiofrittoli/date-utils/utils'

console.log( daysInMonth() )
// Outputs: Number of days in the current month (e.g., 30 for November).
```

### Specific Date

```ts
import { daysInMonth } from '@alessiofrittoli/date-utils'
// or
import { daysInMonth } from '@alessiofrittoli/date-utils/utils'

console.log( daysInMonth( new Date( '2024-02-01' ) ) )
// or
console.log( daysInMonth( '2024-02-01' ) )
// or
console.log( daysInMonth( 1706745600000 ) )
// Outputs: `29` (February - 2024 is a leap year).
```

</details>

## getDayOfYear

The `getDayOfYear` function calculates the day number of the year for a given date.

<details>

<summary>Parameters</summary>

| Parameter   | Type                          | Default | Description                        |
|-------------|-------------------------------|---------|------------------------------------|
| `date`      | `string \| number \| Date`    | `new Date()` | (Optional) The date to calculate the day number of the year. |

</details>

<details>

<summary>Returns</summary>

Type: `number`

The day number of the year, where January 1st is 1.

</details>

## getISOWeekNumber

The `getISOWeekNumber` function calculates the ISO 8601 week number for a given date. In the ISO 8601 standard:

- The first week of the year starts on the Monday of the week containing January 4th.
- Weeks begin on Monday and have 7 days.

<details>

<summary>Parameters</summary>

| Parameter   | Type                          | Default | Description                        |
|-------------|-------------------------------|---------|------------------------------------|
| `date`      | `string \| number \| Date`    | `new Date()` | (Optional) The date for which the ISO week number is calculated. |

</details>

<details>

<summary>Returns</summary>

Type: `number`

The ISO 8601 week number for the given date.

</details>

## getISODayOfWeek

The `getISODayOfWeek` function retrieves the ISO 8601 numeric representation of the day of the week.

Unlike the standard JavaScript [Date.prototype.getDay()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDay), which returns `0` for Sunday and `1` for Monday, the ISO standard assigns `1` to Monday and `7` to Sunday.

<details>

<summary>Parameters</summary>

| Parameter   | Type                          | Default | Description                        |
|-------------|-------------------------------|---------|------------------------------------|
| `date`      | `string \| number \| Date`    | `new Date()` | (Optional) The date for which the ISO day of the week is calculated. |

</details>

<details>

<summary>Returns</summary>

Type: `number`

The ISO 8601 numeric day of the week.

</details>

## isLeapYear

The `isLeapYear` function determines whether a given year is a leap year according to the Gregorian calendar.

<details>

<summary>Parameters</summary>

| Parameter | Type     | Description                                 |
|-----------|----------|---------------------------------------------|
| `year`    | `number` | The year to check (e.g., 2024, 2025, etc.). |

</details>

<details>

<summary>Returns</summary>

Type: `boolean`

- `true` if the year is a leap year.
- `false` if the year is not a leap year.

</details>

## getAmOrPm

The `getAmOrPm` function returns the appropriate Ante Meridiem (`AM`) or Post Meridiem (`PM`) designation based on the given hour value.

<details>

<summary>Parameters</summary>

| Parameter | Type     | Description                               |
|-----------|----------|-------------------------------------------|
| `hours`   | `number` | The hour value (24-hour format) to check. |

</details>

<details>

<summary>Returns</summary>

Type: `string`

- 'AM' if the hours value is less than 12.
- 'PM' if the hours value is 12 or greater.

</details>

## getSwatchBeat

The `getSwatchBeat` function calculates the Swatch Internet Time (also known as beat), a unit of time introduced by Swatch in the late 1990s, where the day is divided into 1000 "beats". One beat represents 1/1000th of a day, or 1 minute and 26.4 seconds.

<details>

<summary>Parameters</summary>

| Parameter | Type                       | Default      | Description                               |
|-----------|----------------------------|--------------|-------------------------------------------|
| `date`    | `string \| number \| Date` | `new Date()` | (Optional) The date for which to calculate the swatch beat. Accepts a date string, a timestamp, or a `Date` object. |
| `places`  | `number` | `3` | (Optional) The number of decimal places to round the result. |

</details>

<details>

<summary>Returns</summary>

Type: `string`

The Swatch Beat as a string rounded to the specified number of decimal places.

</details>