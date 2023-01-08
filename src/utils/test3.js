function getFullNum (num) {
  if (isNaN(num)) { return num }
  var str = '' + num
  if (!/e/i.test(str)) { return num }
  return (num).toFixed(20).replace(/\.?0+$/, '')
}

console.log(getFullNum(9.87766e-10))