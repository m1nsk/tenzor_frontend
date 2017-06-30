<template>
  <li class="element"><a href="#tab2" data-toggle="tab">{{categoryElement.name}}</a></li>
</template>

<script>
  export default {
    props: ['categoryElement']
  }
</script>

<style>
  .element
  {
    width: 100%;
  }
</style>
