/**
 * @currency
 * 给展示金额数字加上货币符号以及分隔符。
 * @param {NumberDate} input 输入
 * @param {String} symbol 货币符号
 * @param {Number} digits 要保留的小数位数
 * @param {CurrencyOption} options symbolOnLeft 符号位置 separator 分隔符 addSpace 是否有空格 pad 是否补零 round 四舍五入
 * @return {String} String 输出
 */
export function currency(input, symbol = '$', digits = 2, { symbolOnLeft = true, separator = ',', addSpace = false, pad = true, round = false, } = {
    symbolOnLeft: true,
    separator: ',',
    addSpace: false,
    pad: true,
    round: false,
}) {
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
    if (data.includes('.') && digits !== 0) {
        // 将小数部分与整数部分分开
        const numberArr = data.split('.');
        let intPart = numberArr[0];
        const decimalPart = numberArr[1];
        // 四舍五入
        let decimal = '0';
        [intPart, decimal] = roundDecimalPart(round, intPart, decimalPart, digits);
        // 处理整数部分
        const int = intPart.replace(/\B(?=(?:\d{3})+(?!\d))/g, separator);
        if (numberArr[0] < intPart && pad === false) {
            data = int;
        }
        else {
            data = `${int ? int : '0'}.${pad ? String(decimal).padEnd(digits, '0') : decimal}`;
        }
    }
    else {
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
function sciNumToString(num) {
    if (num === 0) {
        if (1 / num !== 1 / 0) {
            num = '-0';
        }
    }
    const str = String(num).toLowerCase();
    if (isNaN(Number(str))) {
        return str;
    }
    if (!str.includes('e')) {
        return str;
    }
    const symbol = str.charAt(0) === '-' ? '-' : '';
    if (str.includes('e-')) {
        const [val, power] = str.split('e-');
        const valArr = val.replace('-', '').split('.');
        let left = valArr[0];
        const right = valArr[1];
        left = left.padStart(Number(power) + 1, '0');
        return (symbol +
            left.charAt(0) +
            '.' +
            left.substring(1, left.length) +
            (right ? right : ''));
    }
    else if (str.includes('e')) {
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
function plus(num1, num2, ...others) {
    if (others.length > 0) {
        return plus(plus(num1, num2), others[0], ...others.slice(1));
    }
    const baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)));
    return (times(num1, baseNum) + times(num2, baseNum)) / baseNum;
}
function digitLength(num) {
    // Get digit length of e
    const eSplit = num.toString().split(/[eE]/);
    const len = (eSplit[0].split('.')[1] || '').length - +(eSplit[1] || 0);
    return len > 0 ? len : 0;
}
function times(num1, num2, ...others) {
    if (others.length > 0) {
        return times(times(num1, num2), others[0], ...others.slice(1));
    }
    const num1Changed = float2Fixed(num1);
    const num2Changed = float2Fixed(num2);
    const baseNum = digitLength(num1) + digitLength(num2);
    const leftValue = num1Changed * num2Changed;
    return leftValue / Math.pow(10, baseNum);
}
function float2Fixed(num) {
    if (num.toString().indexOf('e') === -1) {
        return Number(num.toString().replace('.', ''));
    }
    const dLen = digitLength(num);
    return dLen > 0 ? strip(num * Math.pow(10, dLen)) : num;
}
function strip(num, precision) {
    if (precision === void 0) {
        precision = 12;
    }
    const dLen = digitLength(num);
    return dLen > 0 ? strip(num * Math.pow(10, dLen)) : num;
}
/**
 * @roundDecimalPart
 * @param {boolean} round
 * @param {string} decimalPart
 * @param {number} digits
 * @return {array}
 */
function roundDecimalPart(round, intPart, decimalPart, digits) {
    let decimal = '';
    if (round) {
        const reservedPortion = decimalPart.substr(0, digits);
        const roundPart = Number(decimalPart.substr(digits, 1));
        if (roundPart >= 5) {
            decimal = String(plus(Number(`0.${reservedPortion}`), Number(digits ? `0.${'1'.padStart(digits, '0')}` : '1')));
            if (Number(decimal) >= 1) {
                intPart = String(Number(intPart) + 1);
                decimal = '0';
            }
            else {
                decimal = `${decimal}`.substr(2, digits);
            }
        }
        else {
            decimal = String(decimalPart.substring(0, digits));
        }
    }
    else {
        decimal = String(decimalPart.substring(0, digits));
    }
    return [intPart, Number(decimal) === 0 ? '0' : decimal];
}
/**
 * @date
 * 格式化时间戳 'yyyy/MM/dd HH:mm:ss EEE'
 */
export function date(input, formatMode = 'yyyy/MM/dd HH:mm:ss EEE', option = 'en') {
    // 兼容Safari
    try {
        if (navigator.userAgent.includes('Safari')) {
            if (typeof input === 'string') {
                input = input.replace(/-/g, '/');
            }
        }
    }
    catch (e) {
        throw new Error(e);
    }
    finally {
        if (!input) {
            // Determine whether the input to be filtered is not present and the input is ''.
            return '';
        }
        else {
            const old = input;
            input = new Date(input);
            // Determines whether the parameter is legally invalid and returns the original input.
            if (input.toString() === 'Invalid Date') {
                return old;
            }
            if (typeof formatMode === 'string') {
                return formatTimeWithMode(input, formatMode, option);
            }
            else {
                return input;
            }
        }
    }
}
function formatTimeWithMode(time, mode, opt) {
    const dateData = new Date(time);
    const optionType = typeof opt;
    const options = {
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
    let week;
    let shortWeek;
    if (optionType === 'string') {
        week = options[opt].week;
        shortWeek = options[opt].shortWeek;
    }
    else if (optionType === 'object') {
        week = opt.week || [];
        shortWeek = opt.shortWeek || [];
    }
    else {
        const log = 'date option type must be string or DateOption. (see: https://pschina.github.io/easy-filter/zh/date/#date)';
        throw new TypeError(log);
    }
    mode = mode.replace(/(y|Y){1,4}|MM|dd|hh|HH|mm|ss|E{1,4}/g, (value) => {
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
                if (value.toLocaleLowerCase().includes('y')) {
                    // y{1,4} Replace the years.
                    const year = dateData.getFullYear();
                    return value.length <= 2 ? String(year % 100) : String(year);
                }
                else {
                    // E{1,4} Replace the week.
                    const weekDay = dateData.getDay();
                    const weekMap = [week[weekDay], shortWeek[weekDay]];
                    return value.length <= 2 ? weekMap[1] : weekMap[0];
                }
        }
    });
    return mode;
}
// Default Comparator
const builtInComparator = (item1, item2, key, reverse) => item1[key] > item2[key] ?
    (reverse ? -1 : 1)
    :
        (reverse ? 1 : -1);
/**
 * @orderBy
 */
export function orderBy(input, expression, reverse, comparator = builtInComparator) {
    let key;
    const expressionType = typeof expression;
    if (expressionType === 'string') {
        if (expression.charAt(0) === '-') {
            reverse = true;
            key = expression.substr(1);
        }
        else {
            key = expression;
        }
    }
    else if (expressionType === 'function') {
        comparator = expression;
    }
    if (input instanceof Array) {
        let newArr = input.concat();
        newArr = newArr.sort((value, nextValue) => {
            return comparator(value, nextValue, key, reverse);
        });
        input = newArr;
        return input;
    }
    return input;
}
/**
 *  @filter Selects a subset of items from Object and returns it as a new Object.
 */
export function filter(input, matchOptions) {
    // Filter object.
    if (!matchOptions || !input) {
        return input;
    }
    function filterObj(originalObject, match, ignore) {
        let obj;
        // Determine the type of object to be filtered to copy.
        if (originalObject instanceof Array) {
            obj = [];
        }
        else if (originalObject instanceof Object) {
            obj = {};
        }
        else {
            return originalObject.includes(match) ? originalObject : undefined;
        }
        for (const key in originalObject) {
            if (originalObject.hasOwnProperty(key)) {
                const value = originalObject[key];
                if (typeof value === 'object') {
                    // Deep copy object.
                    const newObj = matchCopy(value, match, ignore);
                    if (newObj instanceof Array) {
                        if (newObj.length) {
                            // Not an empty array can be assigned.
                            obj[key] = newObj;
                        }
                    }
                    else {
                        if (Object.keys(newObj).length > 0) {
                            // Not empty objects can be assigned.
                            obj[key] = newObj;
                        }
                    }
                }
                else {
                    if (value.includes(match)) {
                        // What is needed is saved.
                        obj[key] = value;
                    }
                }
            }
        }
        if (obj instanceof Array) {
            obj = obj.filter((item) => item !== undefined);
        }
        return obj;
    }
    if (matchOptions instanceof Function) {
        return matchFunc(input, matchOptions);
    }
    else if (typeof matchOptions === 'object') {
        const { ignore, match } = matchOptions;
        if (match instanceof Function) {
            return matchFunc(input, match);
        }
        else {
            return filterObj(input, match, [ignore].flat());
        }
    }
    else {
        return filterObj(input, matchOptions);
    }
}
/**
 * childExists
 */
function childExists(obj, match, ignore) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            const type = typeof value;
            if (type === 'string' || type === 'number') {
                if (new RegExp(match, 'ig').test(value) ||
                    value.toString().includes(match)) {
                    if (ignore instanceof Array) {
                        if (!ignore.includes(key)) {
                            return true;
                        }
                    }
                    else {
                        return true;
                    }
                }
            }
            else {
                return childExists(value, match, ignore);
            }
        }
    }
    return false;
}
/**
 * matchCopy
 */
function matchCopy(obj, match, ignore) {
    let newObj;
    if (obj instanceof Array) {
        newObj = [];
    }
    else {
        newObj = {};
    }
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            if (typeof value === 'object' && childExists(value, match, ignore)) {
                newObj[key] = matchCopy(value, '');
            }
            else {
                if (childExists(obj, match, ignore)) {
                    newObj[key] = value;
                }
            }
        }
    }
    if (newObj instanceof Array) {
        newObj = newObj.filter((item) => item !== undefined);
    }
    return newObj;
}
/**
 *
 * match func
 *
 */
function matchFunc(input, matchOptions) {
    if (input instanceof Array) {
        return input.filter((value) => {
            return matchOptions(value);
        });
    }
    else {
        const obj = {};
        for (const key in input) {
            if (input.hasOwnProperty(key)) {
                const value = input[key];
                if (matchOptions(value)) {
                    obj[key] = value;
                }
            }
        }
        return obj;
    }
}
function isEmpty(val) {
    return (val === undefined ||
        val === '' ||
        val === null ||
        JSON.stringify(val) === '[]' ||
        JSON.stringify(val) === '{}');
}
export function number(input, digits = 8, options = { round: false, pad: false, sign: false, separator: '' }) {
    const { round, pad, sign, separator } = options;
    if (isEmpty(input)) {
        if (digits <= 0) {
            return '0';
        }
        return pad ? `0.${'0'.padEnd(digits, '0')}` : '0';
    }
    input = input;
    if (isNaN(Number(input))) {
        return String(input);
    }
    if (Number(input) === 0 && typeof sign === 'object') {
        input = `${sign.zero}0`;
    }
    // 若输入的数据为科学计数法表示的数据，转换为非科学计数法表示。
    const temp = sciNumToString(input);
    let int = temp.replace(/\B(?=(?:\d{3})+(?!\d))/g, separator || '');
    let decimal = digits ? '0' : false;
    if (temp.includes('.')) {
        const numberArr = temp.split('.');
        let intPart = numberArr[0];
        const decimalPart = numberArr[1];
        [intPart, decimal] = roundDecimalPart(Boolean(round), intPart, decimalPart, digits);
        int = intPart.replace(/\B(?=(?:\d{3})+(?!\d))/g, separator || '');
    }
    if (input > 0 && sign) {
        int = `+${int}`;
    }
    if (!digits) {
        return String(int);
    }
    if (pad) {
        return `${int}${decimal ? `.${decimal.padEnd(digits, '0')}` : ''}`;
    }
    else {
        if (Number(decimal) === 0) {
            return int;
        }
        return decimal ? `${int}.${decimal}` : int;
    }
}
/**
 * @limitTo
 * Creates a new array or string containing only a specified number of elements.
 * The elements are taken from either the beginning or the end of the source array,
 * string or number,
 * as specified by the value and sign (positive or negative) of limit.
 */
export function limitTo(input, limit = Number.POSITIVE_INFINITY, option = { startWithIndex: 0, cut: false }) {
    const { startWith, ignore, cut } = option;
    let { startWithIndex } = option;
    if (startWithIndex === undefined) {
        startWithIndex = 0;
    }
    const type = typeof input;
    switch (type) {
        case 'string': {
            const arrayData = input.split('');
            const itemIndex = arrayData.indexOf(startWith);
            const startIndex = itemIndex === -1 ? startWithIndex : itemIndex;
            return getOutput(arrayData, { startIndex, limit, ignore, type, cut });
        }
        case 'number': {
            const arrayData = (input).toString().split('');
            const itemIndex = arrayData.indexOf(startWith);
            const startIndex = itemIndex === -1 ? startWithIndex : itemIndex;
            return getOutput(arrayData, {
                startIndex,
                limit,
                ignore,
                type,
                cut,
            });
        }
        default: {
            if (input instanceof Array) {
                const arrayData = input.concat();
                const itemIndex = arrayData.indexOf(startWith);
                const startIndex = itemIndex === -1 ? startWithIndex : itemIndex;
                return getOutput(arrayData, {
                    startIndex,
                    limit,
                    ignore,
                    type,
                    cut,
                });
            }
            return input;
        }
    }
}
function getOutput(array, option) {
    const { startIndex, limit, ignore, type, cut } = option;
    let endIndex = startIndex + Number(limit);
    const newArr = [];
    let count = 0;
    array.forEach((item, index) => {
        if (index >= startIndex && index < endIndex) {
            const regExp = new RegExp(ignore ? ignore : '');
            if (!ignore) {
                count++;
            }
            else if (!regExp.test(item)) {
                count++;
                endIndex++;
            }
            if (count <= limit && cut) {
                if ((limit === 0 && index <= startIndex && startIndex !== 0) ||
                    (limit !== 0 && index < endIndex)) {
                    newArr.push(item);
                }
            }
        }
        if (count <= limit && !cut) {
            if ((limit === 0 && index <= startIndex && startIndex !== 0) ||
                (limit !== 0 && index < endIndex)) {
                newArr.push(item);
            }
        }
    });
    switch (type) {
        case 'number':
            return Number(newArr.join(''));
        case 'string':
            return newArr.join('');
        default:
            return newArr;
    }
}
/**
 * @uppercase Uppercase string.
 */
export function uppercase(input, start = 0, end) {
    const output = input;
    if (typeof input === 'string') {
        // uppercase.
        return transformCaseWithRange(input, ''.toLocaleUpperCase, start, end);
    }
    return output;
}
/**
 * @lowercase LowerCase string.
 */
export function lowercase(input, start = 0, end) {
    const output = input;
    if (typeof input === 'string') {
        return transformCaseWithRange(input, ''.toLocaleLowerCase, start, end);
    }
    return output;
}
function transformCaseWithRange(input, func, start, end) {
    if (end === '') {
        end = undefined;
    }
    if (Number(start) === Number(end) && Number(start) === 0) {
        return input;
    }
    if (!start && !end) {
        return func.call(input);
    }
    if (start > end) {
        return input;
    }
    else {
        if (end < input.length) {
            return input.substring(0, start - 1) + func.call(input.substring(start - 1, end)) + input.substr(end);
        }
        const length = start ? start - 1 : 0;
        return input.substring(0, length) + func.call(input.substr(length));
    }
}
const easyFilter = {
    currency,
    date,
    orderBy,
    filter,
    number,
    limitTo,
    uppercase,
    lowercase,
};
export default {
    install(Vue, options) {
        Vue.filter('currency', currency);
        Vue.filter('date', date);
        Vue.filter('orderBy', orderBy);
        Vue.filter('filter', filter);
        Vue.filter('number', number);
        Vue.filter('limitTo', limitTo);
        Vue.filter('uppercase', uppercase);
        Vue.filter('lowercase', lowercase);
        Vue.prototype.$easyFilter = easyFilter;
        Vue.easyFilter = easyFilter;
    },
};
