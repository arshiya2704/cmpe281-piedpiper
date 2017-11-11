var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {product} = require('./models/product');


var app = express();
app.use(bodyParser.json());

app.post('/food', (req, res) => {
  var prod = new product({
    category: req.body.category,
    productId: req.body.productId,
    productName: req.body.productName,
    price: req.body.price,
    stockQuantity: req.body.stockQuantity
  })
  prod.save().then((doc) => {
    res.send(doc);
  }, (err) => {
      res.status(400).send(err);
  });
});

app.get('/food', (req, res) => {
  product.find({"category": "food"}, {"stockQuantity": 0})
  .then ((products) => {
    res.send({
      products
    });
  }, (e) => {
    res.status(400).send(e);
  })
});

app.get('/drinks', (req, res) => {
  product.find({"category": "drinks"}, {"stockQuantity": 0})
  .then ((products) => {
    res.send({
      products
    });
  }, (e) => {
    res.status(400).send(e);
  })
});

app.patch('/products/:id', (req, res) => {
console.log('Entered patch work');
  var id = req.params.id;
//  var body = _.pick(req.body, ['stockQuantity']);
  products.findOneAndUpdate({
    "productId": id
  }).then ((product) => {
    console.log('Product Found');
    if(!product) {
      console.log('Product not found');
//      return res.status(404).send();
    }
    res.send({product});
  }).catch((e) => {
    res.status(400).send();
  })
});

app.listen(3001, () => {
  console.log('Server is up and running at 3001');
});
