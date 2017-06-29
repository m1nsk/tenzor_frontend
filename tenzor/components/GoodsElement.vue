<template>
  <div is="tr" class="goodsElement">
    <th>{{goodsElement.name}}</th>
    <th>{{goodsElement.price}}</th>
    <th>{{goodsElement.qty}}</th>
    <th>{{goodsElement.production_date}}</th>
  </div>
</template>

<script>
  export default {
    props: ['goodsElement']
  }

</script>

<style>
  .goodsElement
  {
    height: 20px;
    background: #fff5ff;
  }
  .goodsElement:hover
  {
    background: #ce94ff;
  }
</style>
