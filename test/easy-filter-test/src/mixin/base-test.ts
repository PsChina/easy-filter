import { Vue, Component } from 'vue-property-decorator';

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
    result?: string;
  }
}



@Component
class Test extends Vue {
  public functionName: string = '';
  public testCases: CheckItem[] = [];
  public checkout(item: CheckItem): void {
    window.it(item.description, () => {
      const text: string = (document as any).querySelector(`.${item.className}`).textContent.trim();
      if (text !== item.result) {
        throw new Error('错误结果为' + text);
      }
    });
  }
  public beforeCreate(): void {
      if (window.loadMoreThanOnce) {
        window.location.reload();
      }
  }
  public mounted(): void {
    if (window.loadMoreThanOnce) {
      return;
    }
    window.describe(`测试 ${this.functionName}`, () => {
      this.testCases.forEach((item: CheckItem) => {
        if (item.doNotCheck) {
          return;
        }
        this.checkout(item);
      });
    });
    window.mocha.run();
    window.loadMoreThanOnce = true;
  }
}

export default Test;
