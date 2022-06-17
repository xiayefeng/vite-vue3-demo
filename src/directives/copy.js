const handler = (val) => {
  if(!val) return
  // 动态创建 textarea 标签
  const textarea = document.createElement('textarea')
  // 将该 textarea 设为 readonly 防止 iOS 下自动唤起键盘，同时将 textarea 移出可视区域
  textarea.readOnly = 'readonly'
  textarea.style.position = 'absolute'
  textarea.style.left = '-9999px'
  // 将要 copy 的值赋给 textarea 标签的 value 属性
  textarea.value =val
  // 将 textarea 插入到 body 中
  document.body.appendChild(textarea)
  // 选中值并复制
  textarea.select()
  const result = document.execCommand('Copy')
  if (result) {
    console.log('复制成功') // 可根据项目UI仔细设计
  }
  document.body.removeChild(textarea)
}
export const copy = (app, options) => {
  app.directive('copy', {
    beforeMount(el, binding, vnode) {
    },
    mounted(el, {value}, vnode) {
      // console.log(el)
      el.$value = value
      // console.log(value)
      // console.log(vnode)
      el.handler = () => {
        handler(el.$value)
      }
      el.addEventListener('click', el.handler)
    },
    updated(el, {value}, vnode) {
      el.$value = value
    },
    unmounted(el, binding, vnode) {
      el.removeEventListener('click', el.handler)
    }
  })
}