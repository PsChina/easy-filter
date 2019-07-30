<template>
  <div id="lowercase">
    <div v-for="item in testCases" :class="item.className">
      {{ item.data | lowercase(...item.params) }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Mixins } from 'vue-property-decorator';
import TestBase from '../mixin/base-test';

@Component
export default class LowercaseTest extends Mixins(TestBase) {
  public readonly functionName: string = 'lowercase';
  public readonly testCases: Array<CheckItem> = [
    {
      className: 'default',
      data: 'Hello',
      params: [],
      description: `默认 {{ 'Hello' | lowercase }} 应该等于 hello`,
      result: 'hello',
    },
    {
      className: 'lowercase-with-range',
      data: 'HELLO',
      params: [1,3],
      description: `根据范围小写字母 {{ 'HELLO' | lowercase(1,3) }} 应该等于 HellO`,
      result: 'HellO',
    },
    {
      className: 'lowercase-with-start-index',
      data: 'HELLO',
      params: [2],
      description: `根据开始索引小写字母 {{ 'HELLO' | lowercase(2) }} 应该等于 HEllo`,
      result: 'HEllo',
    },
    {
      className: 'lowercase-with-range-end',
      data: 'HELLO',
      params: [0,3],
      description: `根据结尾索引小写字母 {{ 'HELLO' | lowercase(0,3) }} 应该等于 hellO`,
      result: 'hellO',
    },
    {
      className: 'lowercase-with-zero-zero',
      data: 'HELLO',
      params: [0,0],
      description: `参数零零 {{ 'HELLO' | lowercase(0,0) }} 应该等于 HELLO`,
      result: 'HELLO',
    }
    ]
}
</script>

<style>

</style>
