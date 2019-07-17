<template>
  <div>
    <div @click="useOption=!useOption" v-text="useOption ? '使用配置项' : '使用字符串参数直接匹配'"></div>
    <div v-if="useOption">
      <div v-for="key in ['name','sex','age','id']">
        <label :for="key">
          <span v-text="key"></span><input type="checkbox" :value="key" @change="select">
        </label>
      </div>
    </div>
    <input type="text" style="outline:none" v-model="match"/>
    <table>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Age</th>
        <th>Sex</th>
      </tr>
      <tr
        v-for="value in filter(personArray, useOption ? options : match)"
        :key="value.id"
        >
        <td v-text="value.id"></td>
        <td v-text="value.name"></td>
        <td v-text="value.age"></td>
        <td v-text="value.sex"></td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Mixins, Model } from 'vue-property-decorator';
import Base from '../mixin/base';

import { MatchRules } from '../../../../src/easy-filter';

@Component
export default class TestFilter extends Mixins(Base) {
  private readonly personArray: any[] = [
          { name: "Kimi", sex: "male", age: 8, id: 1 },
          { name: "Cindy", sex: "female", age: 4, id: 2 },
          { name: "Angela", sex: "female", age: 6, id: 3 },
          { name: "Shitou", sex: "male", age: 7, id: 4 },
          { name: "Tiantian", sex: "male", age: 5, id: 5 }
        ];
  private useOption = false;
  private match: string;
  private options: MatchRules;
  private ignore: Set<string>;
  private ignoreArr: string[];
  constructor() {
    super();
    this.match = ''
    this.ignore = new Set();
    this.ignoreArr = Array.from(this.ignore);
    this.options = {
      match: '',
      ignore: this.ignoreArr,
    }
  }
  public filter(input: any, match: string): any {
    return (this as any).$easyFilter.filter(input, match);
  }
  public select(event: any): void {
    if (event.target.checked) {
      this.ignore.add(event.target.value);
    } else {
      this.ignore.delete(event.target.value);
    }
    this.options.ignore = Array.from(this.ignore)
  }
}
</script>

<style>

</style>
