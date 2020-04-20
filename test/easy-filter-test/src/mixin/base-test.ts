import Base from './base';

import { Component } from 'vue-property-decorator';

import * as EasyFilter from '../../../../src/index';

declare global {
  interface Window {
    describe: any;
    it: any;
    mocha: any;
    loadMoreThanOnce: boolean;
  }
  interface CheckItem {
    [key: string]: any;
    className?: string;
    data?: any;
    params?: any[];
    description?: string;
    result?: string | number;
  }
}

@Component
class Test extends Base {
  public functionName: string = '';
  public testCases: CheckItem[] = [];
  public checkout(item: CheckItem): void {
    window.it(item.description, () => {
      if (item.isNotUI) {
        if (EasyFilter) {
          const fn = (EasyFilter as any)[this.functionName];

          const res = fn.call(null, item.data, ...item.params as any[])
          console.log(res)
          if (res !== item.result) {
            throw new Error('错误结果为' + res);
          }
        }
        return
      }
      const text: string = (document as any).querySelector(`.${item.className}`).textContent.trim();
      if (text !== item.result) {
        throw new Error('错误结果为' + text);
      }
    });
  }
  public mounted(): void {
    window.describe(`测试 ${this.functionName}`, () => {
      this.testCases.forEach((item: CheckItem) => {
        if (item.doNotCheck) {
          return;
        }
        this.checkout(item);
      });
    });
    window.mocha.run();
    this.setLoad();
  }
}

export default Test;
