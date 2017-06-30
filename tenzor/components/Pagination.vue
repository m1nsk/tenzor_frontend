<template>
  <div>
    <ul v-if="pageCount" class="pagination">
      <li @click="pageClick('prev')">
        <a href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li :class="{active: page==pageCurrentNum}" v-for="page in pageArray" @click="pageClick(page)">
        <a href="#">{{page}}</a>
      </li>
      <li @click="pageClick('next')">
        <a href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: ['paginatorOptions'],
    data () {
      return {
        pageCurrentNum: 1
      }
    },
    methods: {
      pageClick (page) {
        if (page === 'next' | page === (this.pageCurrentNum + 1)) {
          if (this.pageCurrentNum < this.pageCount) {
            this.pageCurrentNum++
            this.$emit('page', {
              page: 'next'
            })
          }
        } else if (page === 'prev' | page === (this.pageCurrentNum - 1)) {
          if (this.pageCurrentNum > 1) {
            this.pageCurrentNum--
            this.$emit('page', {
              page: 'prev'
            })
          }
        }
      }
    },
    computed: {
      pageCount () {
        if (this.paginatorOptions.updateFlag === true) {
          this.pageCurrentNum = 1
          this.paginatorOptions.updateFlag = false
        }
        return Math.ceil(this.paginatorOptions.count / this.paginatorOptions.page_size)
      },
      pageArray () {
        let pages = []
        let firstPage = this.pageCurrentNum - 1 > 1 ? this.pageCurrentNum - 1 : 1
        let lastPage = this.pageCurrentNum + 1 > this.pageCount ? this.pageCount : this.pageCurrentNum + 1
        for (let i = firstPage; i <= lastPage; i++) {
          pages.push(i)
        }
        return pages
      }
    }
  }
</script>

<style>
</style>
