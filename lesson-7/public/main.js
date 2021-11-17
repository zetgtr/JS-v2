const API_URL = 'http://127.0.0.1:3000/'

Vue.component('cart', {
  template: `  <div class="good-card"
  @click="onClick"
  v-on:click="check">
   <h2>{{ id }}</h2>
    <h2>{{ title }}</h2>
    <p>\${{ price }}</p>
    </div>
    `,
  props: {
    id: Number,
    title: String,
    price: Number
  },

  methods: {
    check(){
      this.$emit('check')
      },
  onClick() {
    fetch(API_URL+"delToCart", {
      method: "POST",
      headers: {
        'Content-Type': 'application/JSON'
      },
      body: JSON.stringify({product_name: this.title, price: this.price, id: this.id})
    })
  }
}
})

Vue.component('good-cart', {
  template: `<div class="good-card" @click="onClick" v-on:click="check">
    <h2>{{ title }}</h2>
    <p>$ {{ price }}</p>
  </div>`,
  props: {
    title: String,
    price: Number
  },

  methods: {
    check(){
    this.$emit('check')
    },
    onClick() {
      fetch(API_URL+"addToCart", {
        method: "POST",
        headers: {
          'Content-Type': 'application/JSON'
        },
        body: JSON.stringify({product_name: this.title, price: this.price})
      })
    }
  }
})

Vue.component('goods-cart', {
  template: `<div class="goods-list"
  v-if="isvisible">
  <h2>Корзина: </h2>
    <cart
      v-for="good of cart" 
      v-bind:key="good.id_product"
      v-bind:title="good.product_name"
      v-bind:price="good.price"
      v-bind:id="good.id_product"
      v-on:check = "check"
    ></cart>
  </div>`,
  props: [
    'cart',
    'isvisible'
  ],
  methods: {
  check(){
  this.$emit('check')
  }
}
})


Vue.component('goods-list', {
  template: `<div class="goods-list">
    <good-cart 
      v-for="good of list" 
      v-bind:key="good.id_product"
      v-bind:title="good.product_name"
      v-bind:price="good.price"
      v-on:check = "check"
    ></good-cart>
  </div>`,
  props: {
    list: Array
  },
  methods:{
  check(){
      this.$emit('check')
      },
    }
})

Vue.component('search', {
  template: `<div class="search">
    <input type="text" v-model="searchString" class="goods-search" />
    <button class="search-button" type="button" v-on:click="onClick">Искать</button>
  </div>`,
  data() {
    return {
      searchString: ''
    }
  },  
  methods: {
    
    onClick(){
      console.log('work')
      this.$emit('search', this.searchString)
    }
  }
})

new Vue({
  el: "#app",
  data: {
    cart: [],
    goods: [],
    filteredGoods: [],
    searchLine: '',
    isVisibleCart: false
  },
  methods: {
    loadGoods(){
      fetch(`${API_URL}catalogData`)
        .then((request) => request.json())
        .then((data) => {
          this.goods = data;
          this.filteredGoods = data;
        })
    },

    loadCart(){
      fetch(`${API_URL}cart`)
      .then((request) => request.json())
      .then((data) => {
        this.cart = data;
      })
  },
    onCart() {
      this.isVisibleCart = !this.isVisibleCart
    },

    onSearch(searchString){
      console.log(searchString)
      const regex = new RegExp(searchString, 'i');
      this.filteredGoods = this.goods.filter((good) => regex.test(good.product_name))
    }
  },

  

  mounted() {
    this.loadGoods();
    this.loadCart();
  }
})