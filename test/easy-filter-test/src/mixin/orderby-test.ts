import Base from './base';
import { Component } from 'vue-property-decorator';

@Component
class OrderByTest extends Base {
  public elementClass: string = '';
  public reverse: boolean = false;
  public sortAttr: string = 'name';
  constructor() {
    super();
    const paramsString = window.location.href.split('?')[1];
    if (paramsString && paramsString.length) {
      const params: any = {};
      paramsString.split('&').forEach((item) => {
        const paramsItem = item.split('=');
        params[paramsItem[0]] = paramsItem[1];
      });
      this.reverse = params.reverse === 'true';
      this.sortAttr = ((this.reverse ? '' : '-') + params.sortAttr) || 'name';
    }
  }
  public test() {
    return;
  }
  public changeAttr(val: any): void {
    this.reverse = !this.reverse;
    this.sortAttr = (this.reverse ? '' : '-') + val;
    const params: any = {
      reverse: this.reverse,
      sortAttr: val,
    };
    let query = '?';
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        query += key + '=' + params[key] + '&';
      }
    }
    query = query.substring(0, query.length - 1);
    window.location.href = window.location.href.split('?')[0] + '?' + query;
    window.location.reload();
  }
  public mounted() {
    if (window.loadMoreThanOnce) {
      return;
    }
    this.test();
    window.mocha.run();
    this.setLoad();
  }
}

export default OrderByTest;
