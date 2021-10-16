let x = 0
let cena = 0
let dop = 0
class GoodsItem {
    constructor(title, price, cal) {
      this.title = title;
      this.price = price;
      this.cal = cal;
    }
    render() {
      return `<input type="radio" checked name="gender" id='${x++}'>${this.title}, Цена: ${this.price}, Калорий: ${this.cal}<br> `;
    }
    renderDob() {
      return `<input type="checkbox" name="gender" id='${x++}'>${this.title}, Цена: ${this.price}, Калорий: ${this.cal}<br> `
    }
  }

  class GoodsList {
    constructor() {
      this.goods = [];
      this.filling = [];
      this.dop = [];
    }

    fetchGoods() {
      this.goods = [
        { title: 'Маленький', price: 50, cal: 20},
        { title: 'Большой', price: 100, cal: 40},
      ];
      this.filling = [
        { title: 'С сыром', price: 10, cal: 20},
        { title: 'С салатом', price: 20, cal: 5},
        { title: 'С картофелем', price: 15, cal: 10},
      ];
      this.dop = [
        { title: 'Посыпать приправой', price: 15, cal: 0},
        { title: 'Полить майонезом', price: 20, cal: 5},
      ]
    };
    render() {
      let listHtml = '<form>';
      this.goods.forEach(good => {
        
        const goodItem = new GoodsItem(good.title, good.price, good.cal);
        listHtml += goodItem.render();
      });
      document.querySelector('.item').innerHTML = ' <form class="goods-list"></form>\n</form><form class="goods-total"></form>\n</form><form class="goods-dop"></form>'
      document.querySelector('.goods-list').innerHTML = listHtml + '</form>' ;
    }
    renderTotal (){
      let listFilling = '<form>';
      this.filling.forEach(good => {
        const goodItem = new GoodsItem(good.title, good.price, good.cal);
        listFilling += goodItem.render();
      });
      
      document.querySelector('.goods-total').innerHTML = listFilling + '</form>';
    };
    renderDob (){
      let listDop = '<form>';
      this.dop.forEach(good => {
        const goodItem = new GoodsItem(good.title, good.price, good.cal);
        listDop += goodItem.renderDob();
      });
      
      document.querySelector('.goods-dop').innerHTML = listDop + '</form>';
    }
    calculatePrice() {
      var praiceMas = this.goods.concat(this.filling, this.dop)
      
      let f = document.querySelectorAll('input:checked')
      for (let g=0;g<f.length;g++){
        let praiceId = f[g].id;
        cena = cena + praiceMas[praiceId].price;
        dop = dop + praiceMas[praiceId].cal;    
      }
      document.querySelector('.praice').innerHTML = `<p>Цена: ${cena}<br> Калории: ${dop}</p>`
      cena = 0
      dop = 0
    }
  }
   

let Hamburger = new GoodsList ()
Hamburger.fetchGoods ()
Hamburger.render ()
Hamburger.renderTotal ()
Hamburger.renderDob ()