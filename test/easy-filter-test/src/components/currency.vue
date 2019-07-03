<template>
  <div id="currency">
    <div v-for="item in testCases" :class="item.className">
      {{ item.data | currency(...item.params) }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
interface CheckItem {
  [key: string]: any;
  className?: string;
  data?: any;
  params?: any[];
  description: string;
  result: string;
}
@Component
export default class CurrencyTest extends Vue {
  private readonly testCases: Array<CheckItem> = [
    {
      className: 'default',
      data: 1000,
      params: [],
      description: `默认 {{ 1000 | currency }} 应该等于 $1,000.00`,
      result: '$1,000.00',
    },
    {
      className: 'other-symbol',
      data: 1000,
      params: ['¥'],
      description: `使用其他符号 {{ 1000 | currency('¥') }} 应该等于 ¥1,000.00`,
      result: '¥1,000.00',
    },
    {
      className: 'other-digits',
      data: 1000,
      params: ['$', 1],
      description: `其他小数位数 {{ 1000 | currency('$',1) }} 应该等于 $1,000.0`,
      result: '$1,000.0'
    },
    {
      className: 'wrong-digits',
      data: 1000,
      params: ['$', {}],
      description: `错误小数位数 {{ 1000 | currency('$',{}) }} 应该等于 $1,000.00`,
      result: '$1,000.00',
    },
    {
      className: 'symbol-on-right',
      data: 1000,
      params: ['¥',2, {symbolOnLeft: false}],
      description: `在右边显示符号 {{ 1000 | currency('¥', 2, {symbolOnLeft:false}) }} 应该等于 1,000.00¥`,
      result: '1,000.00¥',
    },
    {
      className: 'round',
      data: 1000.999999,
      params: ['ETH', 3, {round: true}],
      description: `四舍五入 {{ 1000.999999 | currency('ETH',3,{round:true}) }} 应该等于 ETH1,001.000`,
      result: 'ETH1,001.000',
    },
    {
      className: 'cut-out',
      data: 1000.123456,
      params: ['ETH', 5],
      description: `截取5位小数 {{ 1000.123456 | currency('ETH',5) }} 应该等于 ETH1,000.12345`,
      result: 'ETH1,000.12345',
    },
    {
      className: 'other-separator',
      data: 1000,
      params: ['MGD', 4, {separator: ''}],
      description: `其他分隔符 {{ 1000 | currency('MGD',4,{separator: ''}) }} 应该等于 MGD1000.0000`,
      result: 'MGD1000.0000',
    },
    {
      className: 'left-add-space',
      data: 1000,
      params: ['BTC', 6, {addSpace: true}],
      description: `在货币符号与金额之间添加空格(左) {{ 1000 | currency('BTC',6,{addSpace: true}) }} 应该等于 BTC 1,000.000000`,
      result: 'BTC 1,000.000000',
    },
    {
      className: 'right-add-space',
      data: 1000,
      params: ['BTC', 0, {addSpace: true, symbolOnLeft:false}],
      description: `在货币符号与金额之间添加空格(右) {{ 1000 | currency('BTC',0,{addSpace: true, symbolOnLeft:false}) }} 应该等于 1,000 BTC`,
      result: '1,000 BTC',
    },
    {
      className: 'deal-scientific-n',
      data: -1.23e-12,
      params: ['BTC', 14, {addSpace: true, symbolOnLeft:false}],
      description: `处理科学计数法(超小负数) {{ -1.23e-12 | currency('BTC',14,{addSpace: true, symbolOnLeft:false}) }} 应该等于 -0.00000000000123 BTC`,
      result: '-0.00000000000123 BTC',
    },
    {
      className: 'deal-scientific-p',
      data: 1.23E+17,
      params: ['BTC', 0, {addSpace: true}],
      description: `处理科学计数法(超大正数) {{ 1.23E+17 | currency('BTC',0,{addSpace: true}) }} 应该等于 BTC 123,000,000,000,000,000`,
      result: 'BTC 123,000,000,000,000,000',
    },
    {
      className: 'cancel-padding-zero-only',
      data: 1000.12,
      params: ['BTC', 5, {pad: false}],
      description: `取消自动补零 {{ 1000.12 | currency('BTC',5,{pad:false}) }} 应该等于 BTC1,000.12`,
      result: 'BTC1,000.12',
    },
    {
      className: 'cancel-padding-zero-with-round',
      data: 1000.999999,
      params: ['BTC', 5, {round: true, pad: false}],
      description: `四舍五入 + 取消自动补零 {{ 1000.999999 | currency('BTC',5,{round:true, pad:false}) }} 应该等于 BTC1,001`,
      result: 'BTC1,001',
    },
    {
      className: 'empty-array',
      data: [],
      params: ['BTC', 2, {addSpace: true, symbolOnLeft: false}],
      description: `空数组  {{ [] | currency('BTC',2,{addSpace:true, symbolOnLeft:false}) }} 应该等于 0.00 BTC`,
      result: '0.00 BTC',
    },
    {
      className: 'array',
      data: [1, 2],
      params: ['BTC', 2],
      description: `数组  {{ [1,2] | currency('BTC',2) }} 应该等于 BTC1,2.00`,
      result: 'BTC1,2.00',
    },
    {
      className: 'empty-object',
      data: {},
      params: ['¥', 2, {addSpace: true, symbolOnLeft: false}],
      description: `空对象 {{ {} | currency('¥',2, {addSpace:true, symbolOnLeft:false}) }} 应该等于 [object object].00 ¥`,
      result: '[object object].00 ¥',
    },
    {
      className: 'object',
      data: {a: 'a'},
      params: ['¥', 2],
      description: `对象 {{ {a:'a'} | currency('¥',2) }} 应该等于 ¥[object object].00`,
      result: '¥[object object].00',
    },
    {
      className: 'null',
      data: null,
      params: ['¥', 2, {addSpace: true, symbolOnLeft: false}],
      description: `null {{ null | currency('¥',2,{addSpace:true, symbolOnLeft:false}) }} 应该等于 null.00 ¥`,
      result: 'null.00 ¥',
    },
    {
      className: 'undefined',
      data: undefined,
      params: ['¥', 2],
      description: `undefined {{ undefined | currency('¥',2) }} 应该等于 ¥undefined.00`,
      result: '¥undefined.00',
    },
    {
      className: 'empty-string',
      data: '',
      params: [],
      description: `空字符串 {{ '' | currency }} 应该等于 $0.00`,
      result: '$0.00',
    },
  ];
  constructor() {
    super();
  }
  public beforeCreate(): void {
      if(window.loadMoreThanOnce) {
        window.location.reload()
      }
  }
  public checkout(item: CheckItem): void {
      window.it(item.description, () => {
        const text: string = (document as any).querySelector(`.${item.className}`).textContent.trim();
        if (text !== item.result) {
          throw new Error('错误结果为' + text);
        }
      });
  }
  public mounted(): void {
    if(window.loadMoreThanOnce){
      return
    }
    window.describe('测试 currency', () => {
      const currencyContext:any = document.querySelector('#currency');
      this.testCases.forEach((item: CheckItem) => {
        this.checkout(item);
      });
    });
    window.mocha.run();
    window.loadMoreThanOnce = true;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
