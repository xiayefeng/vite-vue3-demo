<template>
  <div class="home">
    <!-- <img
      alt="Vue logo"
      src="../assets/logo.png"
    > -->
    <div class="btn-wrap">
      <button @click="login">
        登录
      </button><button
        class="refresh-btn"
        @click="reload"
      >
        刷新
      </button>
      <button
        class="event-btn"
        @click="eventTest"
      >
        事件
      </button>
      <button
        class="form"
        @click="formSubmit"
      >
        表单
      </button>
      <button v-copy="formData.text">
        copy
      </button>
      <input
        v-model="formData.text"
        type="text"
      >
    </div>
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <marquee>滚动文字</marquee>
    <div
      ref="textWrap"
      class="text-wrap"
    >
      <span>asdfasfasfdasfdasdf</span>
      <span>asdfasfasfdasfdasdf</span>
      <span>asdfasfasfdasfdasdf</span>
      <span>asdfasfasfdasfdasdf</span>
      <span>asdfasfasfdasfdasdf</span>
    </div>
    <div class="svg-wrap">
      <svg
        class="svg-icon"
        viewBox="0 0 80 80"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M 0 0 H 80 V 80 L 40 50 L 0 80 Z" />
        <text
          x="30"
          y="35"
          class="small"
        >热</text>
      </svg>
    </div>
    <div class="sector" />
    <a
      class="bottom-link"
      href="https://beian.miit.gov.cn/"
      target="_blank"
    >粤ICP备19150227号-1</a>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
// import { reqGet } from '@/api/common'
// import util from 'utils'
// import showLoading from '@/components/common/showLoading'
import { reqGet } from '@/api/common.js'
export default {
  name: 'HomePage',
  components: {
    HelloWorld
  },
  inject: ['reload'],
  data () {
    return {
      instance: null,
      formData: {
        text: 'eeee'
      }
    }
  },
  created () {
    console.log('home created')
    /* reqGet('/api', { a: 1, b: 2 }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    }) */
    this.getData()
    this.getData()
  },
  mounted () {

    document.addEventListener('visibilitychange', this.visibilityChange)
    window.addEventListener('pageshow', this.pageShow)
    let textWrap = this.$refs.textWrap
    let options = {
      root: textWrap,
      rootMargin: '0px',
      threshold: 0.5
    }

    let observer = new IntersectionObserver(callback, options);
    const wrap = textWrap.childNodes

    function callback (entries, observer) {
      let hideNum = 0
      // console.log(entries)
      entries.forEach(item => {
        if (!item.isIntersecting) {
          hideNum++
        }
      })
      console.log(hideNum)
      observer.unobserve(textWrap)
      textWrap = null
    }

    wrap.forEach(item => {
      // console.log(item)
      observer.observe(item);
    })
    console.log('home mounted')
    // console.log(top.window)
  },

  beforeUnmount () {
    document.removeEventListener('visibilitychange', this.visibilityChange)
    window.removeEventListener('pageshow', this.pageShow)
  },
  methods: {
    login () {
      // this.instance = showLoading({ message: '数据请求中' })
      // showLoading.show({ msg: '数据请求中' })
      this.$router.push('/login')
    },
    eventTest () {
      // this.instance.close()
      // showLoading.hide()
      this.getData()
      // this.$router.push('/event')
    },
    formSubmit () {
      this.$router.push('/form')
    },
    visibilityChange () {
      // 用户离开了当前页面
      if (document.visibilityState === 'hidden') {
        console.log('页面隐藏了')
      }

      // 用户打开或回到页面
      if (document.visibilityState === 'visible') {
        console.log('页面显示了')
      }
    },
    getData () {
      reqGet('/api', { a: 1, b: 2 }, { signalRequest: 1 }).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    pageShow () {
      console.log('page show')
    }
  }
}
</script>
<style lang="scss" scoped>
.home {
  margin-bottom: 50px;
}

.btn-wrap {
  height: dw(80);
  line-height: dw(80);
}

.bottom-link {
  font-size: dw(30);
}

.refresh-btn {
  margin: 0 dw(30);
}

.text-wrap {
  width: 80%;
  margin: 0 auto;
  @include text-overflow;
}

.event-btn {
  margin-right: dw(30);
}

.svg-wrap {
  width: 80px;
  height: 80px;
  margin-left: 20px;

  .svg-icon {
    fill: #ccc;
  }

  :deep(.small) {
    fill: #fff;
    font-size: 20px;
    color: #fff;
  }
}

.sector {
  border-radius: 80px 0 0;
  width: 80px;
  height: 80px;
  background: #0000ff;
}

</style>
