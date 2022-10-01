
const DATE_REG = /(?:19|20)\d{2}(?:(?:(?:0[13578]|1[02])(?:0[1-9]|[12]\d|3[01]))|(?:(?:0[469]|11)(?:0[1-9]|[12]\d|30))|(?:02(?:0[1-9]|[1]\d|2\d)))|(?:19|20)\d{2}(?:[-/])(?:(?:(?:0[13578]|1[02])(?:[-/])(?:0[1-9]|[12]\d|3[01]))|(?:(?:0[469]|11)(?:[-/])(?:0[1-9]|[12]\d|30))|(?:02(?:[-/])(?:0[1-9]|[1]\d|2\d)))/

const intArr = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
const strArr = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']

const provinceCodeEnum = {
  11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林",
  23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西",
  37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南",
  50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃",
  63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 "

}

/**
 * 验证是否18位数字身份证号
 * @param {sting} card 身份证号
 * @returns {boolean}
 */
function validCardNo (card) {
  var reg = /^\d{17}(?:\d|X)$/i
  if (reg.test(card) === false) {
    return false;
  }
  return true
}

/**
 * 验证身份证前两位省份信息
 * @param {string} card 身份证号
 * @returns {boolean}
 */
function checkProvince (card) {
  var province = card.substring(0, 2);
  if (!provinceCodeEnum[province]) {
    return false;
  }
  return true;
}

function checkDate (card) {
  var date = card.slice(6, 14)
  if (!DATE_REG.test(date)) {
    ß
    return false
  } else {
    const year = date.slice(0, 4)
    const month = date.slice(4, 6)
    const day = +date.slice(6)
    if (month === '2' && !isLeapYear(year) && day > 28) {
      return false
    }
    return true
  }
}


function checkLastInt (card) {
  let cardTemp = 0
  let i
  let validateNum
  for (i = 0; i < 17; i++) {
    cardTemp += card.slice(i, i+1) * intArr[i]
  }
  validateNum = strArr[cardTemp % 11]
  if (validateNum === card.slice(17)) {
    return true
  }
  return false
}

/**
 * 验证是否有效身份证号
 * @param {string} card:身份证号　
 * @returns {boolean} 是否验证通过
 */
export function validCard (card) {
  let pass = true
  pass = validCardNo(card)
  pass && (pass = checkProvince(card))
  pass && (pass = checkDate(card))
  pass && (pass = checkLastInt(card))
  return pass
}

/**
 *  判断是否是闰年
 * @param {string|number} year 
 * @returns 
 */
export function isLeapYear (year) {
  if (!year) return false
  let num = Number(year)
  return (num % 4 === 0 && num % 100 !== 0) || num % 400 === 0
}
