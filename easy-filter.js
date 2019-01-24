/**
 * @description This plug-in defines a portion of the Vue custom filter.
 */

/**
 * @upperCase Uppercase string.
 */
function upperCase (input) {
  let output = input
  if (typeof input === 'string') {
    // uppercase.
    output = output.toUpperCase()
  }
  return output
}
/**
 * @lowerCase LowerCase string.
 */
function lowerCase (input) {
  let output = input
  if (typeof input === 'string') {
    // lowercase.
    output = output.toLowerCase()
  }
  return output
}
/**
 * @description Interception of three digital strings.
 * @param {String} str The string to be formatted.
 */
function LastThreeDigits (str) {
  let last = str.substring(str.length - 3, str.length)
  let residual = str.substring(0, str.length - 3)
  return [last, residual]
}
/**
 * @description Three after the cut string until can't cut and returns an array of cut strings.
 * @param {String} str The string to be cut.
 * @param {Array} arr Store the container after the cut string.
 * @returns {Array} array of cut strings.
 */
function formatStrToArr (str, arr = []) {
  let strItem = LastThreeDigits(str)
  let [last, residual] = strItem
  arr.push(last)
  if (residual.length > 3) {
    return formatStrToArr(residual, arr)
  } else {
    arr.push(residual)
    return arr.reverse()
  }
}
/**
 * @currency
 * Formats a number as a currency (ie $1,234.56).
 * When no currency symbol is provided,
 * default symbol for current locale is used.
 */
function currency (input, currencySymbol = '$', digits = 2, options = {symbolOnLeft:true, separator:',', addSpace: false}) {
  let output = input
  const type = typeof input
  let {separator, symbolOnLeft, addSpace} = options
  if(symbolOnLeft === undefined){
    symbolOnLeft = true
  }
  if(separator === undefined){
    separator = ','
  }
  if(addSpace === undefined){
    addSpace = false
  }
  if (type === 'number' || type === 'string') {
    let data = input.toString()
    // Gets the position of the decimal point.
    // Decide if you're a decimal.
    if (data.indexOf('.') !== -1) {
      // If it is a decimal, separate the decimal part from the integer part.
      let numberArr = data.split('.')
      let intPart = numberArr[0]
      let decimalsPart = numberArr[1]
      // Partition the integer part.
      let cutStrArr = formatStrToArr(intPart)
      // Round the decimal part and add the thousandth.
      let int = cutStrArr.join(separator)
      let decimals = Number(decimalsPart.substring(0, digits)) + Math.floor(Number('0.' + decimalsPart.substr(digits, 1)))
      data = `${int}.${decimals}`
    } else {
      // Else, split the integer part directly.
      let cutStrArr = formatStrToArr(data)
      // Add the decimal part.
      data = `${cutStrArr.join(separator)}.00`
    }
    if(data.charAt(0)===separator) {
      data = data.substring(1,data.length)
    }
    if(addSpace){
    return symbolOnLeft ? `${currencySymbol} ${data}` : `${data} ${currencySymbol}`
    }
    return symbolOnLeft ? currencySymbol + data : data + currencySymbol
  } else {
    return output
  }
}
/**
 * @date
 * Formatted timestamp.
 */
function date (input, formatMode, country) {
  function formatTimeWithMode (time, mode, CTRY) {
    const date = new Date(time)
    const cnWeek = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    const enWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const shortCnWeek = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    const shortEnWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    mode = mode.replace(/y{1,4}|MM|dd|hh|HH|mm|ss|E{1,4}/g, function (value) {
      switch (value) {
        case 'MM': // Replace the month.
          return date.getMonth() + 1
        case 'dd': // Replace the date.
          return date.getDate()
        case 'hh': // Replace the hours (12-hour system).
          return (date.getHours() - 12).toString().padStart(2, '0')
        case 'HH': // Replace the hours (24 hour system).
          return date.getHours()
        case 'mm': // Replace the minutes.
          return date.getMinutes()
        case 'ss': // Replace the second.
          return date.getSeconds()
        default: // Replace the years and week.
          if (value.indexOf('y') !== -1) { // y{1,4} Replace the years.
            const year = date.getFullYear()
            return value.length <= 2 ? year % 100 : year
          } else { // E{1,4} Replace the week.
            const week = date.getDay()
            const weekMap = CTRY === 'cn' // Replace the week.
              ? [shortCnWeek[week], cnWeek[week]]
              : [shortEnWeek[week], enWeek[week]]
            return value.length <= 2 ? weekMap[0] : weekMap[1]
          }
      }
    })
    return mode
  }
  if (!input) { // Determine whether the input to be filtered is not present and the input is ''.
    return ''
  } else if (typeof input === 'number' || input instanceof Date) { // Determines whether the parameter is legally invalid and returns the original input.
    if(input instanceof Date){
      input = input.getTime()
    }
    if (typeof formatMode === 'string') {
      return formatTimeWithMode(input, formatMode, country)
    } else {
      return input
    }
  } else {
    return input
  }
}
/**
 * childExists
*/
function childExists (obj, match) {
  for (let key in obj) {
    let value = obj[key]
    let type = typeof value
    if (type === 'string' || type === 'number') {
      if (new RegExp(match).test(value) || value.toString().indexOf(match) !== -1) {
        return true
      }
    } else {
      return childExists(value, match)
    }
  }
  return false
}
/**
 * matchCopy
*/
function matchCopy (obj, match) {
  let newObj
  if (obj instanceof Array) {
    newObj = []
  } else {
    newObj = {}
  }
  for (let key in obj) {
    let value = obj[key]
    if (typeof value === 'object' && childExists(value, match)) {
      newObj[key] = matchCopy(value, /./)
    } else {
      if (childExists(obj, match)) {
        newObj[key] = value
      }
    }
  }
  if (newObj instanceof Array) {
    newObj = newObj.filter((valune, index, arr) => {
      // Removes empty elements in an array.
      return valune !== undefined
    })
  }
  return newObj
}

/**
 *  @filter Selects a subset of items from Object and returns it as a new Object.
*/
function filter (input, match) {
  // Filter object.
  if (!match || !input) {
    return input
  }
  function filterObj (originalObject, match) {
    let obj
    // Determine the type of object to be filtered to copy.
    if (originalObject instanceof Array) {
      obj = []
    } else if (originalObject instanceof Object) {
      obj = {}
    } else {
      return originalObject.indexOf(match) !== -1 ? originalObject : undefined
    }
    for (let item in originalObject) {
      let value = originalObject[item]
      if (typeof value === 'object') {
        // Deep copy object.
        let newObj = matchCopy(value, match)
        if (newObj instanceof Array) {
          if (newObj.length) {
            // Not an empty array can be assigned.
            obj[item] = newObj
          }
        } else {
          if (JSON.stringify(newObj) !== '{}') {
            // Not empty objects can be assigned.
            obj[item] = newObj
          }
        }
      } else {
        if (value.indexOf(match) !== -1) {
          // What is needed is saved.
          obj[item] = value
        }
      }
    }
    if (obj instanceof Array) {
      obj = obj.filter((valune, index, arr) => {
        // Removes empty elements in an array.
        return valune !== undefined
      })
    }
    return obj
  }
  if (match instanceof Function) {
    if (input instanceof Array) {
      return input.filter((value, index, array) => {
        return match(value)
      })
    } else {
      let obj = {}
      for (let key in input) {
        let value = input[key]
        if (match(value)) {
          obj[key] = value
        }
      }
      return obj
    }
  } else {
    return filterObj(input, match)
  }
}
/**
 * @json
 * Allows you to convert a JavaScript object into JSON string.
 * This filter is mostly useful for debugging.
 * When using the double curly notation the binding is automatically converted to JSON.
*/
function json (input) {
  return JSON.stringify(input)
}
/**
 * @number Format the number into a string.
 * When you pass in an integer, you will default to two decimal places,
 * and when you enter a decimal, you will round it to the nearest thousandth.
 * You can also change the exact number of digits by passing in parameters.
*/
function number (input, digits = 3) {
  let temp = input.toString()
  if (temp.indexOf('.') !== -1) {
    let numberArr = temp.split('.')
    let intPart = numberArr[0]
    let decimalPart = numberArr[1]
    let int = formatStrToArr(intPart).join(',')
    let decimal = Number(decimalPart.substring(0, digits)) + Math.round(Number(`0.${decimalPart.substr(digits, 1)}`))
    return `${int}.${decimal}`
  } else {
    let int = formatStrToArr(temp).join(',')
    return `${int}.00`
  }
}
/**
 * @limitTo
 * Creates a new array or string containing only a specified number of elements.
 * The elements are taken from either the beginning or the end of the source array,
 * string or number,
 * as specified by the value and sign (positive or negative) of limit.
*/
function limitTo (input, limit = Number.POSITIVE_INFINITY, begin = 0) {
  const type = typeof input
  switch (type) {
    case 'number':
      return input.toString().substring(begin, limit)
    case 'string':
      return input.substring(begin, limit)
    case 'object':
      if (input instanceof Array) {
        let newArr = input.concat()
        return newArr.splice(begin, limit)
      }
      return input
    default:
      return input
  }
}
// Default Comparator
function builtInComparator (v1, v2) {
  return v1 > v2
}
/**
 * @orderBy
*/
function orderBy (input, expression, reverse, comparator = builtInComparator) {
  let key
  if (expression) {
    if (expression.charAt(0) === '-') {
      reverse = true
      key = expression.substr(1)
    } else {
      key = expression
    }
    if (input instanceof Array) {
      let newArr = input.concat()
      newArr.sort((value, nextValue) => {
        return comparator(value[key], nextValue[key])
      })
      input = newArr
      if (reverse) {
        input = input.reverse()
      }
      return input
    }
  }
  return input
}

module.exports = {
  install(Vue, options) {
    /**
     * @upperCase
     */
    Vue.filter('upperCase', upperCase)
    /**
     * @lowerCase
     */
    Vue.filter('lowerCase', lowerCase)
    /**
     * @currency
     */
    Vue.filter('currency', currency)
    /**
     * @date
     */
    Vue.filter('date', date)
    /**
     *  @filter
    */
    Vue.filter('filter', filter)
    /**
     * @json
    */
    Vue.filter('json', json)
    /**
     * @number
    */
    Vue.filter('number', number)
    /**
     * @limitTo
    */
    Vue.filter('limitTo', limitTo)
    /**
     * @orderBy
    */
    Vue.filter('orderBy', orderBy)
    /**
     *Mount the filter to the prototype.
    */
    Vue.prototype.easyFilter = {
      upperCase,
      lowerCase,
      currency,
      date,
      filter,
      json,
      number,
      limitTo,
      orderBy
    }
  }
}
