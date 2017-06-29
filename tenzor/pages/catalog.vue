<template>
  <div>
    <h1>{{currentCategory.name}}</h1>
    <category-list @category="categoryChanged"></category-list>
    <div class="goods-catalog">
      <input type="text" placeholder="Введите название продукта..." v-model="inputGoods" class="goods-input">
      <goods-list :goodsList="goodsList" :currentCategory="currentCategory"></goods-list>
      <pagination :paginatorOptions="paginatorOptions" @page="newPage"></pagination>
    </div>
  </div>
</template>

<script>
  import CategoryList from '~components/CategoryList.vue'
  import GoodsList from '~components/GoodsList.vue'
  import Pagination from '~components/Pagination.vue'
  import { getGoodsListByCategory, getGoodsByField, getPage } from '~/api/index.js'
  export default {
    components: {
      CategoryList,
      GoodsList,
      Pagination
    },
    data () {
      return {
        goodsList: [],
        currentCategory: {
          name: 'Все Товары',
          id: ''
        },
        inputGoods: '',
        paginatorOptions: {
          count: 10,
          next: '',
          prev: '',
          page_size: 4
        },
        page: 1
      }
    },
    mounted: function () {
      this.categoryChanged(this.currentCategory)
    },
    methods: {
      categoryChanged (category) {
        let data = new URLSearchParams()
        if (category.id) {
          data.append('category', category.id)
        }
        data.append('page', '1')
        data.append('page_size', this.paginatorOptions.page_size)
        let promise = getGoodsListByCategory(data)
        promise.then((response) => {
          this.currentCategory = category
          this.goodsList = response.data.results
          console.log(response.data.results, 'data results')
          this.paginatorOptions.count = response.data.count
          this.paginatorOptions.next = response.data.next
          this.paginatorOptions.prev = response.data.previous
          console.log(this.paginatorOptions, 'pagOptions')
        })
      },
      newPage (page) {
        if (page['page'] in this.paginatorOptions) {
          let promise = getPage(this.paginatorOptions[page.page])
          promise.then((response) => {
            this.goodsList = response.data.results
            console.log(response.data, 'data results')
            this.paginatorOptions.count = response.data.count
            this.paginatorOptions.next = response.data.next
            this.paginatorOptions.prev = response.data.previous
            console.log(this.paginatorOptions, 'pagOptions')
          })
        }
      }
    },
    watch: {
      inputGoods () {
        let data = new URLSearchParams()
        data.append('input', this.inputGoods)
        if (this.currentCategory.id) {
          data.append('category', this.currentCategory.id)
        }
        data.append('page', '1')
        data.append('page_size', this.paginatorOptions.page_size)
        let promise = getGoodsByField(data)
        promise.then((response) => {
          this.goodsList = response.data.results
          console.log(response.data.results, 'results')
        })
      }
    }
  }
</script>

<style scoped>
  .goods-catalog
  {
    width: 70%;
    display: inline-block;
    float: left;
  }
  input[type=text] {
    width: 80%;
    height: 25px;
    background-color: white;
    background-image: url('../assets/css/searchicon.png');
    background-position: 5px 5px;
    background-size: 15px 15px;
    background-repeat: no-repeat;
    padding-left: 25px;
  }
</style>
