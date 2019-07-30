/**
 * @currency
 * 给展示金额数字加上货币符号以及分隔符。
 * @param {NumberDate} input 输入
 * @param {String} symbol 货币符号
 * @param {Number} digits 要保留的小数位数
 * @param {CurrencyOption} options symbolOnLeft 符号位置 separator 分隔符 addSpace 是否有空格 pad 是否补零 round 四舍五入
 * @return {String} String 输出
 */
export function currency(input, symbol, digits, _a) {
    var _b;
    if (symbol === void 0) { symbol = '$'; }
    if (digits === void 0) { digits = 2; }
    var _c = _a === void 0 ? {
        symbolOnLeft: true,
        separator: ',',
        addSpace: false,
        pad: true,
        round: false
    } : _a, _d = _c.symbolOnLeft, symbolOnLeft = _d === void 0 ? true : _d, _e = _c.separator, separator = _e === void 0 ? ',' : _e, _f = _c.addSpace, addSpace = _f === void 0 ? false : _f, _g = _c.pad, pad = _g === void 0 ? true : _g, _h = _c.round, round = _h === void 0 ? false : _h;
    var digitsType = typeof digits;
    var inputType = typeof input;
    if (digitsType !== 'number') {
        digits = 2;
    }
    if (inputType !== 'number' && inputType !== 'string') {
        input = String(input);
    }
    // 转换科学计数法
    var data = sciNumToString(input);
    // 判断小数
    if (data.includes('.') && digits !== 0) {
        // 将小数部分与整数部分分开
        var numberArr = data.split('.');
        var intPart = numberArr[0];
        var decimalPart = numberArr[1];
        // 四舍五入
        var decimal = '0';
        _b = roundDecimalPart(round, intPart, decimalPart, digits), intPart = _b[0], decimal = _b[1];
        // 处理整数部分
        var int = intPart.replace(/\B(?=(?:\d{3})+(?!\d))/g, separator);
        if (numberArr[0] < intPart && pad === false) {
            data = int;
        }
        else {
            data = (int ? int : '0') + "." + (pad ? String(decimal).padEnd(digits, '0') : decimal);
        }
    }
    else {
        // 整数
        var numberArr = data.split('.');
        var intPart = numberArr[0];
        var decimalPart = numberArr[1];
        if (round && decimalPart) {
            intPart = String(Math.round(Number(input)));
        }
        // 拆分
        var int = intPart.replace(/\B(?=(?:\d{3})+(?!\d))/g, separator);
        // 添加小数部分
        data = "" + (int ? int : '0') + (pad ? '.'.padEnd(digits + 1, '0') : '');
        if (digits <= 0) {
            data = "" + int;
        }
    }
    if (data.charAt(0) === separator) {
        data = data.substring(1, data.length);
    }
    if (addSpace) {
        return symbolOnLeft
            ? symbol + " " + data
            : data + " " + symbol;
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
    var str = String(num).toLowerCase();
    if (isNaN(Number(str))) {
        return str;
    }
    if (!str.includes('e')) {
        return str;
    }
    var symbol = str.charAt(0) === '-' ? '-' : '';
    if (str.includes('e-')) {
        var _a = str.split('e-'), val = _a[0], power = _a[1];
        var valArr = val.replace('-', '').split('.');
        var left = valArr[0];
        var right = valArr[1];
        left = left.padStart(Number(power) + 1, '0');
        return (symbol +
            left.charAt(0) +
            '.' +
            left.substring(1, left.length) +
            (right ? right : ''));
    }
    else if (str.includes('e')) {
        var strArr = str.split('e');
        var val = strArr[0];
        var power = strArr[1];
        var _b = val.replace('-', '').split('.'), left = _b[0], right = _b[1];
        right = right
            ? right
            : ((power = String(+power + 1)), (right = left), (left = ''), right);
        right = right.padEnd(Number(power), '0');
        return symbol + left + (right ? right : '');
    }
    return String(num);
}
function plus(num1, num2) {
    var others = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        others[_i - 2] = arguments[_i];
    }
    if (others.length > 0) {
        return plus.apply(void 0, [plus(num1, num2), others[0]].concat(others.slice(1)));
    }
    var baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)));
    return (times(num1, baseNum) + times(num2, baseNum)) / baseNum;
}
function digitLength(num) {
    // Get digit length of e
    var eSplit = num.toString().split(/[eE]/);
    var len = (eSplit[0].split('.')[1] || '').length - +(eSplit[1] || 0);
    return len > 0 ? len : 0;
}
function times(num1, num2) {
    var others = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        others[_i - 2] = arguments[_i];
    }
    if (others.length > 0) {
        return times.apply(void 0, [times(num1, num2), others[0]].concat(others.slice(1)));
    }
    var num1Changed = float2Fixed(num1);
    var num2Changed = float2Fixed(num2);
    var baseNum = digitLength(num1) + digitLength(num2);
    var leftValue = num1Changed * num2Changed;
    return leftValue / Math.pow(10, baseNum);
}
function float2Fixed(num) {
    if (num.toString().indexOf('e') === -1) {
        return Number(num.toString().replace('.', ''));
    }
    var dLen = digitLength(num);
    return dLen > 0 ? strip(num * Math.pow(10, dLen)) : num;
}
function strip(num, precision) {
    if (precision === void 0) {
        precision = 12;
    }
    var dLen = digitLength(num);
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
    var decimal = '';
    if (round) {
        var reservedPortion = decimalPart.substr(0, digits);
        var roundPart = Number(decimalPart.substr(digits, 1));
        if (roundPart >= 5) {
            decimal = String(plus(Number("0." + reservedPortion), Number(digits ? "0." + '1'.padStart(digits, '0') : '1')));
            if (Number(decimal) >= 1) {
                intPart = String(Number(intPart) + 1);
                decimal = '0';
            }
            else {
                decimal = ("" + decimal).substr(2, digits);
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
export function date(input, formatMode, option) {
    if (formatMode === void 0) { formatMode = 'yyyy/MM/dd HH:mm:ss EEE'; }
    if (option === void 0) { option = 'en'; }
    if (navigator.userAgent.includes('Safari')) {
        if (typeof input === 'string') {
            input = input.replace(/-/g, '/');
        }
    }
    function formatTimeWithMode(time, mode, opt) {
        var dateData = new Date(time);
        var optionType = typeof opt;
        var options = {
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
                shortWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']
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
                ]
            }
        };
        var week;
        var shortWeek;
        if (optionType === 'string') {
            week = options[opt].week;
            shortWeek = options[opt].shortWeek;
        }
        else if (optionType === 'object') {
            week = opt.week || [];
            shortWeek = opt.shortWeek || [];
        }
        else {
            var log = 'date option type must be string or DateOption. (see: https://pschina.github.io/easy-filter/zh/date/#date)';
            throw new TypeError(log);
        }
        mode = mode.replace(/y{1,4}|MM|dd|hh|HH|mm|ss|E{1,4}/g, function (value) {
            switch (value) {
                case 'MM': // Replace the month.
                    return ("" + (dateData.getMonth() + 1)).padStart(2, '0');
                case 'dd': // Replace the date.
                    return ("" + dateData.getDate()).padStart(2, '0');
                case 'hh': // Replace the hours (12-hour system).
                    var hours = dateData.getHours();
                    if (hours > 12) {
                        return ("" + (hours - 12)).padStart(2, '0');
                    }
                    return ("" + hours).padStart(2, '0');
                case 'HH': // Replace the hours (24 hour system).
                    return ("" + dateData.getHours()).padStart(2, '0');
                case 'mm': // Replace the minutes.
                    return ("" + dateData.getMinutes()).padStart(2, '0');
                case 'ss': // Replace the second.
                    return ("" + dateData.getSeconds()).padStart(2, '0');
                default:
                    // Replace the years and week.
                    if (value.includes('y')) {
                        // y{1,4} Replace the years.
                        var year = dateData.getFullYear();
                        return value.length <= 2 ? String(year % 100) : String(year);
                    }
                    else {
                        // E{1,4} Replace the week.
                        var weekDay = dateData.getDay();
                        var weekMap = [week[weekDay], shortWeek[weekDay]];
                        return value.length <= 2 ? weekMap[1] : weekMap[0];
                    }
            }
        });
        return mode;
    }
    if (!input) {
        // Determine whether the input to be filtered is not present and the input is ''.
        return '';
    }
    else {
        var old = input;
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
// Default Comparator
var builtInComparator = function (item1, item2, key, reverse) { return item1[key] > item2[key] ?
    (reverse ? -1 : 1)
    :
        (reverse ? 1 : -1); };
/**
 * @orderBy
 */
export function orderBy(input, expression, reverse, comparator) {
    if (comparator === void 0) { comparator = builtInComparator; }
    var key;
    var expressionType = typeof expression;
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
        var newArr = input.concat();
        newArr = newArr.sort(function (value, nextValue) {
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
        var obj;
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
        for (var key in originalObject) {
            if (originalObject.hasOwnProperty(key)) {
                var value = originalObject[key];
                if (typeof value === 'object') {
                    // Deep copy object.
                    var newObj = matchCopy(value, match, ignore);
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
            obj = obj.filter(function (item) { return item !== undefined; });
        }
        return obj;
    }
    if (matchOptions instanceof Function) {
        return matchFunc(input, matchOptions);
    }
    else if (typeof matchOptions === 'object') {
        var ignore = matchOptions.ignore, match = matchOptions.match;
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
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            var value = obj[key];
            var type = typeof value;
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
    var newObj;
    if (obj instanceof Array) {
        newObj = [];
    }
    else {
        newObj = {};
    }
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            var value = obj[key];
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
        newObj = newObj.filter(function (item) { return item !== undefined; });
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
        return input.filter(function (value) {
            return matchOptions(value);
        });
    }
    else {
        var obj = {};
        for (var key in input) {
            if (input.hasOwnProperty(key)) {
                var value = input[key];
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
export function number(input, digits, options) {
    var _a;
    if (digits === void 0) { digits = 8; }
    if (options === void 0) { options = { round: false, pad: false, sign: false, separator: '' }; }
    if (isNaN(Number(input))) {
        return String(input);
    }
    var round = options.round, pad = options.pad, sign = options.sign, separator = options.separator;
    if (isEmpty(input)) {
        return pad ? "0." + '0'.padEnd(digits, '0') : '0';
    }
    if (Number(input) === 0 && typeof sign === 'object') {
        input = sign.zero + "0";
    }
    var temp = sciNumToString(input);
    var int = temp.replace(/\B(?=(?:\d{3})+(?!\d))/g, separator);
    var decimal = digits ? '0' : false;
    if (temp.includes('.')) {
        var numberArr = temp.split('.');
        var intPart = numberArr[0];
        var decimalPart = numberArr[1];
        _a = roundDecimalPart(round, intPart, decimalPart, digits), intPart = _a[0], decimal = _a[1];
        int = intPart.replace(/\B(?=(?:\d{3})+(?!\d))/g, separator);
    }
    if (input > 0 && sign) {
        int = "+" + int;
    }
    if (!digits) {
        return String(int);
    }
    if (pad) {
        return "" + int + (decimal ? "." + decimal.padEnd(digits, '0') : '');
    }
    else {
        return decimal ? int + "." + decimal : int;
    }
}
/**
 * @limitTo
 * Creates a new array or string containing only a specified number of elements.
 * The elements are taken from either the beginning or the end of the source array,
 * string or number,
 * as specified by the value and sign (positive or negative) of limit.
 */
export function limitTo(input, limit, option) {
    if (limit === void 0) { limit = Number.POSITIVE_INFINITY; }
    if (option === void 0) { option = { startWithIndex: 0, cut: false }; }
    var startWith = option.startWith, ignore = option.ignore, cut = option.cut;
    var startWithIndex = option.startWithIndex;
    if (startWithIndex === undefined) {
        startWithIndex = 0;
    }
    var type = typeof input;
    switch (type) {
        case 'string': {
            var arrayData = input.split('');
            var itemIndex = arrayData.indexOf(startWith);
            var startIndex = itemIndex === -1 ? startWithIndex : itemIndex;
            return getOutput(arrayData, { startIndex: startIndex, limit: limit, ignore: ignore, type: type, cut: cut });
        }
        case 'number': {
            var arrayData = (input).toString().split('');
            var itemIndex = arrayData.indexOf(startWith);
            var startIndex = itemIndex === -1 ? startWithIndex : itemIndex;
            return getOutput(arrayData, {
                startIndex: startIndex,
                limit: limit,
                ignore: ignore,
                type: type,
                cut: cut
            });
        }
        default: {
            if (input instanceof Array) {
                var arrayData = input.concat();
                var itemIndex = arrayData.indexOf(startWith);
                var startIndex = itemIndex === -1 ? startWithIndex : itemIndex;
                return getOutput(arrayData, {
                    startIndex: startIndex,
                    limit: limit,
                    ignore: ignore,
                    type: type,
                    cut: cut
                });
            }
            return input;
        }
    }
}
function getOutput(array, option) {
    var startIndex = option.startIndex, limit = option.limit, ignore = option.ignore, type = option.type, cut = option.cut;
    var endIndex = startIndex + Number(limit);
    var newArr = [];
    var count = 0;
    array.forEach(function (item, index) {
        if (index >= startIndex && index < endIndex) {
            var regExp = new RegExp(ignore ? ignore : '');
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
export function uppercase(input, start, end) {
    if (start === void 0) { start = 0; }
    var output = input;
    if (typeof input === 'string') {
        // uppercase.
        return transformCaseWithRange(input, ''.toLocaleUpperCase, start, end);
    }
    return output;
}
/**
 * @lowercase LowerCase string.
 */
export function lowercase(input, start, end) {
    if (start === void 0) { start = 0; }
    var output = input;
    if (typeof input === 'string') {
        return transformCaseWithRange(input, ''.toLocaleLowerCase, start, end);
    }
    return output;
}
function transformCaseWithRange(input, func, start, end) {
    if (Number(start) === Number(end) && Number(start) === 0) {
        return input;
    }
    if (start) {
        if (end) {
            return input.substring(0, start) + func.call(input.substring(start, end + 1)) + input.substr(end + 1);
        }
        return input.substring(0, start) + func.call(input.substr(start));
    }
    if (end) {
        return func.call(input.substring(0, end + 1)) + input.substr(end + 1);
    }
    return func.call(input);
}
var easyFilter = {
    currency: currency,
    date: date,
    orderBy: orderBy,
    filter: filter,
    number: number,
    limitTo: limitTo,
    uppercase: uppercase,
    lowercase: lowercase
};
export default {
    install: function (Vue, options) {
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
    }
};