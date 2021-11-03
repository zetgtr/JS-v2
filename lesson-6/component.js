Vue.component('list', {
    template: `
    <div class="goods-list">
    <template v-if="error === null">
    <template v-if="item.length > 0">
    <div class="goods-item" 
    v-on:click="addGoods(good.id_product)"  
    v-for="good of item" v-bind:key="good.id_product">
      <h2>{{ good.product_name }}</h2>
      <p v-bind:id="good.price_id">\${{ good.price }}</p>
    </div>
    </template>
    <template v-else>
      <h2>Список пуст</h2>
    </template>
    </template>
    <template v-else>
        <h2>{{error}}</h2>
    </template>
    </div>`,
    props: {
    error: String,
    item: Array
    },
    methods: {
      addGoods(id){
      this.$emit('add', id)
    }
  }
  })
  
  Vue.component('cart', {
    template: `  <div class="goods-list" v-if="isvisible">
    <div class="goods-item" 
    v-on:click="delGoods(good.id_product)"  
    v-for="good of cart" v-bind:key="good.id_product">
      <h2 v-bind:id="good.id_product">{{ good.qu }}</h2>
      <h2>{{ good.product_name }}</h2>
      <p v-bind:id="good.price_id">\${{ good.price }}</p>
    </div>
    </div>`,
    props: [ "cart" , "isvisible" ],
    methods: {
      delGoods(id){
      this.$emit('del', id)
    }
  }
  })
  
  Vue.component('search', {
    template: `<div class="search">
      <input type="text" v-model="searchString" class="cart-button" />
      <button class="cart-button" type="button" v-on:click="onClick">Искать</button>
      <button class="cart-button" v-on:click="onCart" type="button">Корзина</button>
    </div>`,
    data() {
      return {
        searchString: '',
      }
    },  
    methods: {
      onClick(){
        this.$emit('searchs', this.searchString)
      },    
      onCart() {
        this.$emit('oncart')
      }
    }
  })