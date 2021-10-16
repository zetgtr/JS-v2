// const goods = [
//     { title: 'Shirt', price: 150 },
//     { title: 'Socks', price: 50 },
//     { title: 'Jacket', price: 350 },
//     { title: 'Shoes', price: 250 },
// ];


// const $goodsList = document.querySelector('.goods-list');
  
// const renderGoodsItem = ({ title, price }) => {
//     return `<div class="goods-item"><h3>${title}</h3><p>${price}</p></div>`;
// };
  
// const renderGoodsList = (list = goods) => {
//     let goodsList = list.map(
//             item => renderGoodsItem(item)
//         ).join('');

//     $goodsList.insertAdjacentHTML('beforeend', goodsList);
// }
  
// renderGoodsList();


class GoodsItem {
    constructor(title, price) {
      this.title = title;
      this.price = price;
    }
    render() {
      return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
    }
  }

class GoodsList {
    constructor() {
      this.goods = [];
    }

    fetchGoods() {
      this.goods = [
        { title: 'Shirt', price: 150 },
        { title: 'Socks', price: 50 },
        { title: 'Jacket', price: 350 },
        { title: 'Shoes', price: 250 },
      ];
    }

    render() {
      let listHtml = '';
      this.goods.forEach(good => {
        const goodItem = new GoodsItem(good.title, good.price);
        listHtml += goodItem.render();
      });
      document.querySelector('.goods-list').innerHTML = listHtml;
    }

    listPrice() {
      let totalPrice = 0;
      this.goods.forEach((good) => {
          if(good.price !== undefined) {
              totalPrice += good.price;
          }
      });
      let totalGoodsList = "Все товары на сумму: " + totalPrice;
      document.querySelector('.goods-total').innerHTML = totalGoodsList;
  }
  }

  class cart {
    constructor(title,price){
      this.title = title;
      this.price = price;
    }
    render() {
      return `<div class="goods-cart"><h3>${this.title}</h3><p>${this.price}</p></div>`;
    }
}

class startCart {
  constructor() {
    this.cartGoods = [];
  }
  
  addToCart(){ 
    this.goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
  ];
  }
  render(){}  //создание карзины

  addCart(){} // добовление в карзину

  listCart (){} //подсчет cтоимости товара в карзине
}
  
    

  const list = new GoodsList();
  list.fetchGoods();
  list.render();
  list.listPrice()
