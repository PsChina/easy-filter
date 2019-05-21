/**
 * @description This plug-in defines a portion of the Vue custom filter.
 */
function isEmpty (val){
  return val === undefined || val === '' || val === null || JSON.stringify(val) === '[]' || JSON.stringify(val) === '{}'
}
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
    arr = arr.filter(item=>item)
    return arr.reverse()
  }
}
/**
 * @currency
 * Formats a number as a currency (ie $1,234.56).
 * When no currency symbol is provided,
 * default symbol for current locale is used.
 */
function currency (input, currencySymbol = '$', digits = 2, options = {symbolOnLeft:true, separator:',', addSpace: false, pad: true, round:false}) {
  let output = input
  const type = typeof input
  let {separator, symbolOnLeft, addSpace, pad, round} = options
  if(pad === undefined){
    pad = true
  }
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
    if (data.indexOf('.') !== -1 && digits != 0) {
      // If it is a decimal, separate the decimal part from the integer part.
      let numberArr = data.split('.')
      let intPart = numberArr[0]
      let decimalsPart = numberArr[1]
      let decimals = Number(decimalsPart.substring(0, digits)) + (round ? Math.round(Number('0.' + decimalsPart.substr(digits, 1))) : Math.floor(Number('0.' + decimalsPart.substr(digits, 1))) )
      if(String(decimals).length>digits){
        intPart = String(Number(intPart) + 1)
        decimals = 0
      }
      // Partition the integer part.
      let cutStrArr = formatStrToArr(intPart)
      // Round the decimal part and add the thousandth.
      let int
      if(cutStrArr.includes('-')) {
        int = `-${ cutStrArr.filter(item=>item!=='-').join(separator) }`
      } else {
        int = cutStrArr.join(separator)
      }
      data = `${int}.${ pad ? String(decimals).padEnd(digits,'0') : decimals }`
    } else {
      let numberArr = data.split('.')
      let intPart = numberArr[0]
      let decimalsPart = numberArr[1]
      if(round&&decimalsPart){
        intPart = String( Math.round(input) )
      }
      // Else, split the integer part directly.
      let cutStrArr = formatStrToArr(intPart)
      let int
      if(cutStrArr.includes('-')) {
        int = `-${ cutStrArr.filter(item=>item!=='-').join(separator) }`
      } else {
        int = cutStrArr.join(separator)
      }
      // Add the decimal part.
      data = `${int}${ pad ? '.'.padEnd(digits+1,'0') : '' }`
      if(digits <= 0){
        data = `${int}`
      }
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
    const shortEnWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']
    mode = mode.replace(/y{1,4}|MM|dd|hh|HH|mm|ss|E{1,4}/g, function (value) {
      switch (value) {
        case 'MM': // Replace the month.
          return `${date.getMonth() + 1}`.padStart(2, 0)
        case 'dd': // Replace the date.
          return `${date.getDate()}`.padStart(2, 0)
        case 'hh': // Replace the hours (12-hour system).
          return `${date.getHours() - 12}`.padStart(2, 0)
        case 'HH': // Replace the hours (24 hour system).
          return `${date.getHours()}`.padStart(2, 0)
        case 'mm': // Replace the minutes.
          return `${date.getMinutes()}`.padStart(2, 0)
        case 'ss': // Replace the second.
          return `${date.getSeconds()}`.padStart(2, 0)
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
 * When you pass in an integer, you will default to one decimal places,
 * and when you enter a decimal, you will get its string.
 * You can also change the exact number of digits by passing in parameters.
 * And set options parameters to determine whether you want to round, and fill in zeros.
 * @param1 input
 * @param2 digits
 * @param3 options {round:false, pad:false}
*/
function number (input, digits = 3, options = {round:false, pad:false}) {
  const {round, pad} = options
  if( isEmpty(input) ){
    return pad ? `0.${'0'.padEnd(digits,'0')}` : '0'
  }
  let temp = sciNumToString(input)
  let int = sciNumToString(input)
  let decimal = digits ? '0' : false
  if (temp.indexOf('.') !== -1) {
    let numberArr = temp.split('.')
    let intPart = numberArr[0]
    let decimalPart = numberArr[1]
    if(round){
      decimal = Number(decimalPart.substring(0, digits)) + Math.round(Number(`0.${decimalPart.substr(digits, 1)}`))
      decimal = String(decimal)
      if(decimal.length > digits){
        intPart = String(Number(intPart) + 1) 
        decimal = '0'
      }
    } else {
      decimal = String(decimalPart.substring(0, digits))
    }
    let cutStrArr = formatStrToArr(intPart)
    if(cutStrArr.includes('-')) {
      int = `-${ cutStrArr.filter(item=>item!=='-').join(',') }`
    } else {
      int = cutStrArr.join(',')
    }
  }
  return pad ? `${int}${decimal?`.${decimal.padEnd(digits,'0')}`:''}` : (decimal ? `${int}.${decimal}` : int)
}
/** 
 * @sciNumToString
 * Converts scientific notation to a string.
*/
function sciNumToString(num){
  if(num === 0){
      if(1/num !== 1/0){
          num = '-0'
      }
  }
  const string = String(num)
  if(string.indexOf('e')===-1){
      return string
  }
  const symbol = string.charAt(0)==='-' ? '-' : ''
  if(string.indexOf('e-')!==-1){
    const [val,power] = string.split('e-')
    let [left,right] = val.replace('-','').split('.')
    left = left.padStart(Number(power)+1,'0')
    return symbol + left.charAt(0)+ '.' +left.substring(1,left.length) + (right ? right:'')
  }else if(string.indexOf('e')!==-1){
    const [val,power] = string.split('e')
    let [left,right] = val.replace('-','').split('.')
    right = right.padEnd(Number(power),'0')
    return symbol + left  + (right ? right:'')
  }
}

/**
 * @limitTo
 * Creates a new array or string containing only a specified number of elements.
 * The elements are taken from either the beginning or the end of the source array,
 * string or number,
 * as specified by the value and sign (positive or negative) of limit.
*/
function limitTo(input, limit = Number.POSITIVE_INFINITY, {startWithIndex = 0, startWith, ignore, cutOut = false}={}) {
  const type = typeof input
  switch (type) {
    case 'string': {
      const arrayData = input.split('')
      const itemIndex = arrayData.indexOf(startWith)
      const startIndex = itemIndex === -1 ? startWithIndex : itemIndex
      return getOutput(arrayData, {startIndex, limit, ignore, type, cutOut})
    }
    default: {
      if (input instanceof Array) {
        const arrayData = input.concat()
        const itemIndex = arrayData.indexOf(startWith)
        const startIndex = itemIndex === -1 ? startWithIndex : itemIndex
        return getOutput(arrayData, {startIndex, limit, ignore, type, cutOut})
      } else {
        if(type === 'number' || input !== undefined && input !== null && 'toString' in input){
          const arrayData = input.toString().split('')
          const itemIndex = arrayData.indexOf(startWith)
          const startIndex = itemIndex === -1 ? startWithIndex : itemIndex
          return getOutput(arrayData, {startIndex, limit, ignore, type, cutOut})
        }
        return input
      }
    }
  }
}

function getOutput(array, {startIndex, limit, ignore, type, cutOut}) {
  let endIndex = startIndex + Number(limit)
  const newArr = []
  let count = 0
  array.forEach((item, index)=>{
    if (index>=startIndex && index<endIndex) {
      const regExp = new RegExp(ignore)
      if (!ignore) {
        count++
      } else if (!regExp.test(item)) {
        count++
        endIndex++
      }
      if (count<=limit&&cutOut) {
        if (limit===0 && index<=startIndex && startIndex!==0 || limit!==0 && index<endIndex) {
          newArr.push(item)
        }
      }
    }
    if (count<=limit&&!cutOut) {
      if (limit===0 && index<=startIndex && startIndex!==0 || limit!==0 && index<endIndex) {
        newArr.push(item)
      }
    }
  })
  switch (type) {
    case 'number':
      return Number(newArr.join(''))
    case 'string':
      return newArr.join('')
    default:
      return newArr
  }
}
// Default Comparator
function builtInComparator (v1, v2) {
  if(typeof v1 === 'string' && typeof v1 === 'string'){
    return v1 > v2 ? 1 : -1
  }
  return v1 - v2
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
      window._newArr = newArr
      newArr = newArr.sort((value, nextValue) => {
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
