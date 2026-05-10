# easy-filter

[English](./README.md)

[![npm version](https://img.shields.io/npm/v/easy-filter.svg)](https://www.npmjs.com/package/easy-filter)
[![npm downloads](https://img.shields.io/npm/dm/easy-filter.svg)](https://www.npmjs.com/package/easy-filter)
[![license](https://img.shields.io/badge/license-Anti%20996-blue.svg)](https://github.com/996icu/996.ICU/blob/master/LICENSE)
[![996.icu](https://img.shields.io/badge/link-996.icu-red.svg)](https://996.icu)

一个轻量级的 Vue 过滤器插件，灵感来自 AngularJS 的内置过滤器。

这个包非常小，只有 8 个函数。

## 新特性 (v1.7.x)

- 完整支持 TypeScript，附带类型声明。
- 增强 `limitTo` 过滤器，新增更多配置项。
- `number` 过滤器支持字符串转数字。
- `date` 过滤器支持 `YYYY` 模式匹配年份。

## 文档

查看实际示例和文档请访问 [easy-filter](https://pschina.github.io/easy-filter/index.html)。

## 过滤器列表

- [currency](#currency)
- [date](#date)
- [filter](#filter)
- [limitTo](#limitto)
- [lowercase](#lowercase)
- [number](#number)
- [uppercase](#uppercase)
- [orderBy](#orderby)

## 安装

```bash
npm install easy-filter --save
```

## 基本使用

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

内置类型声明，开箱即用：

```ts
import { currency, date, number, orderBy } from "easy-filter";

const result: string = currency(1000, "¥", 0);
const formatted: string = date(Date.now(), "yyyy-MM-dd");
```

## 在 Vue 中使用

全局注册所有过滤器：

```js
import EasyFilter from "easy-filter";
import Vue from "vue";

Vue.use(EasyFilter);
```

或者按需引用：

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

直接用 `<script>` 引入：

```html
<script src="./path/to/easy-filter.min.js"></script>
```

## 过滤器详解

### lowercase

默认：

```html
<div>{{ 'Hello' | lowercase }}</div>
<!-- hello -->
```

指定范围：

```html
<div>{{ 'HELLO' | lowercase(3, 4) }}</div>
<!-- HEllO -->
```

指定起始位置：

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

使用不同的货币符号：

```html
<div>{{ 1000 | currency('¥') }}</div>
<!-- 1000 => ¥1,000.00 -->
```

限制小数位数：

```html
<div>{{ 1000 | currency('¥', 0) }}</div>
<!-- 1000 => ¥1,000 -->
```

使用不同的分隔符：

```html
<div>{{ 1000 | currency('¥', 0, {separator: '.'}) }}</div>
<!-- 1000 => ¥1.000 -->
```

隐藏分隔符：

```html
<div>{{ 1000 | currency('¥', 0, {separator: ''}) }}</div>
<!-- 1000 => ¥1000 -->
```

让符号在右边显示：

```html
<div>{{ 1000 | currency('¥', 0, {symbolOnLeft: false}) }}</div>
<!-- 1000 => 1,000¥ -->
```

在符号和数字之间增加空格：

```html
<div>{{ 10.012 | currency('BTC', 8, {addSpace: true}) }}</div>
<!-- 10.012 => BTC 10.01200000 -->
```

四舍五入：

```html
<div>{{ 1000.999 | currency('¥', 2, {round: true}) }}</div>
<!-- 1000.999 => ¥1,001.00 -->
```

取消自动补零：

```html
<div>{{ 1000.5 | currency('¥', 2) }}</div>
<!-- 1000.5 => ¥1,000.50 -->

<div>{{ 1000.123 | currency('¥', 2, {pad: false}) }}</div>
<!-- 1000.123 => ¥1,000.12 -->

<div>{{ 1000.5 | currency('¥', 2, {pad: false}) }}</div>
<!-- 1000.5 => ¥1,000.5 -->
```

多个选项组合使用：

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

<!-- yyyy、MM、dd、HH、hh、mm、ss、EEE 都可以单独使用，也可以任意组合。 -->
```

配合 i18n 使用：

```html
<div>{{ 1523169365575 | date('EEE', $t('localWeek')) }}</div>
```

`zh.json`：

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

`en.json`：

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

`ja.json`：

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
      // 如果你不想让某些属性参与过滤，可以这样做：
      // const options = {
      //   match,
      //   ignore: ['id'], // 忽略 id 字段
      // }
      // match = options

      // 在 JS 中使用
      return this.$easyFilter.filter(input, match);
      // 使用其他过滤器：
      // this.$easyFilter.lowercase('WORLD')
      // this.$easyFilter.currency(1000, '¥')
      // this.$easyFilter.date(1523169365575, 'yy-MM-dd')
      // ...
    }
  },
  // 使用 computed 优化性能
  computed: {
    usefulData() {
      return this.$easyFilter.filter(this.personArray, new RegExp(this.match));
    }
  }
};
</script>
<!--
在输入框中输入 'an' 会显示：

name       age    sex
Angela     6      female
Tiantian   5      male
-->
```

filter 还支持范围过滤：

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
    // 选择 age 大于或等于 6 的元素
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
    // 或者使用自定义排序函数（数组 sort 回调）：
    // orderBy(input, callback = (v1, v2) => v1.att > v2.att ? 1 : -1) {
    //   return this.$easyFilter.orderBy(input, callback)
    // }
  }
};
</script>
<!--
点击 name 排序结果：
name       age    sex
Angela     6      female
Cindy      4      female
Kimi       8      male
Shitou     7      male
Tiantian   5      male

点击 age 排序结果：
name       age    sex
Cindy      4      female
Tiantian   5      male
Angela     6      female
Shitou     7      male
Kimi       8      male

点击 sex 排序结果：
Cindy      4      female
Angela     6      female
Kimi       8      male
Shitou     7      male
Tiantian   5      male

以上为升序排列（reverse 为 undefined）。
设置 reverse 为 true 可以倒序排列。
也可以在排序键前加 '-' 号来反转结果，
如：<th @click="click('-name')">name</th>。
-->
```

### limitTo

创建一个新数组或字符串，只包含指定数量的元素。
元素取自源数据的开头部分。

```js
export default {
  methods: {
    limitTo(input, limit, options) {
      return this.$easyFilter.limitTo(input, limit, options);
    }
  }
};
```

**参数说明：**

|  参数   |     作用     |  类型  |         默认值          |
|:-------:|:------------:|:------:|:-----------------------:|
| `input` | 要过滤的数据 |  any   |            -             |
| `limit` |   限制长度   | number | Number.POSITIVE_INFINITY |
| `options` | 配置项（见下表） | object |  `{startWithIndex: 0}`  |

**配置项：**

|      属性       |                作用                |    类型      |  默认值   |
|:---------------:|:----------------------------------:|:-----------:|:---------:|
| `startWithIndex` | 根据索引开始计算要限制的元素个数   |   number    |     0     |
|   `startWith`   | 根据元素开始计算要限制的元素个数   | not number  | undefined |
|    `ignore`     | 计数时忽略被匹配的元素             | RegExp, object | undefined |
|      `cut`      | 是否截去前面部分                   |   boolean   |   false   |

#### 示例

将字符串长度限制为不超过 3 个字符：

```html
<div>{{ 'hello' | limitTo(3) }}</div>
<!-- hel -->
```

从第 2 个字符开始，后续字符串限制为不超过 3 个字符：

```html
<div>{{ 'hello' | limitTo(3, {startWithIndex: 1}) }}</div>
<!-- hell -->
```

如果想去掉前面的部分，可以设置 `cut`：

```html
<div>{{ 'hello' | limitTo(3, {startWithIndex: 1, cut: true}) }}</div>
<!-- ell -->
```

根据元素指定起始位置：

```html
<div>{{ 3.1415 | limitTo(2, {startWith: '.'}) }}</div>
<!-- 3.1 -->
```

忽略不相关的元素：

```html
<div>{{ 3.1415 | limitTo(2, {startWith: '.', ignore: /\./}) }}</div>
<!-- 3.14 -->
```

显示 8 位数字：

```html
<div>{{ 123456789 | limitTo(8) }}</div>
<!-- 12345678 -->

<div>{{ 3.141592653 | limitTo(8, {ignore: /\./}) }}</div>
<!-- 3.1415926 -->
```

对数组同样生效：

```js
limitTo([1, 2, 3, 4, 5], 2);
// [1, 2]

limitTo([1, 2, 3, 4, 5], 2, { startWith: 3, cut: true });
// [3, 4]
```

### number

将数字格式化为字符串，或将字符串格式化为数字。

传入整数时默认显示小数位；传入小数时得到字符串形式的数字。
可通过参数控制小数位数、四舍五入和是否补零。

|  参数   |     作用     |  类型  |         默认值          |
|:-------:|:------------:|:------:|:-----------------------:|
| `input` | 要格式化的值 | `number \| string` | - |
| `digits` | 小数位数 | `number` | `8` |
| `options` | `{round, pad, sign, separator, type}` | `object` | `{round: false, pad: false}` |

#### 示例

无参数：

```html
<div>{{ 3.14 | number }}</div>
<!-- 3.14 -->
```

默认最多显示 8 位小数，不四舍五入：

```html
<div>{{ 0.123456789 | number }}</div>
<!-- 0.12345678 -->
```

限制最多显示 4 位小数：

```html
<div>{{ 3.1415926 | number(4) }}</div>
<!-- 3.1415 -->
```

转换科学计数法：

```html
<div>{{ 5.2e-7 | number(8) }}</div>
<!-- 0.00000052 -->
```

限制 2 位小数并自动补零：

```html
<div>{{ 1 | number(2, {pad: true}) }}</div>
<!-- 1.00 -->
```

限制 3 位小数并四舍五入：

```html
<div>{{ 3.1415 | number(3, {round: true}) }}</div>
<!-- 3.142 -->
```

显示千位分隔符：

```html
<div>{{ 10000 | number(1, {separator: ','}) }}</div>
<!-- 10,000 -->
```

正数显示正号：

```html
<div>{{ 100.123456 | number(5, {round: true, sign: true}) }}</div>
<!-- +100.12346 -->
```

限制小数位 + 补零 + 四舍五入：

```jsx
var arr = [1, 2.2, 3.33, 4.444, 5.5555];

<div v-for="num in arr">{{ num | number(3, {pad: true, round: true}) }}</div>

// 1.000
// 2.200
// 3.330
// 4.444
// 5.556
```

超过 8 位小数需要传入 `digits` 参数：

```html
<div>{{ 3.14e-20 | number(21) }}</div>
<!-- 0.000000000000000000031 -->
```

返回 number 类型：

```js
import { number } from "easy-filter";

const res = number("123.456", 2, { round: true, type: "number" });

// res === 123.46
// true
```

## API 参考

### currency(input, symbol?, digits?, options?)

将数字格式化为货币字符串。

| 参数 | 类型 | 默认值 | 说明 |
|:----:|:----:|:------:|:----:|
| `input` | `number \| string` | - | 要格式化的数字 |
| `symbol` | `string` | `'$'` | 货币符号 |
| `digits` | `number` | `2` | 小数位数 |
| `options.symbolOnLeft` | `boolean` | `true` | 符号位置（左侧/右侧） |
| `options.separator` | `string` | `','` | 千位分隔符 |
| `options.addSpace` | `boolean` | `false` | 符号与金额之间加空格 |
| `options.pad` | `boolean` | `true` | 小数位自动补零 |
| `options.round` | `boolean` | `false` | 四舍五入 |

### date(input, formatMode?, option?)

格式化时间戳或 Date 对象。

| 参数 | 类型 | 默认值 | 说明 |
|:----:|:----:|:------:|:----:|
| `input` | `number \| string \| Date` | - | 时间戳或 Date |
| `formatMode` | `string` | `'yyyy/MM/dd HH:mm:ss EEE'` | 格式模式（`yyyy`, `MM`, `dd`, `HH`, `hh`, `mm`, `ss`, `EEE`, `EE`） |
| `option` | `'cn' \| 'en' \| DateOption` | `'en'` | 星期显示的语言 |

### filter(input, matchOptions)

从数组或对象中筛选符合条件的子集。

| 参数 | 类型 | 说明 |
|:----:|:----:|:----:|
| `input` | `array \| object` | 要过滤的数据 |
| `matchOptions` | `string \| RegExp \| Function \| {match, ignore}` | 匹配条件 |

### orderBy(input, expression, reverse?, comparator?)

按属性键或自定义比较函数对数组排序。

| 参数 | 类型 | 默认值 | 说明 |
|:----:|:----:|:------:|:----:|
| `input` | `any[]` | - | 要排序的数组 |
| `expression` | `string \| Comparator` | - | 排序属性键或比较函数 |
| `reverse` | `boolean` | - | 是否倒序 |
| `comparator` | `Comparator` | 内置比较器 | 自定义比较函数 |

### limitTo(input, limit?, options?)

将字符串、数字或数组截断到指定长度。

| 参数 | 类型 | 默认值 | 说明 |
|:----:|:----:|:------:|:----:|
| `input` | `string \| number \| any[]` | - | 要限制的数据 |
| `limit` | `number` | `Infinity` | 最大长度 |
| `options` | `LimitToOption` | `{startWithIndex: 0}` | 配置项 |

### number(input, digits?, options?)

将数字格式化为字符串（或转换字符串为数字）。

| 参数 | 类型 | 默认值 | 说明 |
|:----:|:----:|:------:|:----:|
| `input` | `number \| string` | - | 要格式化的值 |
| `digits` | `number` | `8` | 小数位数 |
| `options.round` | `boolean` | `false` | 四舍五入 |
| `options.pad` | `boolean` | `false` | 不足补零 |
| `options.sign` | `boolean \| {zero}` | `false` | 显示正号 |
| `options.separator` | `string` | `''` | 千位分隔符 |
| `options.type` | `'string' \| 'number'` | `'string'` | 返回类型 |

### uppercase(input, start?, end?)

将字符串转为大写，可选指定范围。

### lowercase(input, start?, end?)

将字符串转为小写，可选指定范围。

## 许可证

[Anti-996 License](LICENSE)
