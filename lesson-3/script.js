const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/'
let i = 0
let addCart = {}
let x = false
let praiceCart = []
let y = 0
var sum = 0


function delGoods(id){
    addCart[id]--
    if (addCart[id]<=0){
      addCart[id] = 0
      delete addCart[id]
    }
  localStorage.setItem('addCart', JSON.stringify(addCart))
  if(x==true){
    list.getGoods()
    }
}

function  addGoods(id){
  if(addCart[id] != undefined || addCart[id] != null){
  addCart[id]++
  }else {
    addCart[id] = 1
    }
  
  localStorage.setItem('addCart', JSON.stringify(addCart))
  if(x==true){
    list.getGoods()
  }
}

function checkCart() {
  if (localStorage.getItem('addCart') != null){
    addCart = JSON.parse (localStorage.getItem('addCart'))
  }
}

function send(onError, onSuccess, url, method = 'GET', data = null, headers = [], timeout = 60000) {
  let xhr;

  if (window.XMLHttpRequest) {
      // Chrome, Mozilla, Opera, Safari
      xhr = new XMLHttpRequest();
  }  else if (window.ActiveXObject) { 
      // Internet Explorer
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xhr.open(method, url, true);


  headers.forEach((header) => {
      xhr.setRequestHeader(header.key, header.value);
  })
  

  xhr.timeout = timeout;

  xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
      if(xhr.status >= 400) {
          onError(xhr.statusText)
      } else {
          onSuccess(xhr.responseText)
      }
      }
  }

  xhr.send(data);
}

class GoodsItem {
    constructor(title, price, id) {
      this.title = title;
      this.price = price;
      this.id = id;
    }

    render() {
      return `<div class="goods-item" id="${this.id}" onclick="addGoods(this.id)"><h3>${this.title}</h3><p>${this.price}</p></div>`;
    }
}

class GoodCart {
  constructor(title, price, id, result) {
    this.title = title;
    this.price = price;
    this.id = id;
    this.result = result
  }
  render() {
    
    return `<div class="goods-item" id="${this.id}" onclick="delGoods(this.id)"><h3>${this.result}</h3><h3>${this.title}</h3><p id='${y++}'>${this.price}</p></div>`;
  }
}

class GoodsList {
    constructor() {
      this.goods = [];
      this.addGoods = [];
      this.carts = [];
    }

    fetchGoods() {
      fetch(`${API_URL}catalogData.json`)
      .then((response) => {
        return response.json();
      })
      .then((request) => {
        this.goods = request.map(good => ({title: good.product_name, price: good.price, id: good.id_product}))
        this.addGoods = this.goods
        this.render();
      })
      .catch((err) => { 
        console.log(err.text)
      })

      // new Promise((resolve, reject) => {
      //   send(
      //     reject,
      //     resolve,
      //     `${API_URL}catalogData.json`
      //   )
      // })
      // .then((request) => {
      //   this.goods = JSON.parse(request).map(good => ({title: good.product_name, price: good.price}))
      //   this.render();
      // })
      // .catch((err) => { 
      //   console.log(err.text)
      // })

      // send(
      //   (err) => { 
      //     console.log(err.text)
      //   },
      //   (request) => {
      //     this.goods = JSON.parse(request).map(good => ({title: good.product_name, price: good.price}))
      //     this.render();
      //   },
      //   `${API_URL}catalogData.json`
      // )

        // this.goods = [
        //   { title: 'Shirt', price: 150 },
        //   { title: 'Socks', price: 50 },
        //   { title: 'Jacket', price: 350 },
        //   { title: 'Shoes', price: 250 },
        // ];
    }

    render() {
        let listHtml = '';
        this.goods.forEach(good => {
          const goodItem = new GoodsItem(good.title, good.price, good.id);
          listHtml += goodItem.render();
        });

        document.querySelector('.goods-list').innerHTML = listHtml;
        
        
    }
    listPrice() {
      document.querySelector('.cart-goods').innerHTML = 'Корзина'
      let listHtml = '';
      this.carts.forEach(good => {
          const goodCart = new GoodCart(good.title, good.price*good.result, good.id, good.result);
          listHtml += goodCart.render();
          
        });
        document.querySelector('.goods-total').innerHTML = listHtml;
        sum = 0
        for(i = 0; i < praiceCart.length; i++){
          sum += praiceCart[i];
         } 
        
        if (sum != 0){
          document.querySelector('.goods-price').innerHTML = `Все товары на сумму: ${sum}`
        }else{
          document.querySelector('.goods-price').innerHTML = `Ваша корзина пуста`
        }
        
    }
    getGoods() {
      this.carts = []
      let getCart = Object.entries(addCart)
      if (getCart)
      for (i=0;i<getCart.length;i++){
       let num = Number(getCart[i][0])
        this.carts[i] = this.addGoods.filter(a => a.id === num)
        this.carts[i][0].result = Number(getCart[i][1])
      } 
      this.carts = this.carts.flat()
      praiceCart = [0]
      for(i=0;i<getCart.length;i++){
      praiceCart[i] = this.carts[i].price * this.carts[i].result
      }
      x = true
      this.listPrice();

    }
}  
const list = new GoodsList();
list.fetchGoods()
checkCart()
