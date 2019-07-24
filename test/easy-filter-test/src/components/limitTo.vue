<template>
  <div id="limitTo">
    <div v-for="item in testCases" :class="item.className">
      {{ item.data | limitTo(...item.params) }}
    </div>
  </div>
</template>

<script lang="ts">
import { Mixins, Component } from 'vue-property-decorator';
import TestBase from '../mixin/base-test';
@Component
export default class LimitToTest extends Mixins(TestBase) {
  public readonly functionName: string = 'limitTo';
  public readonly testCases: Array<CheckItem> = [
  {
    className: 'default',
    data: 1000,
    params: [],
    description: `默认 {{ 1000 | limitTo }} 应该等于 1000`,
    result: '1000',
  }
  ]
}

</script>

<style>

</style>
