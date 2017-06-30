<template>
  <div class="submitCategoryForm">
    <form ref="myform" @submit.prevent="submitCategory" id="mainForm" >
      <label for="category">Категория</label>
      <input type="text" id="category" class="form-control category-form" placeholder="Введите название категории..." v-model="inputCategory">
      <p class="valid-message">{{message}}</p>
      <input type="submit" name="btnSubmit" class="btn btn-primary active vcenter btn-submit">
    </form>
  </div>
</template>

<script>
  import { postCategory } from '~/api/index.js'
  export default {
    layout: 'default',
    data () {
      return {
        inputCategory: '',
        message: ''
      }
    },
    methods: {
      submitCategory () {
        if (this.validateCategory()) {
          let data = new URLSearchParams()
          data.append('name', this.inputCategory)
          let promise = postCategory(data)
          promise.then((response) => {
            this.$router.go(-1)
          }).catch((error) => {
            this.message = 'Что-то пошло не так'
            console.log(error)
          })
        }
      },
      validateCategory () {
        if (this.inputCategory) {
          this.message = ''
          return true
        }
        this.message = 'Введите название категории'
        return false
      }
    }
  }
</script>

<style scoped>
  .submitCategoryForm
  {
    width: 450px;
    margin: 25px auto;
    padding: 10px;
    border-radius: 10px;
    background-color: cornflowerblue;
  }

  .valid-message
  {
    color: #af2b29;
    font-size: 10px;
  }

  .btn-submit
  {
    margin-top: 15px;
  }

  .vcenter {
    width: 100%;
    display: table-cell;
    vertical-align: middle;
    height: 100%;
  }
</style>
