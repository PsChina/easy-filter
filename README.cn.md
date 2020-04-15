# easy-filter

[English](./README.md)

这是一个简单 vue 过滤器插件，灵感来自 angularjs 的内置过滤器。

这个包很小他只有 8 个函数。

[![LICENSE](https://img.shields.io/badge/license-Anti%20996-blue.svg)](https://github.com/996icu/996.ICU/blob/master/LICENSE)
[![996.icu](https://img.shields.io/badge/link-996.icu-red.svg)](https://996.icu)

## 新特性(v1.5.x)

支持 typescript 。

## 文档

要查看实际例子和文档，请访问 [easy-filter](https://pschina.github.io/easy-filter/index.html) 。

## 过滤器列表

- [currency](#currency)
- [date](#date)
- [filter](#filter)
- [limitTo](#limitto)
- [lowercase](#lowercase)
- [number](#number)
- [uppercase](#uppercase)
- [orderBy](#orderby)

## 用 npm 下载

```bash
# 安装插件
npm install easy-filter --save
```

## 在 Vue 项目中使用

引入插件

```js
import EasyFilter from "easy-filter";

import Vue from "vue";

Vue.use(EasyFilter);

// 或者按需引用
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

直接用 `<script>` 引入。

```html
<script src="./path/to/easy-filter.min.js"></script>
```

在组件中使用:

## lowercase

默认:

```html
<div>{{ 'Hello' | lowercase }}</div>
<!-- hello -->
```

指定范围:

```html
<div>{{ 'HELLO' | lowercase(3,4) }}</div>
<!-- HEllO -->
```

指定起始位置:

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

隐藏分隔符

```html
<div>{{ 1000 | currency('¥', 0, {separator: ''}) }}</div>
<!-- 1000 => ¥1000 -->
```

让符号在右边显示

```html
<div>{{ 1000 | currency('¥', 0, {symbolOnLeft: false}) }}</div>
<!-- 1000 => 1,000¥ -->
```

在符号和数字之间增加一个空格

```html
<div>{{ 10.012 | currency('BTC', 8, {addSpace: true}) }}</div>
<!-- 10.012 => BTC 10.01200000 -->
```

四舍五入

```html
<div>{{ 1000.999 | currency('¥', 2, {round: true}) }}</div>
<!-- 1000.999 => ¥1,001.00 -->
```

取消自动填充

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

多个属性同时使用

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

<!-- yyyy、MM、dd、HH、hh、mm、ss、EEE, 都可以单独使用，或者随意组合使用。 -->
```

配合 i18n

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
        // 如果你不想让某些属性参与过滤你可以这样做
        // const options = {
        //   match,
        //   ignore: ['id'], // 忽略 id
        // }
        // match = options

        // 在js中使用
        return this.$easyFilter.filter(input, match);
        // 使用其他过滤器
        // this.$easyFilter.lowercase('WORLD')
        // this.$easyFilter.currency(1000,'¥')
        // this.$easyFilter.date(1523169365575,'yy-MM-dd')
        // ...
      }
    },
    // 优化性能
    computed: {
      usefulData() {
        return this.$easyFilter.filter(this.personArray, new RegExp(this.match));
      }
    }
  };
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
      return this.$easyFilter.filter(input, matchFn);
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
      // 或者自定义排序函数 (数组 sort 回调)
      // orderBy(input, callBack = (v1,v2)=> v1.att > v2.att ? 1 : -1) {
      //   return this.$easyFilter.orderBy(input, callBack)
      // }
    }
  };
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

## limitTo

创建一个新数组或者字符串

包含指定长度的新数组或字符串。

这些元素取自源数组。

```js
export default {
  methods: {
    limitTo(input, limit, options) {
      return this.$easyFilter.limitTo(input, limit, options);
    }
  }
};
```

第一个参数“input”是要过滤的数据，可以是数组、数字或字符串。

第二个参数是想要限制的长度。

| 第二个参数 |   作用   | 参数类型 |         默认参数         |
|:----------:|:--------:|:--------:|:------------------------:|
|   limit    | 限制长度 |  number  | Number.POSITIVE_INFINITY |

第三个参数是配置项，可以通过它告诉过滤器如何过滤这些数据。

配置项的字段为:

|      属性      |               作用               |    参数类型     | 默认参数  |
|:--------------:|:--------------------------------:|:---------------:|:---------:|
| startWithIndex | 根据索引开始计算要限制的元素个数 |     number      |     0     |
|   startWith    | 根据元素开始计算要限制的元素个数 |   not number    | undefined |
|     ignore     |      计数时忽略被匹配的元素      | RegExp , object | undefined |
|      cut       |             是否截取             |     boolean     |   fasle   |

### 例

- 将字符串的长度限制为不超过 3

```html
<div>{{ 'hello' | limitTo(3) }}</div>
<!-- hel -->
```

- 以第二个字母开始，接下来的字符串的长度限制为不超过 3 个字符

```html
<div>{{ 'hello' | limitTo(3, {startWithIndex:1}) }}</div>
<!-- hell -->
```

- 如果您想剪掉前面的部分，可以这样裁剪。

```html
<div>{{ 'hello' | limitTo(3, {startWithIndex:1, cut: true}) }}</div>
<!-- ell -->
```

- 还可以根据元素指定起始位置

```html
<div>{{ 3.1415 | limitTo(2, {startWith:'.'}) }}</div>
<!-- 3.1 -->
```

- 如果不想让不相关的元素影响计数，可以忽略它。

```html
<div>{{ 3.1415 | limitTo(2, {startWith:'.', ignore: /\./}) }}</div>
<!-- 3.14 -->
```

- 显示 8 位数

```html
<div>{{ 123456789 | limitTo(8, {ignore: /\./}) }}</div>
<!-- 12345678 -->
```

```html
<div>{{ 3.141592653 | limitTo(8, {ignore: /\./}) }}</div>
<!-- 3.1415926 -->
```

- 对数组同样生效

```js
limitTo([1, 2, 3, 4, 5], 2);
// [1,2]
```

```js
limitTo([1, 2, 3, 4, 5], 2, { startWith: 3, cut: true });
// [3,4]
```

## number

将数字格式化为字符串。

当您传入一个整数时，默认值会有一位值为 0 的小数位，

当您输入一个小数，您会得到字符串类型的数字。

您也可以通过传递参数来改变小数位数。

并配置第三个参数以确定是否要四舍五入，以及是否需要自动填充零。

@参数 1 input

@参数 2 digits

@参数 3 options {round:false, pad:false}

### 例

无参

```html
<div>{{ 3.14 | number }}</div>
<!-- 3.14 -->
```

默认最多显示8位小数并且不会四舍五入
```html
<div>{{ 0.123456789 | number }}</div>
<!-- 0.12345678 -->
```

限制最多显示 4 位小数

```html
<div>{{ 3.1415926 | number(4) }}</div>
<!-- 3.1415 -->
```

转换科学计数

```html
<div>{{ 5.2e-7 | number(8) }}</div>
<!-- 0.00000052 -->
```

限制最多显示 2 位小数，不足自动填充零。

```html
<div>{{ 1 | number(2, {pad:true}) }}</div>
<!-- 1.00 -->
```

最多显示 3 位小数 & 四舍五入

```html
<div>{{ 3.1415 | number(3, {round: true}) }}</div>
<!-- 3.142 -->
```

显示分隔符

```html
<div>{{ 10000 | number(1, {separator: ','}) }}</div>
<!-- 10,000 -->
```

正数显示符号

```html
<div> { { 100.123456 | number(5, {round: true, sign: true}) } } </div>
<!-- +100.12346 -->
```

显示 3 位小数 & 自动填充零 & 四舍五入

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

超过默认 8 位的小数需要传入小数位数

```html
<div>{{ 3.14e-20 | number(21) }}</div>
<!-- 0.000000000000000000031 -->
```

## 许可证

[Anti-996 License](LICENSE)
