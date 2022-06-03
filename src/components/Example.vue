<template>
  <div class="list">
    <div
      class="item"
      v-for="item in $props.list"
      :key="item.id"
      @click="$props.itemClick(item)"
    >
      <p>{{ item.title }}</p>
      <p>{{ item.content }}</p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    list: Array,
    itemClick: Function
  }
}
</script>
