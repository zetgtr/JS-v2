const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/'
let addCart = {}
new Vue({
  el: "#app",
  data: {
    error: null,
    goods: [],
    filtered: [],
    filtredCart: [],
    cart: [],
    searchLine: '',
    isVisibleCart: false,
  },
  methods: {
    loadGoods(){
      fetch(`${API_URL}catalogData.json`)
        .then((request) => request.json())
        .then((data) => {
          this.goods = data;
          this.filtered = data;
        })
        .catch((error) => {
          this.error = error;
      })
    },

    check(){
      let check = Object.entries(addCart);
      for(i=0;i<this.cart.length;i++){
        if(this.cart[i].id_product === Number(check[i][0])){
          this.cart[i].qu = Number(check[i][1]);
          this.cart[i].price = this.goods[i].price*Number(check[i][1]);
        }
      }
      this.filtredCart = this.cart;
      const reg = new RegExp(/\d/, 'i');
      this.filtredCart = this.cart.filter((good) => reg.test(good.qu));
    },

    loadCart(){
      fetch(`${API_URL}getBasket.json`)
        .then((request) => request.json())
        .then((data) => {
          this.cart = data.contents;
          this.check();
        })
        .catch((error) => {
          this.error = error;
      })
    },
    
    delGoods(id){
      addCart[id]--;
      if (addCart[id]<=0){
        addCart[id] = undefined ;  
      };
      this.check();
    localStorage.setItem('addCart', JSON.stringify(addCart));
    },

    addGoods(id){
  if(addCart[id] != undefined || addCart[id] != null){
  addCart[id]++
  }else {
    addCart[id] = 1
    }
    this.check();
  localStorage.setItem('addCart', JSON.stringify(addCart))
  },

   checkCart() {
    if (localStorage.getItem('addCart') != null){
      addCart = JSON.parse (localStorage.getItem('addCart'))
           
    }
   },

    onSearch(searchString) {
      const reg = new RegExp(searchString, 'i')
      this.filtered = this.goods.filter((good) => reg.test(good.product_name))
    },

    onToggleCart() {
      this.isVisibleCart = !this.isVisibleCart
    }

  },
   mounted() {
    this.loadGoods();
    this.loadCart();
    this.checkCart();
  }
})