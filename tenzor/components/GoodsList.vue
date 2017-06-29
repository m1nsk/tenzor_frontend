<template>
  <div class="goods-list">
    <table class="goods-table">
      <tbody>
      <tr class="table-header">
        <th>Наименование</th>
        <th>Цена</th>
        <th>Количество</th>
        <th>Дата производства</th>
      </tr>
      <goods-element v-for="goods in goodsList" :goodsElement="goods" :key="goods.id" @click.native="onElementClicked(goods)"></goods-element>
      </tbody>
    </table>
  </div>
</template>

<script>
  import GoodsElement from '~components/GoodsElement.vue'
  export default {
    components: {
      GoodsElement
    },
    props: ['goodsList', 'currentCategory'],
    methods: {
      onElementClicked (element) {
        console.log(this.$route.path)
        this.$router.push('/goods/' + element.id)
      }
    }
  }
</script>

<style>
  .goods-list
  {
    height: 180px;
    width: 100%;
  }

  .goods-table
  {
    width: 80%;
  }

  .table-header
  {
    font-size: 12px;
  }
</style>
