# easy-filter

[English](./README.md)

这是一个简单 vue 过滤器插件灵感来自 angularjs 的内置过滤器

这个包很小他只有9个函数。

[![LICENSE](https://img.shields.io/badge/license-Anti%20996-blue.svg)](https://github.com/996icu/996.ICU/blob/master/LICENSE)
[![996.icu](https://img.shields.io/badge/link-996.icu-red.svg)](https://996.icu)

## 过滤器列表

* [currency](#currency)
* [date](#date)
* [filter](#filter)
* [json](#json)
* [limitTo](#limitto)
* [lowerCase](#lowercase)
* [number](#number)
* [upperCase](#uppercase)
* [orderBy](#orderby)

## 用 npm 下载

```bash
# install plugin
npm install easy-filter --save
```

## 在Vue项目中使用

Import this plugin.

```js
import easyFilter from 'easy-filter';

import Vue from 'vue';

Vue.use(easyFilter);
```

Use it in a component

## lowerCase

```html
<div>{{ 'Hello' | lowerCase }}</div>
<!-- hello -->
```

## upperCase

```html
<div>{{ 'Hello' | upperCase }}</div>
<!-- HELLO -->
```

## currency

```html
<div>{{ 1000 | currency }}</div>
<!-- 1000 => $1,000.00 -->
```

使用不同的货币符号

```html
<div>{{ 1000 | currency('¥') }}</div>
<!-- 1000 => ¥1,000.00 -->
```

使用限制小数位数的参数

```html
<div>{{ 1000 | currency('¥', 0) }}</div>
<!-- 1000 => ¥1,000 -->
```

使用不同的分隔符

```html
<div>{{ 1000 | currency('¥', 0, {separator: '.'}) }}</div>
<!-- 1000 => ¥1.000 -->
```

让符号再右边显示

```html
<div>{{ 1000 | currency('¥', 0, {symbolOnLeft: false}) }}</div>
<!-- 1000 => 1,000¥ -->
```

在符号和数字之间增加一个空格

```html
<div>{{ 1000 | currency('¥', 0, {addSpace: true}) }}</div>
<!-- 1000 => ¥ 1,000 -->
```

多个属性同时使用

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
        <tr v-for="value in filter(personArray, new RegExp(match,'i') )" :key="value.id">
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
        {name: 'Kimi', sex: 'male', age: 8, id: 1},
        {name: 'Cindy', sex: 'female', age: 4, id: 2},
        {name: 'Angela', sex: 'female', age: 6, id: 3},
        {name: 'Shitou', sex: 'male', age: 7, id: 4},
        {name: 'Tiantian', sex: 'male', age: 5, id: 5}
      ]
    }
  },
  methods: {
    filter (input, match) {
      // 在js中使用
      return this.easyFilter.filter(input, match);
      // 使用其他过滤器
      // this.easyFilter.lowerCase('WORLD')
      // this.easyFilter.currency(1000,'¥')
      // this.easyFilter.date(1523169365575,'yy-MM-dd')
      // ...
    }
  },
  // 优化性能
  computed: {
      usefulData () {
          return this.easyFilter.filter(this.personArray, new RegExp(this.match));
      }
  }
}
</script>
<!-- 
当在输入框输入 an 会展示：

name	age	sex
Angela	6	female
Tiantian	5	male
-->
```

filter 过滤器还支持范围过滤。

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
    // 选择age大于或等于6的元素
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
  name: 'easyFilter.orderBy',
  data () {
    return {
      personArray: [
        {name: 'Kimi', sex: 'male', age: 8, id: 1},
        {name: 'Cindy', sex: 'female', age: 4, id: 2},
        {name: 'Angela', sex: 'female', age: 6, id: 3},
        {name: 'Shitou', sex: 'male', age: 7, id: 4},
        {name: 'Tiantian', sex: 'male', age: 5, id: 5}
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
当点击 name 的时候。
name	age	sex
Angela	6	female
Cindy	4	female
Kimi	8	male
Shitou	7	male
Tiantian	5	male

当点击 age 的时候。
name	age	sex
Cindy	4	female
Tiantian	5	male
Angela	6	female
Shitou	7	male
Kimi	8	male

当点击 sex 的时候。
Cindy	4	female
Angela	6	female
Kimi	8	male
Shitou	7	male
Tiantian	5	male

上面的结果是顺序展示；
如果想倒序可以把 reverse 参数设置为 true；
或者在排序条件上添加 '-' 号，
比如: <th @click="click('-name')">name</th>.
 -->
```

## json

Json 将会把一个js对象转换为一个 JSON 格式的字符串对象，它使用了 JSON.stringify。

## limitTo

创建一个新数组或者字符串

包含指定长度的新数组或字符串。

这些元素取自源数组。

```js
export default{
  methods: {
    limitTo (input, limit, options) {
      return this.easyFilter.limitTo(input, limit, options);
    }
  }
}
```

第一个参数“input”是要过滤的数据，可以是数组、数字或字符串。

第二个参数是想要限制的长度。

| 第二个参数 | 作用 | 参数类型 | 默认参数 |
| :--:| :--:| :--: | :--: |
| limit | 限制长度 | number | Number.POSITIVE_INFINITY |

第三个参数是配置项，可以通过它告诉过滤器如何过滤这些数据。

配置项的字段为:

| 属性 | 作用 | 参数类型 | 默认参数 |
| :--:| :--:| :--: | :--: |
| startWithIndex | 根据索引开始计算要限制的元素个数 | number | 0 |
| startWith | 根据元素开始计算要限制的元素个数 | not number | undefined |
| ignore | 计数时忽略被匹配的元素 | RegExp , object | undefined |
| cutOut | 是否截取 | boolean | fasle |

### 例

* 将字符串的长度限制为不超过3

```html
<div>{{hello | limitTo(3)}}</div>
<!-- hel -->
```

* 以第二个字母开始，接下来的字符串的长度限制为不超过3个字符

```html
<div>{{hello | limitTo(3, {startWithIndex:1})}}</div>
<!-- hell -->
```

* 如果你想剪掉前面的部分，你这样裁剪。

```html
<div>{{hello | limitTo(3, {startWithIndex:1, cutOut: true})}}</div>
<!-- ell -->
```

* 还可以根据元素指定起始位置

```html
<div>{{3.1415 | limitTo(2, {startWith:'.'})}}</div>
<!-- 3.1 -->
```

* 如果不想让不相关的元素影响计数，可以忽略它。

```html
<div>{{3.1415 | limitTo(2, {startWith:'.', ignore: /\./})}}</div>
<!-- 3.14 -->
```

* 示8位数据

```html
<div>{{123456789 | limitTo(8, {ignore: /\./})}}</div>
<!-- 12345678 -->
```

```html
<div>{{3.141592653 | limitTo(8, {ignore: /\./})}}</div>
<!-- 3.1415926 -->
```

* 对数组同样生效

```js
limitTo([1,2,3,4,5], 2)
// [1,2]
```

```js
limitTo([1,2,3,4,5], 2, {startWith: 3,cutOut: true})
// [3,4]
```

## number

将数字格式化为字符串。

当您传入一个整数时，默认值会有一位值为0的小数位，

当您输入一个小数，您会得到字符串类型的数字。

您也可以通过传递参数来改变小数位数。

并配置第三个参数以确定是否要四舍五入，以及是否需要自动填充零。

@参数1 input

@参数2 digits

@参数3 options {round:false, pad:false}

### 例

无参

```html
<div>{{3 | number}}</div>
<!-- 3.0 -->
```

```html
<div>{{3.14 | number}}</div>
<!-- 3.14 -->
```

限制最多显示4位小数
```html
<div>{{3.1415926 | number(4)}}</div>
<!-- 3.1415 -->
```

限制最多显示2位小数，不足自动填充零。
```html
<div>{{1 | number(2, {pad:true})}}</div>
<!-- 1.00 -->
```

最多显示3位小数 & 四舍五入

```html
<div>{{3.1415 | number(3, {round: true})}}</div>
<!-- 3.142 -->
```

最显示3位小数 & 自动填充零 & 四舍五入

```jsx
var arr = [
  1,
  2.2,
  3.333,
  4.4444,
  5.55555
  ]

<div v-for="num in arr">{{num | number(3, {pad: true, round: true})}}</div>

// 1.000
// 2.200
// 3.333
// 4.444
// 5.556
```

许可证
---

[Anti-996 License](LICENSE)