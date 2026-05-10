# easy-filter

[中文文档](README.cn.md)

[![npm version](https://img.shields.io/npm/v/easy-filter.svg)](https://www.npmjs.com/package/easy-filter)
[![npm downloads](https://img.shields.io/npm/dm/easy-filter.svg)](https://www.npmjs.com/package/easy-filter)
[![license](https://img.shields.io/badge/license-Anti%20996-blue.svg)](https://github.com/996icu/996.ICU/blob/master/LICENSE)
[![996.icu](https://img.shields.io/badge/link-996.icu-red.svg)](https://996.icu)

A lightweight collection of AngularJS-inspired built-in filters for Vue.js.

This package is very small — only 8 functions.

## New Features (v1.7.x)

- Full TypeScript support with type declarations.
- Enhanced `limitTo` filter with more options.
- `number` filter supports string-to-number conversion.
- `date` filter supports `YYYY` pattern matching.

## Documentation

For live examples and docs, visit [easy-filter](https://pschina.github.io/easy-filter/index.html).

## Filter List

- [currency](#currency)
- [date](#date)
- [filter](#filter)
- [limitTo](#limitto)
- [lowercase](#lowercase)
- [number](#number)
- [uppercase](#uppercase)
- [orderBy](#orderby)

## Installation

```bash
npm install easy-filter --save
```

## Usage

```js
import {
  currency,
  date,
  filter,
  limitTo,
  lowercase,
  number,
  uppercase,
  orderBy
} from "easy-filter";

const currencyString = currency(100);
// currencyString => $100.00
```

### TypeScript

Type declarations are included out of the box:

```ts
import { currency, date, number, orderBy } from "easy-filter";

const result: string = currency(1000, "¥", 0);
const formatted: string = date(Date.now(), "yyyy-MM-dd");
```

## Usage in Vue

Register all filters at once:

```js
import EasyFilter from "easy-filter";
import Vue from "vue";

Vue.use(EasyFilter);
```

Or pick only what you need:

```js
import {
  number,
  orderBy,
  // ...
} from "easy-filter";

Vue.filter("number", number);
Vue.filter("orderBy", orderBy);

const easyFilter = { number, orderBy };
Vue.prototype.$easyFilter = Vue.easyFilter = easyFilter;
```

Direct `<script>` include:

```html
<script src="./path/to/easy-filter.min.js"></script>
```

## Filters

### lowercase

Default:

```html
<div>{{ 'Hello' | lowercase }}</div>
<!-- hello -->
```

Specify a range:

```html
<div>{{ 'HELLO' | lowercase(3, 4) }}</div>
<!-- HEllO -->
```

Specify a start position:

```html
<div>{{ 'HELLO' | lowercase(3) }}</div>
<!-- HEllo -->
```

### uppercase

```html
<div>{{ 'Hello' | uppercase }}</div>
<!-- HELLO -->
```

### currency

```html
<div>{{ 1000 | currency }}</div>
<!-- 1000 => $1,000.00 -->
```

Use a different symbol:

```html
<div>{{ 1000 | currency('¥') }}</div>
<!-- 1000 => ¥1,000.00 -->
```

Limit decimal places:

```html
<div>{{ 1000 | currency('¥', 0) }}</div>
<!-- 1000 => ¥1,000 -->
```

Use a different separator:

```html
<div>{{ 1000 | currency('¥', 0, {separator: '.'}) }}</div>
<!-- 1000 => ¥1.000 -->
```

Hide separator:

```html
<div>{{ 1000 | currency('¥', 0, {separator: ''}) }}</div>
<!-- 1000 => ¥1000 -->
```

Place symbol on the right:

```html
<div>{{ 1000 | currency('¥', 0, {symbolOnLeft: false}) }}</div>
<!-- 1000 => 1,000¥ -->
```

Add space between amount and symbol:

```html
<div>{{ 10.012 | currency('BTC', 8, {addSpace: true}) }}</div>
<!-- 10.012 => BTC 10.01200000 -->
```

Enable rounding:

```html
<div>{{ 1000.999 | currency('¥', 2, {round: true}) }}</div>
<!-- 1000.999 => ¥1,001.00 -->
```

Disable zero-padding:

```html
<div>{{ 1000.5 | currency('¥', 2) }}</div>
<!-- 1000.5 => ¥1,000.50 -->

<div>{{ 1000.123 | currency('¥', 2, {pad: false}) }}</div>
<!-- 1000.123 => ¥1,000.12 -->

<div>{{ 1000.5 | currency('¥', 2, {pad: false}) }}</div>
<!-- 1000.5 => ¥1,000.5 -->
```

Combine multiple options:

```html
<div>{{ 1000 | currency('¥', 0, {symbolOnLeft: false, addSpace: true}) }}</div>
<!-- 1000 => 1,000 ¥ -->
```

### date

```html
<div>{{ 1523169365575 | date('yyyy-MM-dd HH:mm:ss EEE', 'cn') }}</div>
<!-- 2018-04-08 14:36:05 星期日 -->

<div>{{ 1523169365575 | date('yyyy-MM-dd HH:mm:ss EE', 'cn') }}</div>
<!-- 2018-04-08 14:36:05 周日 -->

<div>{{ 1523169365575 | date('yyyy') }}</div>
<!-- 2018 -->

<div>{{ 1523169365575 | date('yy') }}</div>
<!-- 18 -->

<div>{{ 1523169365575 | date('HH:mm:ss') }}</div>
<!-- 14:36:05 -->

<div>{{ 1523169365575 | date('hh:mm:ss') }}</div>
<!-- 02:36:05 -->

<div>{{ 1523169365575 | date('EEE', 'en') }}</div>
<!-- Sunday -->

<div>{{ 1523169365575 | date('EE', 'en') }}</div>
<!-- Sun -->

<!-- yyyy, MM, dd, HH, hh, mm, ss, EEE can be used alone or in combination. -->
```

Working with i18n:

```html
<div>{{ 1523169365575 | date('EEE', $t('localWeek')) }}</div>
```

`zh.json`:

```json
{
  "localWeek": {
    "week": [
      "星期日", "星期一", "星期二", "星期三",
      "星期四", "星期五", "星期六"
    ],
    "shortWeek": [
      "周日", "周一", "周二", "周三",
      "周四", "周五", "周六"
    ]
  }
}
```

`en.json`:

```json
{
  "localWeek": {
    "week": [
      "Sunday", "Monday", "Tuesday", "Wednesday",
      "Thursday", "Friday", "Saturday"
    ],
    "shortWeek": ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]
  }
}
```

`ja.json`:

```json
{
  "localWeek": {
    "week": [
      "にちようび", "げつようび", "かようび",
      "すいようび", "もくようび", "きんようび",
      "どようび"
    ],
    "shortWeek": [
      "にちようび", "げつようび", "かようび",
      "すいようび", "もくようび", "きんようび",
      "どようび"
    ]
  }
}
```

### filter

```html
<template>
  <div>
    <input type="text" v-model="match" />
    <table>
      <tr>
        <th>name</th>
        <th>age</th>
        <th>sex</th>
      </tr>
      <tr
        v-for="value in filter(personArray, new RegExp(match,'i'))"
        :key="value.id"
      >
        <td v-text="value.name"></td>
        <td v-text="value.age"></td>
        <td v-text="value.sex"></td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "$easyFilter.filter",
  data() {
    return {
      match: "",
      personArray: [
        { name: "Kimi", sex: "male", age: 8, id: 1 },
        { name: "Cindy", sex: "female", age: 4, id: 2 },
        { name: "Angela", sex: "female", age: 6, id: 3 },
        { name: "Shitou", sex: "male", age: 7, id: 4 },
        { name: "Tiantian", sex: "male", age: 5, id: 5 }
      ]
    };
  },
  methods: {
    filter(input, match) {
      // Exclude certain properties from filtering:
      // const options = {
      //   match,
      //   ignore: ['id'], // ignore the 'id' property
      // }
      // match = options

      // Use in JavaScript
      return this.$easyFilter.filter(input, match);
      // Other filters available:
      // this.$easyFilter.lowercase('WORLD')
      // this.$easyFilter.currency(1000, '¥')
      // this.$easyFilter.date(1523169365575, 'yy-MM-dd')
      // ...
    }
  },
  // For better performance, use a computed property:
  computed: {
    usefulData() {
      return this.$easyFilter.filter(this.personArray, new RegExp(this.match));
    }
  }
};
</script>
<!--
When you type 'an' in the input box it will show:

name      age    sex
Angela    6      female
Tiantian  5      male
-->
```

The `filter` also supports range-based filtering:

```js
// <div v-for="item in filter(personArray, matchFn)" :key="item.id">{{item}}</div>
data () {
  return {
    personArray: [
      {name: 'Kimi', sex: 'male', age: 8, id: 1},
      {name: 'Cindy', sex: 'female', age: 4, id: 2},
      {name: 'Angela', sex: 'female', age: 6, id: 3},
      {name: 'Shitou', sex: 'male', age: 7, id: 4},
      {name: 'Tiantian', sex: 'male', age: 5, id: 5}
    ]
  }
},
methods: {
  matchFn (value) {
    // Select children aged 6 or older
    return value.age >= 6;
  },
  filter (input, matchFn) {
    return this.$easyFilter.filter(input, matchFn);
  }
}
```

### orderBy

```html
<template>
  <div>
    <table>
      <tr>
        <th><button @click="click('name')">name</button></th>
        <th><button @click="click('age')">age</button></th>
        <th><button @click="click('sex')">sex</button></th>
      </tr>
      <tr v-for="value in orderBy(personArray, rule)" :key="value.id">
        <td v-text="value.name"></td>
        <td v-text="value.age"></td>
        <td v-text="value.sex"></td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  name: "$easyFilter.orderBy",
  data() {
    return {
      personArray: [
        { name: "Kimi", sex: "male", age: 8, id: 1 },
        { name: "Cindy", sex: "female", age: 4, id: 2 },
        { name: "Angela", sex: "female", age: 6, id: 3 },
        { name: "Shitou", sex: "male", age: 7, id: 4 },
        { name: "Tiantian", sex: "male", age: 5, id: 5 }
      ],
      rule: null
    };
  },
  methods: {
    click(rule) {
      this.rule = rule;
    },
    orderBy(input, rule, reverse) {
      return this.$easyFilter.orderBy(input, rule, reverse);
    }
    // Or use a custom sort function:
    // orderBy(input, callback = (v1, v2) => v1.att > v2.att ? 1 : -1) {
    //   return this.$easyFilter.orderBy(input, callback)
    // }
  }
};
</script>
<!--
When you click 'name':
name       age    sex
Angela     6      female
Cindy      4      female
Kimi       8      male
Shitou     7      male
Tiantian   5      male

When you click 'age':
name       age    sex
Cindy      4      female
Tiantian   5      male
Angela     6      female
Shitou     7      male
Kimi       8      male

When you click 'sex':
Cindy      4      female
Angela     6      female
Kimi       8      male
Shitou     7      male
Tiantian   5      male

The above results are in ascending order (reverse is undefined).
Set reverse to true for descending order.
You can also prepend '-' to the sort key to reverse results,
e.g. <th @click="click('-name')">name</th>.
-->
```

### limitTo

Creates a new array or string containing only a specified number of elements.
Elements are taken from either the beginning of the source array, string, or number.

```js
export default {
  methods: {
    limitTo(input, limit, options) {
      return this.$easyFilter.limitTo(input, limit, options);
    }
  }
};
```

**Parameters:**

|  Parameter  |        Description        |  Type  |         Default          |
|:-----------:|:-------------------------:|:------:|:------------------------:|
|   `input`   |    Data to be filtered    |  any   |            -             |
|   `limit`   |      Length to limit      | number | Number.POSITIVE_INFINITY |
|  `options`  |  Configuration (see below) | object |   `{startWithIndex: 0}`  |

**Options:**

|    Attribute    |                 Description                 |     Type      |  Default  |
|:---------------:|:-------------------------------------------:|:-------------:|:---------:|
| `startWithIndex` | Start counting from a given index          |    number     |     0     |
|   `startWith`   | Start counting from a given element         |  not number   | undefined |
|    `ignore`     | Ignore matched elements when counting       | RegExp, object | undefined |
|      `cut`      | Whether to trim the front portion           |    boolean    |   false   |

#### Examples

Limit a string to no more than 3 characters:

```html
<div>{{ 'hello' | limitTo(3) }}</div>
<!-- hel -->
```

Limit a string to 3 characters starting from the second letter:

```html
<div>{{ 'hello' | limitTo(3, {startWithIndex: 1}) }}</div>
<!-- hell -->
```

Cut the front portion:

```html
<div>{{ 'hello' | limitTo(3, {startWithIndex: 1, cut: true}) }}</div>
<!-- ell -->
```

Start from a specific element:

```html
<div>{{ 3.1415 | limitTo(2, {startWith: '.'}) }}</div>
<!-- 3.1 -->
```

Ignore irrelevant elements when counting:

```html
<div>{{ 3.1415 | limitTo(2, {startWith: '.', ignore: /\./}) }}</div>
<!-- 3.14 -->
```

Display 8 digits:

```html
<div>{{ 123456789 | limitTo(8) }}</div>
<!-- 12345678 -->

<div>{{ 3.141592653 | limitTo(8, {ignore: /\./}) }}</div>
<!-- 3.1415926 -->
```

Limit arrays:

```js
limitTo([1, 2, 3, 4, 5], 2);
// [1, 2]

limitTo([1, 2, 3, 4, 5], 2, { startWith: 3, cut: true });
// [3, 4]
```

### number

Formats a number as a string (or a string as a number).

When you pass in an integer, it will show one decimal place by default.
For decimals, the string representation is returned.
You can control the number of decimal digits, rounding, and zero-padding via parameters.

| Parameter | Description | Type | Default |
|:---------:|:-----------:|:----:|:-------:|
| `input`   | The value to format | `number \| string` | - |
| `digits`  | Number of decimal places | `number` | `8` |
| `options` | `{round, pad, sign, separator, type}` | `object` | `{round: false, pad: false}` |

#### Examples

No parameters:

```html
<div>{{ 3.14 | number }}</div>
<!-- 3.14 -->
```

Displays a maximum of 8 decimal places by default without rounding:

```html
<div>{{ 0.123456789 | number }}</div>
<!-- 0.12345678 -->
```

Limit decimal places:

```html
<div>{{ 3.1415926 | number(4) }}</div>
<!-- 3.1415 -->
```

Convert scientific notation:

```html
<div>{{ 5.2e-7 | number(8) }}</div>
<!-- 0.00000052 -->
```

Limit digits & zero-pad:

```html
<div>{{ 1 | number(2, {pad: true}) }}</div>
<!-- 1.00 -->
```

Limit digits & round:

```html
<div>{{ 3.1415 | number(3, {round: true}) }}</div>
<!-- 3.142 -->
```

Show thousands separator:

```html
<div>{{ 10000 | number(1, {separator: ','}) }}</div>
<!-- 10,000 -->
```

Show positive sign:

```html
<div>{{ 100.123456 | number(5, {round: true, sign: true}) }}</div>
<!-- +100.12346 -->
```

Limit digits, zero-pad & round:

```jsx
var arr = [1, 2.2, 3.33, 4.444, 5.5555];

<div v-for="num in arr">{{ num | number(3, {pad: true, round: true}) }}</div>

// 1.000
// 2.200
// 3.330
// 4.444
// 5.556
```

More than 8 decimal places requires passing the `digits` parameter:

```html
<div>{{ 3.14e-20 | number(21) }}</div>
<!-- 0.000000000000000000031 -->
```

Return a number type instead of string:

```js
import { number } from "easy-filter";

const res = number("123.456", 2, { round: true, type: "number" });

// res === 123.46
// true
```

## API Reference

### currency(input, symbol?, digits?, options?)

Formats a number as a currency string.

| Parameter | Type | Default | Description |
|:---------:|:----:|:-------:|:-----------:|
| `input` | `number \| string` | - | The number to format |
| `symbol` | `string` | `'$'` | Currency symbol |
| `digits` | `number` | `2` | Decimal places |
| `options.symbolOnLeft` | `boolean` | `true` | Symbol position |
| `options.separator` | `string` | `','`` | Thousands separator |
| `options.addSpace` | `boolean` | `false` | Add space between symbol and amount |
| `options.pad` | `boolean` | `true` | Zero-pad decimals |
| `options.round` | `boolean` | `false` | Round the value |

### date(input, formatMode?, option?)

Formats a timestamp or Date object.

| Parameter | Type | Default | Description |
|:---------:|:----:|:-------:|:-----------:|
| `input` | `number \| string \| Date` | - | Timestamp or Date |
| `formatMode` | `string` | `'yyyy/MM/dd HH:mm:ss EEE'` | Format pattern (`yyyy`, `MM`, `dd`, `HH`, `hh`, `mm`, `ss`, `EEE`, `EE`) |
| `option` | `'cn' \| 'en' \| DateOption` | `'en'` | Weekday locale |

### filter(input, matchOptions)

Selects a subset of items from an array or object.

| Parameter | Type | Description |
|:---------:|:----:|:-----------:|
| `input` | `array \| object` | The data to filter |
| `matchOptions` | `string \| RegExp \| Function \| {match, ignore}` | Match criteria |

### orderBy(input, expression, reverse?, comparator?)

Sorts an array by a property key or custom comparator.

| Parameter | Type | Default | Description |
|:---------:|:----:|:-------:|:-----------:|
| `input` | `any[]` | - | Array to sort |
| `expression` | `string \| Comparator` | - | Property key or sort function |
| `reverse` | `boolean` | - | Reverse sort order |
| `comparator` | `Comparator` | built-in | Custom comparison function |

### limitTo(input, limit?, options?)

Truncates a string, number, or array to a specified length.

| Parameter | Type | Default | Description |
|:---------:|:----:|:-------:|:-----------:|
| `input` | `string \| number \| any[]` | - | Data to limit |
| `limit` | `number` | `Infinity` | Max length |
| `options` | `LimitToOption` | `{startWithIndex: 0}` | Configuration |

### number(input, digits?, options?)

Formats a number as a string (or converts a string to a number).

| Parameter | Type | Default | Description |
|:---------:|:----:|:-------:|:-----------:|
| `input` | `number \| string` | - | Value to format |
| `digits` | `number` | `8` | Decimal places |
| `options.round` | `boolean` | `false` | Round the value |
| `options.pad` | `boolean` | `false` | Zero-pad decimals |
| `options.sign` | `boolean \| {zero}` | `false` | Show positive sign |
| `options.separator` | `string` | `''` | Thousands separator |
| `options.type` | `'string' \| 'number'` | `'string'` | Return type |

### uppercase(input, start?, end?)

Converts a string to uppercase, optionally within a range.

### lowercase(input, start?, end?)

Converts a string to lowercase, optionally within a range.

## License

[Anti-996 License](LICENSE)
