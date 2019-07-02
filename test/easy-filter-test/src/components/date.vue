<template>
  <div id="date">
    <div class="default">
      {{ 1523169365575 | date }}
    </div>
    <div class="year">
      {{ 1523169365575 | date('yyyy') }}
    </div>
    <div class="month">
      {{ 1523169365575 | date('MM') }}
    </div>
    <div class="day">
      {{ 1523169365575 | date('dd') }}
    </div>
    <div class="hours-24">
      {{ 1523169365575 | date('HH') }}
    </div>
    <div class="hours-12">
      {{ 1523169365575 | date('hh') }}
    </div>
    <div class="hours-12">
      {{ 1523169365575 | date('hh') }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';


declare global {
  interface Window {
    describe: any;
    it: any;
    mocha: any;
    loadMoreThanOnce: boolean;
  }
}

@Component
export default class DateTest extends Vue {
  public beforeCreate(): void {
      if(window.loadMoreThanOnce) {
        window.location.reload()
      }
  }
  public mounted(): void {
      if(window.loadMoreThanOnce){
        return
      }
      window.describe('测试 date', () => {
        const date = document.querySelector('#date')
        window.it(`默认 {{ 1523169365575 | date }} 应该等于 2018/04/08 14:36:05 Sunday`, () => {
          const text = (date as any).querySelector('.default').textContent.trim()
          if (text !== '2018/04/08 14:36:05 Sunday') {
            throw new Error('错误结果为' + text);
          }
        })
        window.it(`年 {{ 1523169365575 | date('yyyy') }} 应该等于 2018`, () => {
          const text = (date as any).querySelector('.year').textContent.trim()
          if (text !== '2018') {
            throw new Error('错误结果为' + text);
          }
        })
        window.it(`月 {{ 1523169365575 | date('MM') }} 应该等于 04`, () => {
          const text = (date as any).querySelector('.month').textContent.trim()
          if (text !== '04') {
            throw new Error('错误结果为' + text);
          }
        })
        window.it(`日 {{ 1523169365575 | date('dd') }} 应该等于 08`, () => {
          const text = (date as any).querySelector('.day').textContent.trim()
          if (text !== '08') {
            throw new Error('错误结果为' + text);
          }
        })
        window.it(`24小时制 {{ 1523169365575 | date('HH') }} 应该等于 14`, () => {
          const text = (date as any).querySelector('.hours-24').textContent.trim()
          if (text !== '14') {
            throw new Error('错误结果为' + text);
          }
        })
        window.it(`12小时制 {{ 1523169365575 | date('hh') }} 应该等于 02`, () => {
          const text = (date as any).querySelector('.hours-12').textContent.trim()
          if (text !== '02') {
            throw new Error('错误结果为' + text);
          }
        })
      })
      window.mocha.run();
      window.loadMoreThanOnce = true;
  }
}
</script>

<style>

</style>
