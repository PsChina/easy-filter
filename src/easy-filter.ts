import plus from './plus';

type NumberDate = number | string;
type WeekConfig = 'cn' | 'en' | DateOption;
type DateData = NumberDate | Date;

interface CurrencyOption {
  [key: string]: any;
  symbolOnLeft: boolean;
  separator: string;
  addSpace: boolean;
  pad: boolean;
  round: boolean;
}

interface DateOption {
  [key: string]: string[];
  week: string[];
  shortWeek: string[];
}

interface DateOptions {
  [key: string]: DateOption;
  cn: DateOption;
  en: DateOption;
}

/**
 * @currency
 * 给展示金额数字加上货币符号以及分隔符。
 * @param {NumberDate} input 输入
 * @param {String} symbol 货币符号
 * @param {Number} digits 要保留的小数位数
 * @param {CurrencyOption} options symbolOnLeft 符号位置 separator 分隔符 addSpace 是否有空格 pad 是否补零 round 四舍五入
 * @return {String} String 输出
 */
function currency(input: NumberDate, symbol: string = '$', digits: number = 2, {
  symbolOnLeft = true,
  separator = ',',
  addSpace = false,
  pad = true,
  round = false,
}: CurrencyOption = {
  symbolOnLeft: true,
  separator: ',',
  addSpace: false,
  pad: true,
  round: false,
}): string {
  const digitsType = typeof digits;
  const inputType = typeof input;
  if (digitsType !== 'number') {
    digits = 2;
  }
  if (inputType !== 'number' && inputType !== 'string') {
    input = String(input);
  }
  // 转换科学计数法
  let data = sciNumToString(input);
  // 判断小数
  if (data.indexOf('.') !== -1 && digits !== 0) {
    // 将小数部分与整数部分分开
    const numberArr = data.split('.');
    let intPart = numberArr[0];
    const decimalPart = numberArr[1];
    // 四舍五入
    let decimal = '0';
    [intPart, decimal] = roundDecimalPart(
      round,
      intPart,
      decimalPart,
      digits,
    );
    // 处理整数部分
    const int = intPart.replace(/\B(?=(?:\d{3})+(?!\d))/g, separator);
    if (numberArr[0] < intPart && pad === false) {
      data = int;
    } else {
      data = `${int ? int : '0'}.${pad ? String(decimal).padEnd(digits, '0') : decimal}`;
    }
  } else {
    // 整数
    const numberArr = data.split('.');
    let intPart = numberArr[0];
    const decimalPart = numberArr[1];
    if (round && decimalPart) {
      intPart = String(Math.round(Number(input)));
    }
    // 拆分
    const int = intPart.replace(/\B(?=(?:\d{3})+(?!\d))/g, separator);
    // 添加小数部分
    data = `${int ? int : '0'}${pad ? '.'.padEnd(digits + 1, '0') : ''}`;
    if (digits <= 0) {
      data = `${int}`;
    }
  }
  if (data.charAt(0) === separator) {
    data = data.substring(1, data.length);
  }
  if (addSpace) {
    return symbolOnLeft
      ? `${symbol} ${data}`
      : `${data} ${symbol}`;
  }
  return symbolOnLeft ? symbol + data : data + symbol;
}

/**
 * @sciNumToString
 * 将科学计数法表示的数字转换为非科学计数法表示的字符串。
 * @param {NumberDate} num
 * @return {string} String
 */
function sciNumToString(num: NumberDate): string {
  if (num === 0) {
    if (1 / num !== 1 / 0) {
      num = '-0';
    }
  }
  const str: string = String(num).toLowerCase();
  if ( isNaN(Number(str)) ) {
    return str;
  }
  if (str.indexOf('e') === -1) {
    return str;
  }
  const symbol: string = str.charAt(0) === '-' ? '-' : '';
  if (str.indexOf('e-') !== -1) {
    const [val, power] = str.split('e-');
    const valArr = val.replace('-', '').split('.');
    let left = valArr[0];
    const right = valArr[1];
    left = left.padStart(Number(power) + 1, '0');
    return (
      symbol +
      left.charAt(0) +
      '.' +
      left.substring(1, left.length) +
      (right ? right : '')
    );
  } else if (str.indexOf('e') !== -1) {
    const strArr = str.split('e');
    const val = strArr[0];
    let power = strArr[1];
    let [left, right] = val.replace('-', '').split('.');
    right = right
      ? right
      : ((power = String(+power + 1)), (right = left), (left = ''), right);
    right = right.padEnd(Number(power), '0');
    return symbol + left + (right ? right : '');
  }
  return String(num);
}

/**
 * @roundDecimalPart
 * @param {boolean} round
 * @param {string} decimalPart
 * @param {number} digits
 * @return {array}
 */
function roundDecimalPart(round: boolean, intPart: string, decimalPart: string, digits: number) {
  let decimal: string = '';
  if (round) {
    const reservedPortion = decimalPart.substr(0, digits);
    const roundPart = Number(decimalPart.substr(digits, 1));
    if (roundPart >= 5) {
      decimal = String(plus(
        Number(`0.${reservedPortion}`),
        Number(`0.${'1'.padStart(digits, '0')}`),
      ));
      if (Number(decimal) >= 1) {
        intPart = String(Number(intPart) + 1);
        decimal = '0';
      } else {
        decimal = `${decimal}`.substr(2, digits);
      }
    } else {
      decimal = String(decimalPart.substring(0, digits));
    }
  } else {
    decimal = String(decimalPart.substring(0, digits));
  }
  return [intPart, Number(decimal) === 0 ? '0' : decimal];
}

/**
 * @date
 * 格式化时间戳 'yyyy/MM/dd HH:mm:ss EEE'
 */
function date(input: DateData, formatMode: string = 'yyyy/MM/dd HH:mm:ss EEE', option: WeekConfig = 'en'): DateData {
  function formatTimeWithMode(time: DateData, mode: string, opt: WeekConfig): string {
    const dateData = new Date(time);
    const optionType = typeof opt;
    const options: DateOptions = {
      en: {
        week: [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
        shortWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
      },
      cn: {
        week: [
          '星期日',
          '星期一',
          '星期二',
          '星期三',
          '星期四',
          '星期五',
          '星期六',
        ],
        shortWeek: [
          '周日',
          '周一',
          '周二',
          '周三',
          '周四',
          '周五',
          '周六',
        ],
      },
    };
    let week: string[];
    let shortWeek: string[];
    if (optionType === 'string') {
      week = options[(opt as any)].week;
      shortWeek = options[(opt as any)].shortWeek;
    } else if (optionType === 'object') {
      week = (opt as DateOption).week || [];
      shortWeek = (opt as DateOption).shortWeek || [];
    }  else {
      const log =
      'date option type must be string or DateOption. (see: https://pschina.github.io/easy-filter/zh/date/#date)';
      throw new TypeError(log);
    }
    mode = mode.replace(/y{1,4}|MM|dd|hh|HH|mm|ss|E{1,4}/g, (value: string) => {
      switch (value) {
        case 'MM': // Replace the month.
          return `${dateData.getMonth() + 1}`.padStart(2, '0');
        case 'dd': // Replace the date.
          return `${dateData.getDate()}`.padStart(2, '0');
        case 'hh': // Replace the hours (12-hour system).
          const hours = dateData.getHours();
          if (hours > 12) {
            return `${hours - 12}`.padStart(2, '0');
          }
          return `${hours}`.padStart(2, '0');
        case 'HH': // Replace the hours (24 hour system).
          return `${dateData.getHours()}`.padStart(2, '0');
        case 'mm': // Replace the minutes.
          return `${dateData.getMinutes()}`.padStart(2, '0');
        case 'ss': // Replace the second.
          return `${dateData.getSeconds()}`.padStart(2, '0');
        default:
          // Replace the years and week.
          if (value.indexOf('y') !== -1) {
            // y{1,4} Replace the years.
            const year: number = dateData.getFullYear();
            return value.length <= 2 ? String(year % 100) : String(year);
          } else {
            // E{1,4} Replace the week.
            const weekDay: number = dateData.getDay();
            const weekMap: string[] = [week[weekDay], shortWeek[weekDay]];
            return value.length <= 2 ? weekMap[1] : weekMap[0];
          }
      }
    });
    return mode;
  }
  if (!input) {
    // Determine whether the input to be filtered is not present and the input is ''.
    return '';
  } else {
    const old: DateData = input;
    input = new Date(input);
    // Determines whether the parameter is legally invalid and returns the original input.
    if (input.toString() === 'Invalid Date') {
      return old;
    }
    if (typeof formatMode === 'string') {
      return formatTimeWithMode(input as Date, formatMode, option);
    } else {
      return input;
    }
  }
}

export default {
  install(Vue: any, options: any) {
    Vue.filter('currency', currency);
    Vue.filter('date', date);
  },
};
