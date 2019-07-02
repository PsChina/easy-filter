<template>
  <div id="currency">
    <div class="default">
       {{ 1000 | currency }}
    </div>
    <div class="other-symbol">
      {{ 1000 | currency('¥') }}
    </div>
    <div class="other-digits">
      {{ 1000 | currency('$',1) }}
    </div>
    <div class="wrong-digits">
      {{ 1000 | currency('$',{}) }}
    </div>
    <div class="symbol-on-right">
      {{ 1000 | currency('¥',2,{symbolOnLeft:false}) }}
    </div>
    <div class="round">
      {{ 1000.999999 | currency('ETH',3,{round:true}) }}
    </div>
    <div class="cut-out">
      {{ 1000.123456 | currency('ETH',5) }}
    </div>
    <div class="other-separator">
      {{ 1000 | currency('MGD',4,{separator: ''}) }}
    </div>
    <div class="left-add-space">
      {{ 1000 | currency('BTC',6,{addSpace: true}) }}
    </div>
    <div class="right-add-space">
      {{ 1000 | currency('BTC',0,{addSpace: true, symbolOnLeft:false}) }}
    </div>
    <div class="deal-scientific-n">
      {{ -1.23e-12 | currency('BTC',14,{addSpace: true, symbolOnLeft:false}) }}
    </div>
    <div class="deal-scientific-p">
      {{ 1.23E+17 | currency('BTC',0,{addSpace: true}) }}
    </div>
    <div class="cancel-padding-zero-only">
      {{ 1000.12 | currency('BTC',5,{pad:false}) }}
    </div>
    <div class="cancel-padding-zero-with-round">
      {{ 1000.999999 | currency('BTC',5,{round:true, pad:false}) }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class CurrencyTest extends Vue {
  public beforeCreate(): void {
      if(window.loadMoreThanOnce) {
        window.location.reload()
      }
  }
  public mounted(): void {
    if(window.loadMoreThanOnce){
      return
    }
    window.describe('测试 currency', () => {
      const currencyContext:any = document.querySelector('#currency');
      window.it('默认 {{ 1000 | currency }} 应该等于 $1,000.00', () => {
        const text: string = currencyContext.querySelector('.default').innerHTML.trim();
        if (text !== '$1,000.00') {
          throw new Error('错误结果为' + text);
        }
      });
      window.it(`使用其他符号 {{ 1000 | currency('¥') }} 应该等于 ¥1,000.00`, () => {
        const text: string = currencyContext.querySelector('.other-symbol').innerHTML.trim();
        if (text !== '¥1,000.00') {
          throw new Error('错误结果为' + text);
        }
      });
      window.it(`其他小数位数 {{ 1000 | currency('$',1) }} 应该等于 $1,000.0`, () => {
        const text: string = currencyContext.querySelector('.other-digits').innerHTML.trim();
        if (text !== '$1,000.0') {
          throw new Error('错误结果为' + text);
        }
      });
      window.it(`错误小数位数 {{ 1000 | currency('$',{}) }} 应该等于 $1,000.00`, () => {
        const text: string = currencyContext.querySelector('.wrong-digits').innerHTML.trim();
        if (text !== '$1,000.00') {
          throw new Error('错误结果为' + text);
        }
      });
      window.it(`在右边显示符号 {{ 1000 | currency('¥',{symbolOnLeft:false}) }} 应该等于 1,000.00¥`, () => {
        const text: string = currencyContext.querySelector('.symbol-on-right').innerHTML.trim();
        if (text !== '1,000.00¥') {
          throw new Error('错误结果为' + text);
        }
      });
      window.it(`四舍五入 {{ 1000.999999 | currency('ETH',3,{round:true}) }} 应该等于 ETH1,001.000`, () => {
        const text: string = currencyContext.querySelector('.round').innerHTML.trim();
        if (text !== 'ETH1,001.000') {
          throw new Error('错误结果为' + text);
        }
      });
      window.it(`截取5位小数 {{ 1000.123456 | currency('ETH',5) }} 应该等于 ETH1,000.12345`, () => {
        const text: string = currencyContext.querySelector('.cut-out').innerHTML.trim();
        if (text !== 'ETH1,000.12345') {
          throw new Error('错误结果为' + text);
        }
      });
      window.it(`其他分隔符 {{ 1000 | currency('MGD',4,{separator: ''}) }} 应该等于 MGD1000.0000`, () => {
        const text: string = currencyContext.querySelector('.other-separator').innerHTML.trim();
        if (text !== 'MGD1000.0000') {
          throw new Error('错误结果为' + text);
        }
      });
      window.it(`在货币符号与金额之间添加空格(左) {{ 1000 | currency('BTC',6,{addSpace: true}) }} 应该等于 BTC 1,000.000000`, () => {
        const text: string = currencyContext.querySelector('.left-add-space').innerHTML.trim();
        if (text !== 'BTC 1,000.000000') {
          throw new Error('错误结果为' + text);
        }
      });
      window.it(`在货币符号与金额之间添加空格(右) {{ 1000 | currency('BTC',0,{addSpace: true, symbolOnLeft:false}) }} 应该等于 1,000 BTC`, () => {
        const text: string = currencyContext.querySelector('.right-add-space').innerHTML.trim();
        if (text !== '1,000 BTC') {
          throw new Error('错误结果为' + text);
        }
      });
      window.it(`处理科学计数法(超小负数) {{ -1.23e-12 | currency('BTC',14,{addSpace: true, symbolOnLeft:false}) }} 应该等于 -0.00000000000123 BTC`, () => {
        const text: string = currencyContext.querySelector('.deal-scientific-n').innerHTML.trim();
        if (text !== '-0.00000000000123 BTC') {
          throw new Error('错误结果为' + text);
        }
      });
      window.it(`处理科学计数法(超大正数) {{ 1.23E+17 | currency('BTC',0,{addSpace: true}) }} 应该等于 BTC 123,000,000,000,000,000`, () => {
        const text: string = currencyContext.querySelector('.deal-scientific-p').innerHTML.trim();
        if (text !== 'BTC 123,000,000,000,000,000') {
          throw new Error('错误结果为' + text);
        }
      });
      window.it(`取消自动补零 {{ 1000.12 | currency('BTC',5,{pad:false}) }} 应该等于 BTC1,000.12`, () => {
        const text: string = currencyContext.querySelector('.cancel-padding-zero-only').innerHTML.trim();
        if (text !== 'BTC1,000.12') {
          throw new Error('错误结果为' + text);
        }
      })
      window.it(`四舍五入 + 取消自动补零 {{ 1000.999999 | currency('BTC',5,{round:true, pad:false}) }} 应该等于 BTC1,001`, () => {
        const text: string = currencyContext.querySelector('.cancel-padding-zero-with-round').innerHTML.trim();
        if (text !== 'BTC1,001') {
          throw new Error('错误结果为' + text);
        }
      })
    });
    window.mocha.run();
    window.loadMoreThanOnce = true;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
