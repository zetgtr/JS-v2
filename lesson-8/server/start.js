const express = require('express')
const fs = require('fs')

function stats(item, action){
  fs.readFile('data/stats.json', 'utf8', (err, data) => {
    const logFile = JSON.parse(data);
    var now = new Date();
    let time = now.getMonth()+"."+now.getDate()+"."+now.getFullYear()+" "+ now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
    const log = {}
    log.Время = time;
    if(action===true){
      log.Действие ="+ "+ item.product_name;
    }else{
      log.Действие ="- "+ item.product_name;
    }
    logFile.push(log);
    
    fs.writeFile('data/stats.json', JSON.stringify(logFile),(err) => {
      console.log("лог записан")
    })
})
}

const port = 3000
const static_dir = '../public'

const app = express()

app.use(express.json())

app.use(express.static(static_dir))

app.get('/catalogData', (req, res) => {
  fs.readFile('data/catalog.json', 'utf8', (err, data) => {
    res.send(data);
  })
});

app.get('/cart', (req, res) => {
  fs.readFile('data/cart.json', 'utf8', (err, data) => {
    res.send(data);
  })
});

app.post('/addToCart', (req, res) => {
  fs.readFile('data/cart.json', 'utf8', (err, data) => {
    console.log(req.body)
    const cart = JSON.parse(data);

    let id = 1;

    if(cart.length > 0) {
      id = cart[cart.length - 1].id_product + 1;
    }

    const item = req.body;
    item.id_product = id
  
    cart.push(item);
    const action = true
    stats(item, action)
    fs.writeFile('data/cart.json', JSON.stringify(cart), (err) => {
          res.end();
      console.log('done');
    });
  })
  });


app.post('/delToCart', (req, res) => {
  fs.readFile('data/cart.json', 'utf8', (err, data) => {
    const cart = JSON.parse(data);

    const item = req.body;
    
    for(i=item.id;i<cart.length;i++){
      cart[i].id_product = cart[i].id_product -1
    }
    cart.splice(item.id-1, 1);
    const action = false
    stats(item, action)
    fs.writeFile('data/cart.json', JSON.stringify(cart), (err) => {
      console.log('done');
      res.end();
    });
  });
});

app.listen(port, function() {
  console.log('server is running on port ' + port + '!')
})

