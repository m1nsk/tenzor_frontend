<template>
  <div>
    <div class="submitGoodsForm">
      <h1 class="text-center font-weight-bold">Goods</h1>
      <form ref="myform" @submit.prevent="submitGoods" id="mainForm" >
        <label for="category">Категория</label>
        <input class="form-control" list="categories" id="category" v-model="category_name">
        <datalist id="categories"">
        <option v-for="category in categoryList" :value="category.name"></option>
        </datalist>
        <p class="valid-message">{{formModelMessage.category}}</p>
        <label for="name">Наименование</label>
        <input type="text" class="form-control" id="name" placeholder="Введите наименование товара..." name="name" ref="book" v-model="formModel.name">
        <p class="valid-message">{{formModelMessage.name}}</p>
        <label for="qty">Количество</label>
        <input type="text" class="form-control" id="qty" placeholder="Введите количество товара" name="qty" ref="qty" v-model="formModel.qty">
        <p class="valid-message">{{formModelMessage.qty}}</p>
        <label for="price">Цена</label>
        <input type="text" class="form-control" id="price" placeholder="Введите цену товара" name="price" ref="price" v-model="formModel.price">
        <p class="valid-message">{{formModelMessage.price}}</p>
        <label for="date">Дата производства</label>
        <input type="date" class="form-control" id="date" name="date" ref="date" v-model="formModel.production_date">
        <p class="valid-message">{{formModelMessage.date}}</p>
        <input type="submit" name="btnSubmit" class="btn btn-primary active vcenter btn-submit">
      </form>
    </div>
  </div>
</template>

<script>
  import { postGoods, getCategoryList } from '~/api/index.js'
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
          production_date: '2017-06-30'
        },
        formModelMessage: {
          category: '',
          name: '',
          price: '',
          qty: '',
          production_date: ''
        },
        category_name: '',
        categoryList: []
      }
    },
    created: function () {
      let promise = getCategoryList()
      promise.then((response) => {
        this.categoryList = response.data.results
      })
    },
    methods: {
      submitGoods () {
        if (this.validateForm()) {
          let data = new FormData()
          for (var key in this.formModel) {
            data.append(key, this.formModel[key])
          }
          var promise = postGoods(data)
          promise.then((response) => {
            this.$router.go(-1)
          }).catch((error) => {
            console.log(error)
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
          this.formModelMessage.name = ''
          return true
        }
        this.formModelMessage.name = 'Заполните поле'
        return false
      },
      validatePrice () {
        if (!isNaN(parseFloat(this.formModel.price)) && isFinite(this.formModel.price)) {
          this.formModelMessage.price = ''
          return true
        }
        this.formModelMessage.price = 'Значение должно быть числом'
        return false
      },
      validateQty () {
        if (this.formModel.qty % 1 === 0) {
          this.formModelMessage.qty = ''
          return true
        } else {
          this.formModelMessage.qty = 'Значение должно быть целым числом'
          return false
        }
      },
      validateDate () {
        if (this.formModel.production_date) {
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
  .submitGoodsForm
  {
    width: 450px;
    margin: 25px auto;
    padding: 25px;
    border-radius: 10px;
    background-color: cornflowerblue;
  }

  .valid-message
  {
    color: #af2b29;
    font-size: 10px;
  }

  .vcenter
  {
    width: 100%;
    display: table-cell;
    vertical-align: middle;
    height: 100%;
  }

  .btn-submit
  {
    margin-top: 15px;
  }
</style>
