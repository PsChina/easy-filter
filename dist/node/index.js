"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.currency = currency;
exports.date = date;
exports.orderBy = orderBy;
exports.filter = filter;
exports.number = number;
exports.limitTo = limitTo;
exports.uppercase = uppercase;
exports.lowercase = lowercase;
exports.default = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * @currency
 * 给展示金额数字加上货币符号以及分隔符。
 * @param {NumberDate} input 输入
 * @param {String} symbol 货币符号
 * @param {Number} digits 要保留的小数位数
 * @param {CurrencyOption} options symbolOnLeft 符号位置 separator 分隔符 addSpace 是否有空格 pad 是否补零 round 四舍五入
 * @return {String} String 输出
 */
function currency(input) {
  var symbol = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '$';
  var digits = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;

  var _ref = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {
    symbolOnLeft: true,
    separator: ',',
    addSpace: false,
    pad: true,
    round: false
  },
      _ref$symbolOnLeft = _ref.symbolOnLeft,
      symbolOnLeft = _ref$symbolOnLeft === void 0 ? true : _ref$symbolOnLeft,
      _ref$separator = _ref.separator,
      separator = _ref$separator === void 0 ? ',' : _ref$separator,
      _ref$addSpace = _ref.addSpace,
      addSpace = _ref$addSpace === void 0 ? false : _ref$addSpace,
      _ref$pad = _ref.pad,
      pad = _ref$pad === void 0 ? true : _ref$pad,
      _ref$round = _ref.round,
      round = _ref$round === void 0 ? false : _ref$round;

  var digitsType = _typeof(digits);

  var inputType = _typeof(input);

  if (digitsType !== 'number') {
    digits = 2;
  }

  if (inputType !== 'number' && inputType !== 'string') {
    input = String(input);
  } // 转换科学计数法


  var data = sciNumToString(input); // 判断小数

  if (data.includes('.') && digits !== 0) {
    // 将小数部分与整数部分分开
    var numberArr = data.split('.');
    var intPart = numberArr[0];
    var decimalPart = numberArr[1]; // 四舍五入

    var decimal = '0';

    var _roundDecimalPart = roundDecimalPart(round, intPart, decimalPart, digits);

    var _roundDecimalPart2 = _slicedToArray(_roundDecimalPart, 2);

    intPart = _roundDecimalPart2[0];
    decimal = _roundDecimalPart2[1];
    // 处理整数部分
    var int = intPart.replace(/\B(?=(?:\d{3})+(?!\d))/g, separator);

    if (numberArr[0] < intPart && pad === false) {
      data = int;
    } else {
      data = "".concat(int ? int : '0', ".").concat(pad ? String(decimal).padEnd(digits, '0') : decimal);
    }
  } else {
    // 整数
    var _numberArr = data.split('.');

    var _intPart = _numberArr[0];
    var _decimalPart = _numberArr[1];

    if (round && _decimalPart) {
      _intPart = String(Math.round(Number(input)));
    } // 拆分


    var _int = _intPart.replace(/\B(?=(?:\d{3})+(?!\d))/g, separator); // 添加小数部分


    data = "".concat(_int ? _int : '0').concat(pad ? '.'.padEnd(digits + 1, '0') : '');

    if (digits <= 0) {
      data = "".concat(_int);
    }
  }

  if (data.charAt(0) === separator) {
    data = data.substring(1, data.length);
  }

  if (addSpace) {
    return symbolOnLeft ? "".concat(symbol, " ").concat(data) : "".concat(data, " ").concat(symbol);
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
    var _str$split = str.split('e-'),
        _str$split2 = _slicedToArray(_str$split, 2),
        val = _str$split2[0],
        power = _str$split2[1];

    var valArr = val.replace('-', '').split('.');
    var left = valArr[0];
    var right = valArr[1];
    left = left.padStart(Number(power) + 1, '0');
    return symbol + left.charAt(0) + '.' + left.substring(1, left.length) + (right ? right : '');
  } else if (str.includes('e')) {
    var strArr = str.split('e');
    var _val = strArr[0];
    var _power = strArr[1];

    var _val$replace$split = _val.replace('-', '').split('.'),
        _val$replace$split2 = _slicedToArray(_val$replace$split, 2),
        _left = _val$replace$split2[0],
        _right = _val$replace$split2[1];

    _right = _right ? _right : (_power = String(+_power + 1), _right = _left, _left = '', _right);
    _right = _right.padEnd(Number(_power), '0');
    return symbol + _left + (_right ? _right : '');
  }

  return String(num);
}

function plus(num1, num2) {
  for (var _len = arguments.length, others = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    others[_key - 2] = arguments[_key];
  }

  if (others.length > 0) {
    return plus.apply(void 0, [plus(num1, num2), others[0]].concat(_toConsumableArray(others.slice(1))));
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
  for (var _len2 = arguments.length, others = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
    others[_key2 - 2] = arguments[_key2];
  }

  if (others.length > 0) {
    return times.apply(void 0, [times(num1, num2), others[0]].concat(_toConsumableArray(others.slice(1))));
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
      decimal = String(plus(Number("0.".concat(reservedPortion)), Number(digits ? "0.".concat('1'.padStart(digits, '0')) : '1')));

      if (Number(decimal) >= 1) {
        intPart = String(Number(intPart) + 1);
        decimal = '0';
      } else {
        decimal = "".concat(decimal).substr(2, digits);
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


function date(input) {
  var formatMode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy/MM/dd HH:mm:ss EEE';
  var option = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'en';

  if (navigator.userAgent.includes('Safari')) {
    if (typeof input === 'string') {
      input = input.replace(/-/g, '/');
    }
  }

  function formatTimeWithMode(time, mode, opt) {
    var dateData = new Date(time);

    var optionType = _typeof(opt);

    var options = {
      en: {
        week: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        shortWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']
      },
      cn: {
        week: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        shortWeek: ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
      }
    };
    var week;
    var shortWeek;

    if (optionType === 'string') {
      week = options[opt].week;
      shortWeek = options[opt].shortWeek;
    } else if (optionType === 'object') {
      week = opt.week || [];
      shortWeek = opt.shortWeek || [];
    } else {
      var log = 'date option type must be string or DateOption. (see: https://pschina.github.io/easy-filter/zh/date/#date)';
      throw new TypeError(log);
    }

    mode = mode.replace(/y{1,4}|MM|dd|hh|HH|mm|ss|E{1,4}/g, function (value) {
      switch (value) {
        case 'MM':
          // Replace the month.
          return "".concat(dateData.getMonth() + 1).padStart(2, '0');

        case 'dd':
          // Replace the date.
          return "".concat(dateData.getDate()).padStart(2, '0');

        case 'hh':
          // Replace the hours (12-hour system).
          var hours = dateData.getHours();

          if (hours > 12) {
            return "".concat(hours - 12).padStart(2, '0');
          }

          return "".concat(hours).padStart(2, '0');

        case 'HH':
          // Replace the hours (24 hour system).
          return "".concat(dateData.getHours()).padStart(2, '0');

        case 'mm':
          // Replace the minutes.
          return "".concat(dateData.getMinutes()).padStart(2, '0');

        case 'ss':
          // Replace the second.
          return "".concat(dateData.getSeconds()).padStart(2, '0');

        default:
          // Replace the years and week.
          if (value.includes('y')) {
            // y{1,4} Replace the years.
            var year = dateData.getFullYear();
            return value.length <= 2 ? String(year % 100) : String(year);
          } else {
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
  } else {
    var old = input;
    input = new Date(input); // Determines whether the parameter is legally invalid and returns the original input.

    if (input.toString() === 'Invalid Date') {
      return old;
    }

    if (typeof formatMode === 'string') {
      return formatTimeWithMode(input, formatMode, option);
    } else {
      return input;
    }
  }
} // Default Comparator


var builtInComparator = function builtInComparator(item1, item2, key, reverse) {
  return item1[key] > item2[key] ? reverse ? -1 : 1 : reverse ? 1 : -1;
};
/**
 * @orderBy
 */


function orderBy(input, expression, reverse) {
  var comparator = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : builtInComparator;
  var key;

  var expressionType = _typeof(expression);

  if (expressionType === 'string') {
    if (expression.charAt(0) === '-') {
      reverse = true;
      key = expression.substr(1);
    } else {
      key = expression;
    }
  } else if (expressionType === 'function') {
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


function filter(input, matchOptions) {
  // Filter object.
  if (!matchOptions || !input) {
    return input;
  }

  function filterObj(originalObject, match, ignore) {
    var obj; // Determine the type of object to be filtered to copy.

    if (originalObject instanceof Array) {
      obj = [];
    } else if (originalObject instanceof Object) {
      obj = {};
    } else {
      return originalObject.includes(match) ? originalObject : undefined;
    }

    for (var key in originalObject) {
      if (originalObject.hasOwnProperty(key)) {
        var value = originalObject[key];

        if (_typeof(value) === 'object') {
          // Deep copy object.
          var newObj = matchCopy(value, match, ignore);

          if (newObj instanceof Array) {
            if (newObj.length) {
              // Not an empty array can be assigned.
              obj[key] = newObj;
            }
          } else {
            if (Object.keys(newObj).length > 0) {
              // Not empty objects can be assigned.
              obj[key] = newObj;
            }
          }
        } else {
          if (value.includes(match)) {
            // What is needed is saved.
            obj[key] = value;
          }
        }
      }
    }

    if (obj instanceof Array) {
      obj = obj.filter(function (item) {
        return item !== undefined;
      });
    }

    return obj;
  }

  if (matchOptions instanceof Function) {
    return matchFunc(input, matchOptions);
  } else if (_typeof(matchOptions) === 'object') {
    var ignore = matchOptions.ignore,
        match = matchOptions.match;

    if (match instanceof Function) {
      return matchFunc(input, match);
    } else {
      return filterObj(input, match, [ignore].flat());
    }
  } else {
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

      var type = _typeof(value);

      if (type === 'string' || type === 'number') {
        if (new RegExp(match, 'ig').test(value) || value.toString().includes(match)) {
          if (ignore instanceof Array) {
            if (!ignore.includes(key)) {
              return true;
            }
          } else {
            return true;
          }
        }
      } else {
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
  } else {
    newObj = {};
  }

  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      var value = obj[key];

      if (_typeof(value) === 'object' && childExists(value, match, ignore)) {
        newObj[key] = matchCopy(value, '');
      } else {
        if (childExists(obj, match, ignore)) {
          newObj[key] = value;
        }
      }
    }
  }

  if (newObj instanceof Array) {
    newObj = newObj.filter(function (item) {
      return item !== undefined;
    });
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
  } else {
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
  return val === undefined || val === '' || val === null || JSON.stringify(val) === '[]' || JSON.stringify(val) === '{}';
}

function number(input) {
  var digits = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 8;
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    round: false,
    pad: false,
    sign: false,
    separator: ''
  };

  if (isNaN(Number(input))) {
    return String(input);
  }

  var round = options.round,
      pad = options.pad,
      sign = options.sign,
      separator = options.separator;

  if (isEmpty(input)) {
    return pad ? "0.".concat('0'.padEnd(digits, '0')) : '0';
  }

  if (Number(input) === 0 && _typeof(sign) === 'object') {
    input = "".concat(sign.zero, "0");
  }

  var temp = sciNumToString(input);
  var int = temp.replace(/\B(?=(?:\d{3})+(?!\d))/g, separator || '');
  var decimal = digits ? '0' : false;

  if (temp.includes('.')) {
    var numberArr = temp.split('.');
    var intPart = numberArr[0];
    var decimalPart = numberArr[1];

    var _roundDecimalPart3 = roundDecimalPart(Boolean(round), intPart, decimalPart, digits);

    var _roundDecimalPart4 = _slicedToArray(_roundDecimalPart3, 2);

    intPart = _roundDecimalPart4[0];
    decimal = _roundDecimalPart4[1];
    int = intPart.replace(/\B(?=(?:\d{3})+(?!\d))/g, separator || '');
  }

  if (input > 0 && sign) {
    int = "+".concat(int);
  }

  if (!digits) {
    return String(int);
  }

  if (pad) {
    return "".concat(int).concat(decimal ? ".".concat(decimal.padEnd(digits, '0')) : '');
  } else {
    return decimal ? "".concat(int, ".").concat(decimal) : int;
  }
}
/**
 * @limitTo
 * Creates a new array or string containing only a specified number of elements.
 * The elements are taken from either the beginning or the end of the source array,
 * string or number,
 * as specified by the value and sign (positive or negative) of limit.
 */


function limitTo(input) {
  var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Number.POSITIVE_INFINITY;
  var option = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    startWithIndex: 0,
    cut: false
  };
  var startWith = option.startWith,
      ignore = option.ignore,
      cut = option.cut;
  var startWithIndex = option.startWithIndex;

  if (startWithIndex === undefined) {
    startWithIndex = 0;
  }

  var type = _typeof(input);

  switch (type) {
    case 'string':
      {
        var arrayData = input.split('');
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

    case 'number':
      {
        var _arrayData = input.toString().split('');

        var _itemIndex = _arrayData.indexOf(startWith);

        var _startIndex = _itemIndex === -1 ? startWithIndex : _itemIndex;

        return getOutput(_arrayData, {
          startIndex: _startIndex,
          limit: limit,
          ignore: ignore,
          type: type,
          cut: cut
        });
      }

    default:
      {
        if (input instanceof Array) {
          var _arrayData2 = input.concat();

          var _itemIndex2 = _arrayData2.indexOf(startWith);

          var _startIndex2 = _itemIndex2 === -1 ? startWithIndex : _itemIndex2;

          return getOutput(_arrayData2, {
            startIndex: _startIndex2,
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
  var startIndex = option.startIndex,
      limit = option.limit,
      ignore = option.ignore,
      type = option.type,
      cut = option.cut;
  var endIndex = startIndex + Number(limit);
  var newArr = [];
  var count = 0;
  array.forEach(function (item, index) {
    if (index >= startIndex && index < endIndex) {
      var regExp = new RegExp(ignore ? ignore : '');

      if (!ignore) {
        count++;
      } else if (!regExp.test(item)) {
        count++;
        endIndex++;
      }

      if (count <= limit && cut) {
        if (limit === 0 && index <= startIndex && startIndex !== 0 || limit !== 0 && index < endIndex) {
          newArr.push(item);
        }
      }
    }

    if (count <= limit && !cut) {
      if (limit === 0 && index <= startIndex && startIndex !== 0 || limit !== 0 && index < endIndex) {
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


function uppercase(input) {
  var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var end = arguments.length > 2 ? arguments[2] : undefined;
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


function lowercase(input) {
  var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var output = input;

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
  } else {
    if (end < input.length) {
      return input.substring(0, start - 1) + func.call(input.substring(start - 1, end)) + input.substr(end);
    }

    var length = start ? start - 1 : 0;
    return input.substring(0, length) + func.call(input.substr(length));
  }
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
var _default = {
  install: function install(Vue, options) {
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
exports.default = _default;