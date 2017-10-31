var express = require('express');
var router = express.Router();
var API =require('../API/api');

router.get('/', (req,res,next)=>{
    
    try {
        API.getItems()
        .then((res) => {
            if (res.status === 201) {
                res.json().then(data => {
                    console.log("got this: "+JSON.stringify(data.item));
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

