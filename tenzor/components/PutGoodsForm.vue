<template>
  <div>
    <div class="submitGoodsForm">
      <h1>Goods</h1>
      <form ref="myform" @submit.prevent="submitGoods" id="mainForm" >
        <label for="category">Категория</label>
        <input list="categories" id="category" v-model="category_name">
        <datalist id="categories"">
        <option v-for="category in categoryList" :value="category.name"></option>
        </datalist>
        <p class="valid-message">{{formModelMessage.category}}</p>
        <label for="name">Наименование</label>
        <p><input type="text" id="name" placeholder="Введите наименование товара..." name="name" ref="book" v-model="formModel.name"></p>
        <p class="valid-message">{{formModelMessage.name}}</p>
        <label for="qty">Количество</label>
        <p><input type="text" id="qty" placeholder="Введите количество товара" name="qty" ref="qty" v-model="formModel.qty"></p>
        <p class="valid-message">{{formModelMessage.qty}}</p>
        <label for="price">Цена</label>
        <p><input type="text" id="price" placeholder="Введите цену товара" name="price" ref="price" v-model="formModel.price"></p>
        <p class="valid-message">{{formModelMessage.price}}</p>
        <label for="date">Дата производства</label>
        <p><input type="date" id="date" name="date" ref="date" v-model="formModel.production_date"></p>
        <p class="valid-message">{{formModelMessage.date}}</p>
        <input type="submit" name="btnSubmit" >
      </form>
    </div>
  </div>
</template>

<script>
  import { putGoods, getGoodsById, getCategoryList } from '~/api/index.js'
  export default {
    components: {
    },
    data () {
      return {
        formModel: {
          category: '',
          name: '',
          price: '',
          qty: '',
          production_date: '1999-01-16'
        },
        formModelMessage: {
          category: '',
          name: '',
          price: '',
          qty: '',
          production_date: ''
        },
        goods_id: '',
        category_name: '',
        categoryList: []
      }
    },
    mounted: function () {
      this.goods_id = this.$route.params['id']
      let promise = getCategoryList()
      promise.then((response) => {
        this.categoryList = response.data.results
      })
      promise = getGoodsById(this.goods_id)
      promise.then((response) => {
        this.formModel = response.data
        for (let category in this.categoryList) {
          if (this.categoryList[category].id === response.data['category']) {
            this.category_name = this.categoryList[category].name
            break
          }
        }
      })
    },
    methods: {
      submitGoods () {
        console.log('submit')
        if (this.validateForm()) {
          console.log(this.formModel, 'formModel')
          let data = new URLSearchParams()
          for (var key in this.formModel) {
            data.append(key, this.formModel[key])
          }
          data.append('id', this.goods_id)
          var promise = putGoods(data)
          promise.then((response) => {
            this.$router.go(-1)
          })
        }
      },
      clearForm () {
        for (var key in this.formModel) {
          this.formModel[key] = ''
        }
      },
      validateForm () {
        return this.validateCategory() & this.validateName() & this.validatePrice() & this.validateQty() & this.validateDate()
      },
      validateCategory () {
        for (let category in this.categoryList) {
          if (this.categoryList[category].name === this.category_name) {
            console.log('category')
            this.formModelMessage.category = ''
            this.formModel.category = this.categoryList[category].id
            return true
          }
        }
        this.formModelMessage.category = 'Такой категории не существует'
        return false
      },
      validateName () {
        if (this.formModel.name) {
          console.log('name')
          this.formModelMessage.name = ''
          return true
        }
        this.formModelMessage.name = 'Заполните поле'
        return false
      },
      validatePrice () {
        if (!isNaN(parseFloat(this.formModel.price)) && isFinite(this.formModel.price)) {
          console.log('price')
          this.formModelMessage.price = ''
          return true
        }
        this.formModelMessage.price = 'Значение должно быть числом'
        return false
      },
      validateQty () {
        if (this.formModel.qty === this.formModel.qty ^ 0) {
          console.log('qty')
          this.formModelMessage.qty = ''
          return true
        } else {
          this.formModelMessage.qty = 'Значение должно быть целым числом'
          return false
        }
      },
      validateDate () {
        if (this.formModel.production_date) {
          console.log('date')
          this.formModelMessage.production_date = ''
          return true
        }
        this.formModelMessage.production_date = 'дата введена некорректно'
        return false
      }
    }
  }
</script>

<style scoped>
  input
  {
    width: 100%;
    height: 25px;
    background-color: white;
    background-position: 5px 5px;
    background-size: 15px 15px;
    background-repeat: no-repeat;
    padding-left: 25px;
  }

  .submitGoodsForm
  {
    width: 400px;
    display: inline-block;
    vertical-align: top;
  }

  .valid-message
  {
    color: #af2b29;
    font-size: 10px;
  }
</style>
