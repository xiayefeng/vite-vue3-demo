<template>
  <div></div>
</template>

<script>
export default {
  data () {
    return {
      hasTitle: ''
    }
  },
  props: {
    }
  },
  computed: {},
  methods: {
    cancleBubble (e) {
      // alert(1)
      return false
    },
    closeMask () {
      // console.log(1)
      this.$emit('close-mask')
    },
    stopBubble () {
      return false
    }
  },
  watch: {
  }
}
</script>

<style lang="scss" scoped>
</style>
