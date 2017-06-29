<template>
  <div class="category">
    <p>{{categoryElement.name}}</p>
  </div>
</template>

<script>
  export default {
    props: ['categoryElement']
  }
</script>

<style>
  .category
  {
    background: #ff97bd;
  }

  .category:hover
  {
    background: #ff8780;
  }
</style>
