# easy-filter

[中文文档](README.cn.md)

The simple implementation of some angularjs built-in filters in vue.

This package is very small and it only contains eight functions.

[![LICENSE](https://img.shields.io/badge/license-Anti%20996-blue.svg)](https://github.com/996icu/996.ICU/blob/master/LICENSE)
[![996.icu](https://img.shields.io/badge/link-996.icu-red.svg)](https://996.icu)

## New Features (v1.5.x)

Support the typescript.

## Documentation

To check out live examples and docs, visit [easy-filter](https://pschina.github.io/easy-filter/index.html).

## Filter list

- [currency](#currency)
- [date](#date)
- [filter](#filter)
- [limitTo](#limitto)
- [lowercase](#lowercase)
- [number](#number)
- [uppercase](#uppercase)
- [orderBy](#orderby)

## Get start

```bash
# install plugin
npm install easy-filter --save
```


## Used

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

## Used in Vue

Import this plugin.

```js
import EasyFilter from "easy-filter";

import Vue from "vue";

Vue.use(EasyFilter);

// or use only what you need
import {
 number,
 orderBy,
 //...
} from "easy-filter";
Vue.filter('number', number);
Vue.filter('orderBy', orderBy);
const easyFilter = {
  number,
  orderBy,
};
Vue.prototype.$easyFilter = Vue.easyFilter = easyFilter;
```

Direct `<script>` Include.

```html
<script src="./path/to/easy-filter.min.js"></script>
```

Use it in a component:

## lowercase

Default:

```html
<div>{{ 'Hello' | lowercase }}</div>
<!-- hello -->
```

Specified range:

```html
<div>{{ 'HELLO' | lowercase(3,4) }}</div>
<!-- HEllO -->
```

Specify starting position:

```html
<div>{{ 'HELLO' | lowercase(3) }}</div>
<!-- HEllo -->
```

## uppercase

```html
<div>{{ 'Hello' | uppercase }}</div>
<!-- HELLO -->
```

## currency

```html
<div>{{ 1000 | currency }}</div>
<!-- 1000 => $1,000.00 -->
```

Use a different symbol:

```html
<div>{{ 1000 | currency('¥') }}</div>
<!-- 1000 => ¥1,000.00 -->
```

Use a different number decimal places:

```html
<div>{{ 1000 | currency('¥', 0) }}</div>
<!-- 1000 => ¥1,000 -->
```

Use a different separator:

```html
<div>{{ 1000 | currency('¥', 0, {separator: '.'}) }}</div>
<!-- 1000 => ¥1.000 -->
```

Hide separator

```html
<div>{{ 1000 | currency('¥', 0, {separator: ''}) }}</div>
<!-- 1000 => ¥1000 -->
```

Use symbol on right:

```html
<div>{{ 1000 | currency('¥', 0, {symbolOnLeft: false}) }}</div>
<!-- 1000 => 1,000¥ -->
```

Add space between amound and symbol:

```html
<div>{{ 10.012 | currency('BTC', 8, {addSpace: true}) }}</div>
<!-- 10.012 => BTC 10.01200000 -->
```

Open round

```html
<div>{{ 1000.999 | currency('¥', 2, {round: true}) }}</div>
<!-- 1000.999 => ¥1,001.00 -->
```

Close padding

```html
<div>{{ 1000.5 | currency('¥', 2) }}</div>
<!-- 1000.5 => ¥1,000.50 -->
```

```html
<div>{{ 1000.123 | currency('¥', 2, {pad: false}) }}</div>
<!-- 1000.123 => ¥1,000.12 -->
<div>{{ 1000.5 | currency('¥', 2, {pad: false}) }}</div>
<!-- 1000.5 => ¥1,000.5 -->
```

Use multiple options:

```html
<div>{{ 1000 | currency('¥', 0, {symbolOnLeft: false, addSpace: true}) }}</div>
<!-- 1000 => 1,000 ¥ -->
```

## date

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

<div>{{ 1523169365575 | date('EEE','en') }}</div>
<!-- Sunday -->

<div>{{ 1523169365575 | date('EE','en') }}</div>
<!-- Sun -->

<!-- yyyy、MM、dd、HH、hh、mm、ss、EEE, can be used alone or in combination. -->
```

Cooperate with i18n

```html
<div>{{ 1523169365575 | date('EEE', $t('localWeek')}</div>
```
zh.json

```json
{
  "localWeek":{
    "week": [
      "星期日",
      "星期一",
      "星期二",
      "星期三",
      "星期四",
      "星期五",
      "星期六",
    ],
    "shortWeek": [
      "周日",
      "周一",
      "周二",
      "周三",
      "周四",
      "周五",
      "周六",
    ]
  }
}
```

en.json

```json
{
  "localWeek":{
      "week": [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      "shortWeek": ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]
  }
}
```

ja.json

```json
{
  "localWeek":{
      "week": [
        "にちようび",
        "げつようび",
        "かようび",
        "すいようび",
        "もくようび",
        "きんようび",
        "どようび",
      ],
      "shortWeek": [
        "にちようび",
        "げつようび",
        "かようび",
        "すいようび",
        "もくようび",
        "きんようび",
        "どようび",
      ]
  }
}
```

## filter

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
        v-for="value in filter(personArray, new RegExp(match,'i') )"
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
        // You can do this if you don't want some property to participate in filtering
        // const options = {
        //   match,
        //   ignore: ['id'], // ignore property id
        // }
        // match = options

        // Used in js
        return this.$easyFilter.filter(input, match);
        // Use of other filters.
        // this.$easyFilter.lowercase('WORLD')
        // this.$easyFilter.currency(1000,'¥')
        // this.$easyFilter.date(1523169365575,'yy-MM-dd')
        // ...
      }
    },
    // How do you want to improve performance? You can do this.
    computed: {
      usefulData() {
        return this.$easyFilter.filter(this.personArray, new RegExp(this.match));
      }
    }
  };
</script>
<!-- 
When you enter 'an' in the input box will show:

name	age	sex
Angela	6	female
Tiantian	5	male
-->
```

The filter can also filter the range conditions.

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
    // Select children greater than or equal to 6 years old.
        return value.age >= 6;
    },
    filter (input, matchFn) {
      return this.$easyFilter.filter(input, matchFn);
  }
```

## orderBy

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
<script>s
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
      // or use custom sort functions
      // orderBy(input, callBack = (v1,v2)=> v1.att > v2.att ? 1 : -1) {
      //   return this.$easyFilter.orderBy(input, callBack)
      // }
    }
  };
</script>
<!-- 
When you click on the name.
name	age	sex
Angela	6	female
Cindy	4	female
Kimi	8	male
Shitou	7	male
Tiantian	5	male

When you click age.
name	age	sex
Cindy	4	female
Tiantian	5	male
Angela	6	female
Shitou	7	male
Kimi	8	male

When you click sex.
Cindy	4	female
Angela	6	female
Kimi	8	male
Shitou	7	male
Tiantian	5	male

The above result reverse is undefined.
If reverse is true then the result will be reversed.
You can also add '-' to reverse the results in front of the click parameter.
For example,  <th @click="click('-name')">name</th>.
 -->
```

## limitTo

Creates a new array or string containing only a specified number of elements.
The elements are taken from either the beginning of the source array,
string or number.

```js
export default {
  methods: {
    limitTo(input, limit, options) {
      return this.$easyFilter.limitTo(input, limit, options);
    }
  }
};
```

The first parameter `input` is the data to be filtered, which can be an array, a number, or a string.

The second parameter is the length you want to limit.

| Second Parameter | Description  |  Type  |         Default          |
|:----------------:|:------------:|:------:|:------------------------:|
|      Limit       | limit length | number | Number.POSITIVE_INFINITY |

The third parameter is the configuration item, which tells the filter how to filter the data.

The fields of the configuration item are:

|   Attribute    |                          Description                           |      Type       |  Default  |
|:--------------:|:--------------------------------------------------------------:|:---------------:|:---------:|
| startWithIndex | Calculates the number of elements to limit based on the index  |     number      |     0     |
|   startWith    | Calculate the number of elements to limit based on the element |   not number    | undefined |
|     ignore     |             Ignore matched elements when counting              | RegExp , object | undefined |
|      cut       |                      Whether to intercept                      |     boolean     |   false   |

### Example

- Limit the length of a string to no more than 3

```html
<div>{{ 'hello' | limitTo(3) }}</div>
<!-- hel -->
```

- Limit the length of a string to no more than 3 characters starting with the second letter

```html
<div>{{ 'hello' | limitTo(3, {startWithIndex:1}) }}</div>
<!-- hell -->
```

- If you want to cut the front part you can add cut

```html
<div>{{ 'hello' | limitTo(3, {startWithIndex:1, cut: true}) }}</div>
<!-- ell -->
```

- You can also specify the starting position based on the element

```html
<div>{{ 3.1415 | limitTo(2, {startWith:'.'}) }}</div>
<!-- 3.1 -->
```

- You can ignore it if you don't want irrelevant elements to affect the count

```html
<div>{{ 3.1415 | limitTo(2, {startWith:'.', ignore: /\./}) }}</div>
<!-- 3.14 -->
```

- Displays a number of eight bits of data

```html
<div>{{ 123456789 | limitTo(8, {ignore: /\./}) }}</div>
<!-- 12345678 -->
```

```html
<div>{{ 3.141592653 | limitTo(8, {ignore: /\./}) }}</div>
<!-- 3.1415926 -->
```

- Limit Array

```js
limitTo([1, 2, 3, 4, 5], 2);
// [1,2]
```

```js
limitTo([1, 2, 3, 4, 5], 2, { startWith: 3, cut: true });
// [3,4]
```

## number

Formats a number as a string or a string as a number.
When you pass in an integer, you will default to one decimal places,
and when you enter a decimal, you will get its string.
You can also change the exact number of digits by passing in parameters,
and set options parameters to determine whether you want to round, and fill in zeros.

@param1 input

@param2 digits

@param3 options {round:false, pad:false}

### Example

No parameter

```html
<div>{{ 3.14 | number }}</div>
<!-- 3.14 -->
```

Displays a maximum of 8 decimal places by default and does not round
```html
<div>{{ 0.123456789 | number }}</div>
<!-- 0.12345678 -->
```

Limit digits

```html
<div>{{ 3.1415926 | number(4) }}</div>
<!-- 3.1415 -->
```

Conversion scientific counting

```html
<div>{{ 5.2e-7 | number(8) }}</div>
<!-- 0.00000052 -->
```

Limit digits & Fill zero

```html
<div>{{ 1 | number(2, {pad:true}) }}</div>
<!-- 1.00 -->
```

Limit digits & Rounding

```html
<div>{{ 3.1415 | number(3, {round: true}) }}</div>
<!-- 3.142 -->
```

Display separator

```html
<div>{{ 10000 | number(1, {separator:','}) }}</div>
<!-- 10,000 -->
```

Display positive sign

```html
<div>{ { 100.123456 | number(5, {round: true, sign: true}) } }</div>
<!-- +100.12346 -->
```

Limit digits & Fill zero & Rounding

```jsx
var arr = [
  1,
  2.2,
  3.33,
  4.444,
  5.5555
  ]

<div v-for="num in arr">{{ num | number(3, {pad: true, round: true} )}}</div>

// 1.000
// 2.200
// 3.330
// 4.444
// 5.556
```

More than 8 decimal places need to pass in the number of parameters

```html
<div>{{ 3.14e-20 | number(21) }}</div>
<!-- 0.000000000000000000031 -->
```

Change return type 

```js
import { number } from 'easy-filter';

const res = number('123.456',2,{round:true,type:'number'});

// The result is equal to the 123.46

res === 123.46 

// true
```

## License

[Anti-996 License](LICENSE)
