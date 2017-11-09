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

app.listen(3001, () => {
  console.log('Server is up and running at 3001');
});
