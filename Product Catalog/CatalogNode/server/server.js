const _ = require('lodash');

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
  var stock;
  var id = req.params.id;
  product.find({"_id": req.params.id }).then ((prod)=> {
    stock = prod[0].stockQuantity;
    var updatedQuantity = stock - body.quantity;
    product.findOneAndUpdate(id, {$set: {"stockQuantity": updatedQuantity}}, {new: true}).then ((product) => {
      console.log({product});
      res.status(200).send();
    }).catch((e) => {
      res.status(400).send();
    });
  });
  if(!product) {
    console.log('Product not found');
    return res.status(404).send();
  }
    var body = _.pick(req.body, ['quantity']);
});

app.get('/:id',(req, res) => {
  var id = req.params.id;
  product.find({"_id": req.params.id }).then ((products) => {
    if (products[0].stockQuantity > 0) {
      res.send(JSON.stringify({
        "inStock": true
      }));
    }
    else {
      res.send(JSON.stringify({
        "inStock": false
      }));
    }
  }).catch((error) => {
    res.status(400).send();
  });
  if(!product) {
    console.log('Product not found');
    return res.status(404).send();
  }
});


app.listen(3001, () => {
  console.log('Server is up and running at 3001');
});
