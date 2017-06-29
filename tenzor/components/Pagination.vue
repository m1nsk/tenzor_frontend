<template>
  <div v-if="pageCount" class="paginator">
    <div class="rectangle prev-page" @click="pageClick('prev')"></div>
    <div class="rectangle" :class="{active: page==pageCurrentNum}" v-for="page in pageArray" @click="pageClick(page)">{{page}}</div>
    <div class="rectangle next-page" @click="pageClick('next')"></div>
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
      updatePaginator () {
        this.paginatorOptions.updateFlag = true
        this.pageCurrentNum = 1
        this.paginatorOptions.updateFlag = false
        return false
      },
      pageArray () {
        this.pages = []
        let firstPage = this.pageCurrentNum - 1 > 1 ? this.pageCurrentNum - 1 : 1
        let lastPage = this.pageCurrentNum + 1 > this.pageCount ? this.pageCount : this.pageCurrentNum + 1
        for (let i = firstPage; i <= lastPage; i++) {
          this.pages.push(i)
        }
        return this.pages
      }
    }
  }
</script>

<style>
  .rectangle
  {
    width: 50px;
    height: 50px;
    border-radius: 5px;
    float: left;
    text-align: center;
    line-height: 50px;
  }

  .rectangle:hover
  {
    background-color: #a1af9f;
  }

  .active
  {
    background-color: #4CAF50;
    color: white;
  }

  .active:hover: hover:not(.active) {background-color: #ddd;}

  .paginator
  {
    width: 100%;
    display: block;
  }

  .prev-page
  {
    background-image: url('../assets/css/prev.png');
    background-position: 15px 15px;
    background-size: 20px 20px;
    background-repeat: no-repeat;
  }

  .next-page
  {
    background-image: url('../assets/css/next.png');
    background-position: 15px 15px;
    background-size: 20px 20px;
    background-repeat: no-repeat;
  }
</style>
