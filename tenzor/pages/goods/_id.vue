<template>
  <div>
    <put-goods-form></put-goods-form>
  </div>
</template>

<script>
  import PutGoodsForm from '~components/PutGoodsForm.vue'
  export default {
    validate ({ params }) {
      // Must be a number
      return /^\d+$/.test(params.id)
    },
    layout: 'default',
    components: {
      PutGoodsForm
    }
  }
</script>

<style>

</style>
