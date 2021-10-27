const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/'
let i = 0
let addCart = {}
let x = false
let praiceCart = []
let y = 0
var sum = 0


function regGoods(){
  document.querySelector('.formGoods').innerHTML = '<i class="fas fa-times" onclick="closes()"></i><div class="reg"><form class="regform" name="regform" onsubmit="return formValidation(event)"><h1 class="hText">Ваше имя:</h1><input name="name" type="text"><span class="errorText erName"></span><h1 class="hText">Ваш телефон:</h1><input name="phone" type="text"><span class="errorText erPhone"></span><h1 class="hText">Ваш email:</h1><input name="email" type="text"><span class="errorText erEmail"></span><h1 class="hText">Ваше сообщение:</h1><textarea name="text" cols="20" rows="5"></textarea><span class="errorText erText"></span><input class="submit" type="submit"><span class="textGood"></form></div>'
  let formGoods = document.querySelector('.formGoods')
  formGoods.classList.add('formDiv')
}

function closes(){
  let formGoods = document.querySelector('.formGoods')
  formGoods.classList.remove('formDiv')
  document.querySelector('.formGoods').innerHTML = '<i class="far fa-comment" onclick="regGoods()"></i>'
}

function removeError() {
  let input =[]
  let errorText = document.querySelectorAll(".errorText")
  input = document.querySelectorAll('input')
  textarea = document.querySelectorAll('textarea')
  for(i=0;i<textarea.length;i++){
    textarea[i].classList.remove('error')
    errorText[i].innerText = '';
  }
  for(i=0;i<input.length;i++){
    input[i].classList.remove('error')
    errorText[i].innerText = '';
  }
}

let formValidation = function (e){
  let regForm = document.forms.regform;
  removeError()
    let name = regForm.elements.name;
    let mail = regForm.elements.email;
    let phone = regForm.elements.phone;
    let text = regForm.elements.text

    let result = true;

    if (nameValidation(name) == false) {
      result = false;
  }

  if (phoneValidation(phone) == false) {
      result = false;
  }

  if (mailValidation(mail) == false) {
      result = false;
  }

  if (textValidation(text) == false) {
      result = false;
  }

  if (result == false) {
      document.querySelector('.textGood').innerText = "Ваши данные не приняты!"
  }
  if (result == true) {
      document.querySelector('.textGood').innerText = "Спасибо! Ваши данные приняты!"
  }

  return result;
};

let nameValidation = (name) => {
  let errorText = document.querySelectorAll(".errorText")
  let regexp = /^[A-Za-zА-Яа-я ]+$/;

  if (name.value == '') {
    errorText[0].innerText = 'Заполните поле!';
    name.classList.add("error");
      return false;
  }
  if (name.value.match(regexp)) { 
      return true;
  } else {
    errorText[0].innerText = 'Имя может содержать только буквы и пробел';
      name.classList.add("error");
      return false;
  }
};

let phoneValidation = (phone) => {
  let errorText = document.querySelectorAll(".errorText")
  let regexp = /^\+\d{1}\(\d{3}\)\d{3}-\d{4}$/;

  if (phone.value == '') {
    errorText[1].innerText = 'Заполните поле!';
    phone.classList.add("error");
      return false;
  }

  if (phone.value.match(regexp)) { 
      return true;
  } else {

    errorText[1].innerText = 'Телефон введите в формате +7(000)000-0000';
      phone.classList.add("error");
      return false;
  }
};

let mailValidation = (mail) => {
  let errorText = document.querySelectorAll(".errorText")
  let regexp = /^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/;

  if (mail.value == '') {
    errorText[2].innerText = 'Заполните поле!';
    mail.classList.add("error");
      return false;
  }
  if (mail.value.match(regexp)) { 
      return true;
  } else {

    errorText[2].innerText = 'Адрес эл. почты может содежрать латинские буквы (@, . - _)';
      mail.classList.add("error");
      return false;
  }
};

let textValidation = (text) => {
  let errorText = document.querySelectorAll(".errorText")
  if (text.value == '') {
    errorText[3].innerText = 'Заполните поле!';
    text.classList.add("error");
      return false;
  }else { 
      return true;
  } 
};




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
      document.querySelector('.cart').innerHTML = '<button class="cart-button" onclick="list.fetchGoods()">Главная</button><button class="cart-button" onclick="list.getGoods()" type="button">Корзина</button>'
      document.querySelector('.regGoods').innerHTML = '<div class="goods-list"></div><h3 class="cart-goods"></h3><div class="goods-total"></div><h3 class="goods-price"></h3>'
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
