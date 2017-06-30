<template>
  <ul class="pagination">
    <li>
      <a href="#">Page Size</a>
    </li>
    <li v-for="size in sizeArray" @click="sizeClicked(size)">
      <a href="#">{{size}}</a>
    </li>
  </ul>
</template>

<script>
  export default {
    data () {
      return {
        sizeArray: [4, 8, 16]
      }
    },
    methods: {
      sizeClicked (size) {
        this.$emit('size', {
          size: size
        })
      }
    }
  }
</script>

<style>

</style>
