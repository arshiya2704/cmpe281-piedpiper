var express = require('express');
var router = express.Router();
var API =require('../API/api');
var ejs = require("ejs");

router.get('/', (req,resp,next)=>{
    
    try {
        API.getItems()
        .then((res) => {
            if (res.status === 201) {
                res.json().then(data => {
                    console.log(data);
                    ejs.renderFile('./views/index.ejs',{items:data},function(err, result) {
                  // render on success
                        if (!err) {
                            resp.end(result);
                        }
                        // render or error
                        else {
                            resp.end('An error occurred');
                            console.log(err);
                        }
                    });
                });
                
            } else if (res.status === 401) {
                console.log("Fail");
            }
        });  
    }
    catch (e){
        console.log(e);
    }
});

module.exports = router; 

