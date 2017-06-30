<template>
  <div class=".category-list">
    <div class="col-sm-2">
      <nav class="nav-sidebar">
        <ul class="nav tabs">
          <category-element :categoryElement="categoryAll" @click.native="onElementClicked(categoryAll, $event)"></category-element>
          <category-element v-for="element in categoryList" :categoryElement="element" :key="element.id" @click.native="onElementClicked(element, $event)"></category-element>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
  import { getCategoryList } from '~/api/index.js'
  import CategoryElement from '~components/CategoryElement.vue'
  export default {
    components: {
      CategoryElement
    },
    data () {
      return {
        categoryAll: {
          id: '',
          name: 'Все товары'
        },
        categoryList: [],
        currentElement: ''
      }
    },
    created: function () {
      let promise = getCategoryList()
      promise.then((response) => {
        this.categoryList = response.data.results
      })
    },
    methods: {
      onElementClicked (element, event) {
        this.$emit('category', element)
      }
    }
  }
</script>

<style>
  .category-list
  {
    width: 30%;
    height: 80%;
    display: inline-block;
    float: left;
  }
</style>
