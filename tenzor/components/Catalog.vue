<template>
  <div>
    <h1>{{currentCategory.name}}</h1>
    <category-list @category="categoryChanged"></category-list>
    <div class="goods-catalog">
      <div class="input-group">
        <span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span>
        <input type="text" placeholder="Введите название продукта..." v-model="inputGoods" class="form-control">
      </div>
      <goods-list :goodsList="goodsList" :currentCategory="currentCategory"></goods-list>
      <pagination :paginatorOptions="paginatorOptions" @page="newPage" class="pull-left"></pagination>
      <page-size @size="pageSizeChanged" class="pull-right"></page-size>
    </div>
  </div>
</template>

<script>
  import CategoryList from '~components/CategoryList.vue'
  import GoodsList from '~components/GoodsList.vue'
  import Pagination from '~components/Pagination.vue'
  import PageSize from '~components/PageSize.vue'
  import { getGoodsListByCategory, getGoodsByField, getPage } from '~/api/index.js'
  export default {
    components: {
      CategoryList,
      GoodsList,
      Pagination,
      PageSize
    },
    data () {
      return {
        goodsList: [],
        currentCategory: {
          name: 'Все товары',
          id: ''
        },
        inputGoods: '',
        paginatorOptions: {
          count: '',
          next: '',
          prev: '',
          page_size: 4,
          updateFlag: true
        }
      }
    },
    mounted: function () {
      this.categoryChanged(this.currentCategory)
    },
    methods: {
      pageSizeChanged (size) {
        this.paginatorOptions.page_size = size.size
        this.categoryChanged(this.currentCategory)
      },
      categoryChanged (category) {
        this.inputGoods = ''
        this.paginatorOptions.currentPage = 1
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
          this.paginatorOptions.count = response.data.count
          this.paginatorOptions.next = response.data.next
          this.paginatorOptions.prev = response.data.previous
          this.paginatorOptions.updateFlag = true
        })
      },
      newPage (page) {
        if (page.page in this.paginatorOptions) {
          let promise = getPage(this.paginatorOptions[page.page])
          promise.then((response) => {
            this.goodsList = response.data.results
            this.paginatorOptions.count = response.data.count
            this.paginatorOptions.next = response.data.next
            this.paginatorOptions.prev = response.data.previous
          })
        }
      }
    },
    watch: {
      inputGoods () {
        this.paginatorOptions.currentPage = 1
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
          this.paginatorOptions.count = response.data.count
          this.paginatorOptions.next = response.data.next
          this.paginatorOptions.prev = response.data.previous
          this.paginatorOptions.updateFlag = true
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
</style>
