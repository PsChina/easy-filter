# easy-filter

The simple implementation of some angularjs built-in filters in vue.

This package is very small and it only contains nine functions.

## filter list

* currency
* date
* filter
* json
* limitTo
* lowerCase
* number
* upperCase
* orderBy

## get start

```bash
# install plugin
npm install easy-filter --save
```

## usage

Import this plugin.

```js
import easyFilter from 'easy-filter';

import Vue from 'vue';

Vue.use(easyFilter);
```

Use it like use angularjs filters.

in some component

## lowerCase

```html
<div>{{ 'Hello' | lowerCase }}</div>
<!-- hello -->
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

Use symbol on right:

```html
<div>{{ 1000 | currency('¥', 0, {symbolOnLeft: false}) }}</div>
<!-- 1000 => 1,000¥ -->
```

Add space between amound and symbol:

```html
<div>{{ 1000 | currency('¥', 0, {addSpace: true}) }}</div>
<!-- 1000 => ¥ 1,000 -->
```

Use multiple options:

```html
<div>{{ 1000 | currency('¥', 0, {symbolOnLeft: false, addSpace: true}) }}</div>
<!-- 1000 => 1,000 ¥ -->
```

## date

```html
<div>{{ 1523169365575 | date('yyyy-MM-dd HH:mm:ss EEE', 'cn') }}</div>
<!-- 2018-4-8 14:36:5 星期日 -->
```

## filter

```html
<template>
<div>
    <input type="text" v-model="match">
    <table>
        <tr>
            <th>name</th>
            <th>age</th>
            <th>sex</th>
        </tr>
        <tr v-for="(value,index) in filter(personArray, new RegExp(match,'i') )" :key="index">
            <td v-text="value.name"></td>
            <td v-text="value.age"></td>
            <td v-text="value.sex"></td>
        </tr>
    </table>
</div>
</template>

<script>
export default {
  name: 'easyFilter.filter',
  data () {
    return {
      match: null,
      personArray: [
        {name: 'Kimi', sex: 'male', age: 8},
        {name: 'Cindy', sex: 'female', age: 4},
        {name: 'Angela', sex: 'female', age: 6},
        {name: 'Shitou', sex: 'male', age: 7},
        {name: 'Tiantian', sex: 'male', age: 5}
      ]
    }
  },
  methods: {
    filter (input, match) {
      // Used in js
      return this.easyFilter.filter(input, match);
      // Use of other filters.
      // this.easyFilter.lowerCase('WORLD')
      // this.easyFilter.currency(1000,'¥')
      // this.easyFilter.date(1523169365575,'yy-MM-dd')
      // ...
    }
  },
  // How do you want to improve performance? You can do this.
  computed: {
      usefulData () {
          return this.easyFilter.filter(this.personArray, new RegExp(this.match));
      }
  }
}
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
  // <div v-for="(item, index) in filter(personArray, matchFn)" :key="index">{{item}}</div>
  data () {
      return {
        personArray: [
            {name: 'Kimi', sex: 'male', age: 8},
            {name: 'Cindy', sex: 'female', age: 4},
            {name: 'Angela', sex: 'female', age: 6},
            {name: 'Shitou', sex: 'male', age: 7},
            {name: 'Tiantian', sex: 'male', age: 5}
        ]
      }
  },
  methods: {
    matchFn (value) {
    // Select children greater than or equal to 6 years old.
        return value.age >= 6;
    },
    filter (input, matchFn) {
      return this.easyFilter.filter(input, matchFn);
  }
```

## orderBy

```html
<template>
<div>
    <table>
        <tr>
            <th @click="click('name')">name</th>
            <th @click="click('age')">age</th>
            <th @click="click('sex')">sex</th>
        </tr>
        <tr v-for="(value,index) in orderBy(personArray, rule)" :key="index">
            <td v-text="value.name"></td>
            <td v-text="value.age"></td>
            <td v-text="value.sex"></td>
        </tr>
    </table>
</div>
</template>
<script>
export default {
  name: 'easyFilter.orderBy',
  data () {
    return {
      personArray: [
        {name: 'Kimi', sex: 'male', age: 8},
        {name: 'Cindy', sex: 'female', age: 4},
        {name: 'Angela', sex: 'female', age: 6},
        {name: 'Shitou', sex: 'male', age: 7},
        {name: 'Tiantian', sex: 'male', age: 5}
      ],
      rule: null
    }
  },
  methods: {
    click (rule) {
      this.rule = rule;
    },
    orderBy (input, rule, reverse) {
      return this.easyFilter.orderBy(input, rule, reverse);
    }
  }
}
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

## json

Json will convert an object into a string using JSON.stringify.

## limitTo

Creates a new array or string containing only a specified number of elements.
The elements are taken from either the beginning of the source array,
string or number.

```js
export default{
  methods: {
    limitTo (input, limit, options) {
      return this.easyFilter.limitTo(input, limit, options);
    }
  }
}
```

The first parameter `input` is the data to be filtered, which can be an array, a number, or a string.

The second parameter is the limit count to limit `input`'s length.

| second parameter | instructions | type | default value |
| :--:| :--:| :--: | :--: |
| limit | Limit the length | number | Number.POSITIVE_INFINITY |

The third parameter is the configuration item which says how do I filter this data.

The fields for the configuration item are:

| attr | instructions | type | default value |
| :--:| :--:| :--: | :--: |
| startWithIndex | Start counting by index | number | 0 |
| startWith | Start counting by element | not number | undefined |
| ignore | Elements that are not counted | RegExp , object | undefined |
| cutOut | Whether to cut | boolean | fasle |

example

1. Limit the length of a string to no more than 3

```html
<div>{{hello | limitTo(3)}}</div>
<!-- hel -->
```

1. Limit the length of a string to no more than 3 characters starting with the second letter

```html
<div>{{hello | limitTo(3, {startWithIndex:1})}}</div>
<!-- hell -->
```

1. If you want to cutout the front part you can add cutout

```html
<div>{{hello | limitTo(3, {startWithIndex:1, cutOut: true})}}</div>
<!-- ell -->
```

1. You can also specify the starting position based on the element

```html
<div>{{3.1415 | limitTo(2, {startWith:'.'})}}</div>
<!-- 3.1 -->
```

1. You can ignore it if you don't want irrelevant elements to affect the count

```html
<div>{{3.1415 | limitTo(2, {startWith:'.', ignore: /\./'})}}</div>
<!-- 3.14 -->
```

1. Displays a number of eight bits of data

```html
<div>{{123456789 | limitTo(8, {ignore: /\./'})}}</div>
<!-- 12345678 -->
```

```html
<div>{{3.141592653 | limitTo(8, {ignore: /\./'})}}</div>
<!-- 3.1415926 -->
```

## number

When you pass in an integer, you will default to two decimal places,
and when you enter a decimal, you will round it to the nearest thousandth.
You can also change the exact number of digits by passing in parameters.
