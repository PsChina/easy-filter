<template>
  <div id="limitTo">
    <div
      v-for="item in testCases"
      :class="item.className"
      :key="item.className"
    >
      {{ item.data | limitTo(...item.params) }}
    </div>
  </div>
</template>

<script lang="ts">
import { Mixins, Component } from "vue-property-decorator";
import TestBase from "../mixin/base-test";
@Component
export default class LimitToTest extends Mixins(TestBase) {
  public readonly functionName: string = "limitTo";
  public readonly testCases: Array<CheckItem> = [
    {
      className: "default",
      data: 1000,
      params: [],
      description: `默认 {{ 1000 | limitTo }} 应该等于 1000`,
      result: "1000",
    },
    {
      className: "limit-width-num",
      data: "hello",
      params: [3],
      description: `限制长度为 3 {{ 'hello' | limitTo(3) }} 应该等于 hel`,
      result: "hel",
    },
    {
      className: "start-width-index",
      data: "hello",
      params: [3, { startWithIndex: 1 }],
      description: `从索引 1 开始限制长度为 3 {{ 'hello' | limitTo(3, {startWithIndex:1}) }} 应该等于 hell`,
      result: "hell",
    },
    {
      className: "ignore-elements",
      data: "hello",
      params: [3, { startWithIndex: 1, cut: true, ignore: "e" }],
      description: `从索引 1 开始限制长度为 3 (裁剪) 计数时忽略元素 e {{ 'hello' | limitTo(3, {startWithIndex:1, cut: true, ignore:'e'}) }} 应该等于 ello`,
      result: "ello",
    },
    {
      className: "ignore-elements-num",
      data: 3.1415,
      params: [3, { ignore: /\./ }],
      description: `显示3位 计数时忽略元素 . {{ 3.1415 | limitTo(3, {ignore:/\\./}) }} 应该等于 3.14`,
      result: "3.14",
    },
    {
      className: "array-default",
      data: [1, 2, 3, 4, 5],
      params: [2],
      description: `数组显示2个元素 {{ [1,2,3,4,5] | limitTo(2) }} 应该等于 [1,2]`,
      result: `[
  1,
  2
]`,
    },
    {
      className: "array-start-with",
      data: [1, 2, 3, 4, 5],
      params: [2, { startWith: 3 }],
      description: `数组从3开始限制显示2个元素 {{ [1,2,3,4,5] | limitTo(2,{startWith:3}) }} 应该等于 [1,2,3,4]`,
      result: `[
  1,
  2,
  3,
  4
]`,
    },
    {
      className: "array-cut",
      data: [1, 2, 3, 4, 5],
      params: [2, { startWith: 3, cut: true }],
      description: `数组从3开始限制显示2个元素 {{ [1,2,3,4,5] | limitTo(2,{startWith:3, cut:true}) }} 应该等于 [3,4]`,
      result: `[
  3,
  4
]`,
    },
    {
      className: "negative-number",
      data: "hello",
      params: [-3],
      description: `限制长度为 3 从末尾开始计数{{ 'hello' | limitTo(-3) }} 应该等于 llo`,
      result: "llo",
    },
    {
      className: "negative-start-width-index",
      data: "hello",
      params: [-3, { startWithIndex: 1 }],
      description: `从索引 1 开始限制长度为 3 从末尾开始计数{{ 'hello' | limitTo(-3, {startWithIndex:1}) }} 应该等于 ello`,
      result: "ello",
    },
    {
      className: "negative-array-default",
      data: [1, 2, 3, 4, 5],
      params: [-2],
      description: `数组显示2个元素 从末尾开始计数{{ [1,2,3,4,5] | limitTo(-2) }} 应该等于 [4,5]`,
      result: `[
  4,
  5
]`,
    },
  ];
}
</script>

<style>
</style>
