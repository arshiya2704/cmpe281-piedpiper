var express = require('express');
var router = express.Router();
var ejs = require("ejs");

var API =require('../API/api');

router.get('/', function(req, response, next) {

    API.getPersonalCartItems({"userId":"5"})
    .then((res) => {
        if (res.status === 201) {
            res.json().then(data => {
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
});

router.get('/remove/:id', function(req, res, next) {
    var itemId = req.params.id;
    //console.log("Id is dddd: "+ parseInt(" "+itemId));
    API.removeFromPersonalCart({"userId":"5","itemId":itemId})
    .then((res) => {
        if (res.status === 201) {
            res.json().then(data => {
                console.log(data.message);
            });
            
        }else if (res.status === 401) {
            console.log("Fail");
        }
    });     
    res.redirect('/cart');
  });

  router.get('/checkout/:total', function(req, res, next) {
    // var itemId = req.params.id;
    // //console.log("Id is dddd: "+ parseInt(" "+itemId));
    // API.removeFromPersonalCart({"userId":"5","itemId":itemId})
    // .then((res) => {
    //     if (res.status === 201) {
    //         res.json().then(data => {
    //             console.log(data.message);
    //         });
            
    //     }else if (res.status === 401) {
    //         console.log("Fail");
    //     }
    // });     
    // res.redirect('/cart');
    console.log("Checkout");
    console.log("Total :"+req.params.total);
    res.redirect('/cart');
  });


  module.exports = router;
