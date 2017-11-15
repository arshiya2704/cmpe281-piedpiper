var express = require('express');
var router = express.Router();
var ejs = require("ejs");

var API =require('../API/api');

function removeItem(req, response) {

    

    API.removeFromPersonalCart({"userId":"5"})
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

exports.removeItem = removeItem;
