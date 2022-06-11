<template>
  <div class="login-wrap">
    <div class="user-wrap">
      <input
        v-model.lazy="name"
        type="text"
        placeholder="用户名"
      >
    </div>
    <div class="ps-wrap">
      <input
        v-model="ps"
        type="password"
        placeholder="密码"
      >
    </div>
    <button
      class="login-btn"
      type="button"
    >
      登陆
    </button>
  </div>
</template>

<script>
import md5 from 'js-md5'
export default {
  name: 'LoginPage',
  data () {
    return {
      name: '',
      ps: ''
    }
  },
  created () {
    this.ps = 'wxs2233'
    let ps = md5(this.ps)
    this.creatInterval('world')
    console.log(ps)
  },
  methods: {
    creatInterval (msg) {
    }
  }
}
</script>

<style lang="scss" scoped>
.user-wrap,
.ps-wrap {
  height: dw(80);
  line-height: dw(80);
}
</style>
