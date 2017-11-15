var express = require('express');
var router = express.Router();
var ejs = require("ejs");

var API =require('../API/api');

function showCart(req, response) {

  // mongo.connect(mongoURL, function(db){
  //   console.log('Connected to mongo at: ' + mongoURL);
  //   var coll = db.collection('products');

  //   coll.find({}).toArray(function(err, items){
  //       if (items) {
  //           console.log(items);
  //           res.render('index', 
  //           { 
  //             title: 'NodeJS Shopping Cart',
  //             products: items
  //           }
  //           );
  //       } else {
  //           console.log("fail");
  //           res.status(202).send({"message":"Signup Successful"});
  //       }
  //   });
  // });

  // if (!req.session.cart) {
  //   return res.render('cart', {
  //     products: null
  //   });
  // }
  // var cart = new Cart(req.session.cart);
  // res.render('cart', {
  //   title: 'NodeJS Shopping Cart',
  //   products: cart.getItems(),
  //   totalPrice: cart.totalPrice
  // });

    API.getPersonalCartItems({"userId":"5"})
    .then((res) => {
        if (res.status === 201) {
            res.json().then(data => {
                console.log("got this: "+JSON.stringify(data[0].items[1].itemId));

                ejs.renderFile('./views/front.ejs',{items:data[0].items},function(err, result) {
                    // render on success
                    if (!err) {
                        response.end(result);
                    }
                    // render or error
                    else {
                        response.end('An error occurred');
                        console.log(err);
                    }
                });
            });
            
        }else if (res.status === 401) {
            response.end('An error occurred');
            console.log("Fail");
        }
    });     
}

exports.showCart = showCart;
