# Common utilities

[🔙 Back](../../README.md)

### `InSeconds` Enum

The `InSeconds` enum is a utility that provides pre-defined constants for common time durations in seconds.

It is designed to simplify time-related calculations/convertions and improve code readability.

<details>

<summary>Constants Overview</summary>

| Constant  | Value (in seconds) | Description                         |
|-----------|--------------------|-------------------------------------|
| `_1ms`    | `0.001`            | Represents one millisecond.         |
| `_1us`    | `0.000001`         | Represents one microsecond (µs).    |
| `_1M`     | `60`               | Represents one minute (60 seconds). |
| `_10M`    | `600`              | Represents ten minutes.             |
| `_30M`    | `1800`             | Represents thirty minutes.          |
| `_1Hour`  | `3600`             | Represents one hour.                |
| `_1Day`   | `86400`            | Represents one day (24 hours).      |
| `_1Week`  | `604800`           | Represents one week (7 days).       |
| `_1Month` | `2592000`          | Represents one month (30 days).     |
| `_1Year`  | `31536000`         | Represents one year (365 days).     |

</details>

---

<details>

<summary>Usage</summary>

The `InSeconds` enum can be used in any context where time intervals in seconds are needed. It ensures clarity and avoids the need for manual calculations.

#### Using `InSeconds` for Delays

```ts
import { InSeconds } from '@alessiofrittoli/date-utils'
// or
import { InSeconds } from '@alessiofrittoli/date-utils/common'

// Set a timeout for 10 minutes
setTimeout( () => {
  console.log( '10 minutes have passed!' )
}, InSeconds._10M )
```

#### Using `InSeconds` for convertions

```ts
import { InSeconds } from '@alessiofrittoli/date-utils'
// or
import { InSeconds } from '@alessiofrittoli/date-utils/common'

console.log( '230ms ->', 230 * InSeconds._1ms + 's' )
```

#### Adding Durations

```ts
import { InSeconds } from '@alessiofrittoli/date-utils'
// or
import { InSeconds } from '@alessiofrittoli/date-utils/common'

const totalTime = InSeconds._1Hour + InSeconds._30M; // 90 minutes in seconds
console.log( `Total time in seconds: ${ totalTime }` )
```

</details>

---

### isValidDate

The `isValidDate` function checks whether a given value is a valid JavaScript `Date` object.

This ensures both the type and the validity of the `Date` instance.

The function acts as a type guard, narrowing the type of the checked variable to `Date` if the function returns true.

This is pretty usefull to check `Date` validity and safe access to properties and methods of the `Data` instance.

<details>

<summary>Parameters</summary>

| Parameter | Type      | Description                        |
|-----------|-----------|------------------------------------|
| `d`       | `unknown` | The value to validate as a `Date`. |

</details>

---

<details>

<summary>Returns</summary>

Type: `boolean`

Returns true if the value is:

- An instance of Date.
- A valid date (not `Invalid Date {}`).

Returns false otherwise.

</details>

---

<details>

<summary>Usage</summary>

#### Validating Dates

```ts
import { isValidDate } from '@alessiofrittoli/date-utils'
// or
import { isValidDate } from '@alessiofrittoli/date-utils/common'

const validDate     = new Date( '2024-01-01' )
const invalidDate   = new Date( 'invalid date string' )
const nonDateValue  = '2024-01-01'

console.log( isValidDate( validDate ) )     // true
console.log( isValidDate( invalidDate ) )   // false
console.log( isValidDate( nonDateValue ) )  // false
```

</details>

---

### sortByDate

The `sortByDate` function is a custom comparison function designed to be used with the `Array.prototype.sort()` method.

It sorts date values in either ascending or descending order, based on the specified sorting method.

<details>

<summary>Parameters</summary>

| Parameter | Type      | Description                        |
|-----------|-----------|------------------------------------|
| `date1`   | `string \| number \| Date`   | The first date to compare. Accepted formats include `Date` objects, date strings, or timestamps. |
| `date2`   | `string \| number \| Date`   | The second date to compare. Same format as `date1`. |
| `method`  | `'ASC' \| 'DESC'` (Optional) | Determines the sorting order: |
|           |                              | - `'ASC'`: Sort from oldest to newest. |
|           |                              | - `'DESC'`: Sort from newest to oldest. Default is 'DESC'. |

</details>

---

<details>

<summary>Returns</summary>

Type: `number`

A number used by the sort() method to determine the order:

- Negative value: `date1` comes before `date2`.
- Zero: The dates are considered equal or invalid.
- Positive value: `date1` comes after `date2`.

</details>

---

<details>

<summary>Usage</summary>

#### Sorting Dates in Descending Order (Newest to Oldest)

```ts
import { sortByDate } from '@alessiofrittoli/date-utils'
// or
import { sortByDate } from '@alessiofrittoli/date-utils/common'

const dates = [ '2023-12-01', '2024-01-01', '2023-11-01' ]
dates.sort( sortByDate )

console.log( dates )
// Outputs: [ '2024-01-01', '2023-12-01', '2023-11-01' ]
```

#### Sorting Dates in Ascending Order (Oldest to Newest)

```ts
import { sortByDate } from '@alessiofrittoli/date-utils'
// or
import { sortByDate } from '@alessiofrittoli/date-utils/common'

const dates = [ '2023-12-01', '2024-01-01', '2023-11-01' ]
dates.sort( ( a, b ) => sortByDate( a, b, 'ASC' ) )

console.log( dates )
// Outputs: [ '2023-11-01', '2023-12-01', '2024-01-01' ]
```

</details>

---

### getTimeDiff

The `getTimeDiff` function calculates the time difference in milliseconds between two dates.

It provides a simple way to compute the difference, where the first date is considered the "future" date and the second date is the "older" one.

<details>

<summary>Parameters</summary>

| Parameter    | Type                         | Description                                          |
|--------------|------------------------------|------------------------------------------------------|
| `futureDate` | `string \| number \| Date`   | (Optional) The future date. Default is `new Date()`. |
| `olderDate`  | `string \| number \| Date`   | (Optional) The older date. Default is `new Date()`.  |

</details>

---

<details>

<summary>Returns</summary>

Type: `number`

The time difference in milliseconds between the `futureDate` and `olderDate`.

- A positive value indicates that the `futureDate` is after the `olderDate`.
- A negative value indicates the opposite.

</details>

---

<details>

<summary>Usage</summary>

#### Calculate Time Difference Between Two Dates

```ts
import { getTimeDiff } from '@alessiofrittoli/date-utils'
// or
import { getTimeDiff } from '@alessiofrittoli/date-utils/common'

const date1 = new Date( '2024-01-01T12:00:00' )
const date2 = new Date( '2024-01-01T10:00:00' )

console.log( getTimeDiff( date1, date2 ) ) // Outputs: 7200000 (2 hours in milliseconds)
```

#### Using Default Parameters

```ts
import { getTimeDiff } from '@alessiofrittoli/date-utils'
// or
import { getTimeDiff } from '@alessiofrittoli/date-utils/common'

const date1 = new Date( '2024-01-01T12:00:00' )
const date2 = new Date( '2024-01-01T10:00:00' )

console.log( getTimeDiff() ) // Outputs: 0
```

#### Using Epoch Timestamps

```ts
import { getTimeDiff } from '@alessiofrittoli/date-utils'
// or
import { getTimeDiff } from '@alessiofrittoli/date-utils/common'

const futureDate    = 1704067200000
const olderDate     = 1703980800000

console.log( getTimeDiff( futureDate, olderDate ) ) // Outputs: 86400000 (1 day in milliseconds)
```

</details>

---

### combineDates

The `combineDates` function allows for the combination of two dates by adding or subtracting a time value (in milliseconds) to/from a reference date.

By default, it performs an addition operation but can handle negative time values to perform subtraction.

<details>

<summary>Parameters</summary>

| Parameter | Type                       | Description                                                                |
|-----------|----------------------------|----------------------------------------------------------------------------|
| `a`       | `string \| number \| Date` | The time offset to add or subtract from the reference date. Can be:        |
|           |                            | - A date string.                                                           |
|           |                            | - Milliseconds since UNIX epoch time.                                      |
|           |                            | - A Date object.                                                           |
| `b`       | `string \| number \| Date` | (Optional) The reference date. Default is the current date (`new Date()`). |

</details>

---

<details>

<summary>Returns</summary>

Type: `Date`

A new `Date` object representing the resulting date after combining the specified time offset and reference date.

</details>

---

<details>

<summary>Usage</summary>

#### Adding Time to the Current Date

```ts
import { combineDates } from '@alessiofrittoli/date-utils'
// or
import { combineDates } from '@alessiofrittoli/date-utils/common'

console.log( combineDates( 120 * 1000 ) ) // Add 2 minutes to the current date.
```

#### Adding Time to a Specific Date

```ts
import { combineDates } from '@alessiofrittoli/date-utils'
// or
import { combineDates } from '@alessiofrittoli/date-utils/common'

console.log( combineDates( 120 * 1000, '2024-01-01T10:00:00' ) )
// Outputs: 2024-01-01T10:02:00.000Z (2 minutes added).
```

#### Subtracting Time from a Date

```ts
import { combineDates } from '@alessiofrittoli/date-utils'
// or
import { combineDates } from '@alessiofrittoli/date-utils/common'

console.log( combineDates( -120 * 1000, '2024-01-01T10:00:00' ) )
// Outputs: 2024-01-01T09:58:00.000Z (2 minutes subtracted).
```

</details>
