<template>
  <div id="uppercase">
    <div v-for="item in testCases" :class="item.className">
      {{ item.data | uppercase(...item.params) }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Mixins } from 'vue-property-decorator';
import TestBase from '../mixin/base-test';

@Component
export default class LowercaseTest extends Mixins(TestBase) {
  public readonly functionName: string = 'uppercase';
  public readonly testCases: Array<CheckItem> = [
    {
      className: 'default',
      data: 'hello',
      params: [],
      description: `默认 {{ 'hello' | uppercase }} 应该等于 HELLO`,
      result: 'HELLO',
    },
    {
      className: 'lowercase-with-range',
      data: 'hello',
      params: [1,3],
      description: `根据范围大写字母 {{ 'hello' | uppercase(1,3) }} 应该等于 hELLo`,
      result: 'hELLo',
    },
    {
      className: 'lowercase-with-start-index',
      data: 'hello',
      params: [2],
      description: `根据开始索引大写字母 {{ 'hello' | uppercase(2) }} 应该等于 heLLO`,
      result: 'heLLO',
    },
    {
      className: 'lowercase-with-range-end',
      data: 'hello',
      params: [0,3],
      description: `根据结尾索引大写字母 {{ 'hello' | uppercase(0,3) }} 应该等于 HELLo`,
      result: 'HELLo',
    }
    ]
}
</script>

<style>

</style>
