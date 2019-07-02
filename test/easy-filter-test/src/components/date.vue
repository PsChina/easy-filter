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
    <div class="minutes">
      {{ 1523169365575 | date('mm') }}
    </div>
    <div class="second">
      {{ 1523169365575 | date('ss') }}
    </div>
    <div class="week">
      {{ 1523169365575 | date('EEE') }}
    </div>
    <div class="short-week">
      {{ 1523169365575 | date('EE') }}
    </div>
    <div class="week-cn">
      {{ 1523169365575 | date('EEE','cn') }} 
    </div>
    <div class="short-week-cn">
      {{ 1523169365575 | date('EE','cn') }}
    </div>
    <div class="customize">
      {{ 1523169365575 | date('EEE',{week:['日','一','二','三','四','五','六'],shortWeek:[7,1,2,3,4,5,6]}) }} 
    </div>
    <div class="customize-short">
      {{ 1523169365575 | date('EE',{week:['日','一','二','三','四','五','六'],shortWeek:[7,1,2,3,4,5,6]}) }} 
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
        window.it(`分 {{ 1523169365575 | date('mm') }} 应该等于 36`, () => {
          const text = (date as any).querySelector('.minutes').textContent.trim()
          if (text !== '36') {
            throw new Error('错误结果为' + text);
          }
        })
        window.it(`秒 {{ 1523169365575 | date('ss') }} 应该等于 05`, () => {
          const text = (date as any).querySelector('.second').textContent.trim()
          if (text !== '05') {
            throw new Error('错误结果为' + text);
          }
        })
        window.it(`星期 {{ 1523169365575 | date('EEE') }} 应该等于 Sunday`, () => {
          const text = (date as any).querySelector('.week').textContent.trim()
          if (text !== 'Sunday') {
            throw new Error('错误结果为' + text);
          }
        })
        window.it(`星期(简写) {{ 1523169365575 | date('EE') }} 应该等于 Sun`, () => {
          const text = (date as any).querySelector('.short-week').textContent.trim()
          if (text !== 'Sun') {
            throw new Error('错误结果为' + text);
          }
        })
        window.it(`星期(中文) {{ 1523169365575 | date('EEE','cn') }}  应该等于 星期日`, () => {
          const text = (date as any).querySelector('.week-cn').textContent.trim()
          if (text !== '星期日') {
            throw new Error('错误结果为' + text);
          }
        })
        window.it(`星期(中文简写) {{ 1523169365575 | date('EE','cn') }}  应该等于 周日`, () => {
          const text = (date as any).querySelector('.short-week-cn').textContent.trim()
          if (text !== '周日') {
            throw new Error('错误结果为' + text);
          }
        })
        window.it(`自定义星期  {{ 1523169365575 | date('EEE',{week:['日','一','二','三','四','五','六'],shortWeek:[7,1,2,3,4,5,6]}) }} 应该等于 日`, () => {
          const text = (date as any).querySelector('.customize').textContent.trim()
          if (text !== '日') {
            throw new Error('错误结果为' + text);
          }
        })
        window.it(`自定义星期(简写)  {{ 1523169365575 | date('EE',{week:['日','一','二','三','四','五','六'],shortWeek:[7,1,2,3,4,5,6]}) }}  应该等于 7`, () => {
          const text = (date as any).querySelector('.customize-short').textContent.trim()
          if (text !== '7') {
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
