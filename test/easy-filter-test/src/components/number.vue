<template>
  <div id="number">
    <div
      v-for="item in testCases"
      :class="item.className"
      :key="item.className"
    >{{ item.data | number(...item.params) }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Mixins, Model, Watch } from "vue-property-decorator";
import TestBase from "../mixin/base-test";

@Component
export default class NumberTest extends Mixins(TestBase) {
  public readonly functionName: string = "number";
  public readonly testCases: Array<CheckItem> = [
    {
      className: "default-int",
      data: 1000,
      params: [],
      description: `默认 {{ 1000 | number }} 应该等于 1000`,
      result: "1000"
    },
    {
      className: "default-int-limit-digits",
      data: 1000,
      params: [1],
      description: `默认 {{ 1000 | number(1) }} 应该等于 1000`,
      result: "1000"
    },
    {
      className: "int-limit-digits-with-pad",
      data: 1000,
      params: [1, { pad: true }],
      description: `默认 {{ 1000 | number(1,{pad:true}) }} 应该等于 1000.0`,
      result: "1000.0"
    },
    {
      className: "default-decimal",
      data: 3.14,
      params: [],
      description: `默认 {{ 3.14 | number }} 应该等于 3.14`,
      result: "3.14"
    },
    {
      className: "default-negative",
      data: -0,
      params: [],
      description: `默认 {{ -0 | number }} 应该等于 -0`,
      result: "-0"
    },
    {
      className: "default-digits",
      data: 0.123456789,
      params: [],
      description: `默认 {{ 0.123456789 | number }} 应该等于 0.12345678`,
      result: "0.12345678"
    },
    {
      className: "limit-digits",
      data: 3.1415926,
      params: [4],
      description: `默认 {{ 3.1415926 | number(4) }} 应该等于 3.1415`,
      result: "3.1415"
    },
    {
      className: "conversion-science-notation",
      data: 5.2e-7,
      params: [],
      description: `默认 {{ 5.2e-7 | number }} 应该等于 0.00000052`,
      result: "0.00000052"
    },
    {
      className: "auto-fill-zero",
      data: 1,
      params: [2, { pad: true }],
      description: `默认 {{1 | number(2, {pad: true}) }} 应该等于 1.00`,
      result: "1.00"
    },
    {
      className: "round",
      data: 0.999,
      params: [0, { round: true }],
      description: `默认 {{1 | number(0, {round: true}) }} 应该等于 1`,
      result: "1"
    },
    {
      className: "set-separator",
      data: 1000000,
      params: [2, { separator: ",", pad: true }],
      description: `默认 {{1000000 | number(2, {separator: ',', pad: true}) }} 应该等于 1,000,000.00`,
      result: "1,000,000.00"
    },
    {
      className: "set-sign",
      data: 100.123456,
      params: [5, { round: true, sign: true }],
      description: `默认 {{100.123456 | number(5, {round: true, sign: true}) }} 应该等于 +100.12346`,
      result: "+100.12346"
    },
    {
      className: "positive-zero",
      data: 0,
      params: [0, { sign: { zero: "+" } }],
      description: `默认 {{0 | number(0, {sign: {zero:'+'}}) }} 应该等于 +0`,
      result: "+0"
    },
    {
      className: "negative-zero",
      data: 0,
      params: [0, { sign: { zero: "-" } }],
      description: `默认 {{0 | number(0, {sign: {zero:'-'}}) }} 应该等于 -0`,
      result: "-0"
    },
    {
      className: "long-decimal",
      data: 3.14e-20,
      params: [21],
      description: `默认 {{3.14e-20 | number(21) }} 应该等于 0.000000000000000000031`,
      result: "0.000000000000000000031"
    },
    {
      className: "round-2",
      data: 0.0999,
      params: [1, { round: true }],
      description: `默认 {{0.0999 | number(1,{round: true}) }} 应该等于 0.1`,
      result: "0.1"
    }
  ];
}
</script>

<style>
</style>
