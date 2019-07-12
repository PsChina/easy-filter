<template>
  <div id="orderBy">
    <div v-for="item in testCases" :class="item.className">
      <h1 v-text="item.title"></h1>
      <table align="center">
        <tr>
          <th @click="changeAttr('name')" :class="[{up: sortAttr === 'name'},{down: sortAttr === '-name'}]">Name</th>
          <th @click="changeAttr('age')" :class="[{up: sortAttr === 'age'},{down: sortAttr === '-age'}]">Age</th>
        </tr>
        <tr v-for="data in $easyFilter.orderBy(item.data, sortAttr, undefined, item.func)">
          <td v-text="data.name"></td>
          <td v-text="data.age"></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Mixins } from 'vue-property-decorator';
import TestOrderby from '../../mixin/orderby-test';
@Component
export default class OrderByDefaultTest extends Mixins(TestOrderby) {
  public readonly testCases: Array<CheckItem> = [
    {
      title: '测试升降序',
      className: 'default',
      data: [{name:'Bar', age: 37},{name:'Foo', age: 20}],
      doNotCheck: true
    },
  ];
  public test(): void {
    const tds = (document as any).querySelector('.default').querySelectorAll('td') || [];
    const nameArr = [tds[0], tds[2]];
    const ageArr = [tds[1], tds[3]];
    window.describe('orderBy 测试', () => {
        switch (this.sortAttr) {
          case 'name':
            window.it('测试排序 name 应该为 Bar  Foo', () => {
              if (nameArr[0].textContent.trim() !== 'Bar' && nameArr[1].textContent.trim() !== 'Foo' ) {
                throw new Error('name升序未通过测试');
              }
            });
            break;
          case '-name':
            window.it('测试排序 -name 应该为 Foo  Bar', () => {
              if (nameArr[0].textContent.trim() !== 'Foo' && nameArr[1].textContent.trim() !== 'Bar' ) {
                throw new Error('name降序未通过测试');
              }
            });
            break;
          case 'age':
            window.it('测试排序 age 应该为 20  37', () => {
              if (ageArr[0].textContent.trim() !== '20' && ageArr[1].textContent.trim() !== '37' ) {
                throw new Error('age升序未通过测试');
              }
            });
            break;
          case '-age':
            window.it('测试排序 -age 应该为 37  20', () => {
              if (ageArr[0].textContent.trim() !== '37' && ageArr[1].textContent.trim() !== '20' ) {
                throw new Error('age降序未通过测试');
              }
            });
            break;
          default:
          break;
        }
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#orderBy {
  th{
    cursor: pointer;
  }
  .up {
    color: green;
  }
  .down {
    color: pink;
  }
}

</style>
