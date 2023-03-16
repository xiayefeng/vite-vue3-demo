/*
 * @Author: Anyuxuan xiayu_12@yeah.net
 * @Date: 2022-07-24 00:27:49
 * @LastEditors: Anyuxuan xiayu_12@yeah.net
 * @LastEditTime: 2023-03-11 10:24:56
 * @FilePath: \vite-vue3-demo\src\utils\test3.js
 * @Description: 
 */
function getFullNum (num) {
  if (isNaN(num)) { return num }
  var str = '' + num
  if (!/e/i.test(str)) { return num }
  return (num).toFixed(20).replace(/\.?0+$/, '')
}

// console.log(getFullNum(9.87766e-10))

async function async1 () {
  console.log('1')
  await async2()
  console.log('AAA')
}

async function async2 () {
  console.log('3')
  return new Promise((resolve, reject) => {
      resolve()
      console.log('4')
  })
}

console.log('5')

setTimeout(() => {
  console.log('6')
}, 0);

async1()

new Promise((resolve) => {
  console.log('7')
  resolve()
}).then(() => {
  console.log('8')
}).then(() => {
  console.log('9')
}).then(() => {
  console.log('10')
})
console.log('11')