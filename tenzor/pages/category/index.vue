<template>
  <div>
    <input type="text" placeholder="Введите название категории..." v-model="inputCategory">
    <button @click="addPublisher">Добавить категорию</button>
    <button @click="addPublisherAndContinue">Добавить категорию и продолжить</button>
  </div>
</template>

<script>
  import { postCategory } from '~/api/index.js'
  export default {
    layout: 'default',
    data () {
      return {
        inputCategory: ''
      }
    },
    methods: {
      addPublisher () {
        let data = new URLSearchParams()
        data.append('name', this.inputCategory)
        let promise = postCategory(data)
        promise.then((response) => {
          this.$router.go(-1)
        }).catch((error) => {
          console.log(error)
        })
      },
      addPublisherAndContinue () {
        let data = new URLSearchParams()
        data.append('name', this.inputCategory)
        let promise = postCategory(data)
        promise.then((response) => {
          this.inputCategory = ''
        }).catch((error) => {
          console.log(error)
        })
      }

    }
  }
</script>

<style>
  input[type=text] {
    width: 300px;
    height: 25px;
    background-color: white;
    background-image: url('../../assets/css/searchicon.png');
    background-position: 5px 5px;
    background-size: 15px 15px;
    background-repeat: no-repeat;
    padding-left: 25px;
  }
</style>
