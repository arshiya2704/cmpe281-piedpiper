var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/catalogdb";

MongoClient.connect(url, function(err, db){
    if (err) throw err;
    
    var myobj = [
        { category: 'Hot Beverages', 
          product_id: '1', 
          product_name: 'Chai Latte', 
          product_size: 'S',
          price: '$3.45',
          in_stock: 'Yes',
        }
        { category: 'Cold Beverages', 
          product_id: '2', 
          product_name: 'Cold Coffee', 
          product_size: 'S',
          price: '$5',
          in_stock: 'Yes',
        }
    ];
    db.collection("catalog").insertMany(myobj, function(err, res){
        if (err) throw err;
        console.log("Number of documents inserted: " + res.insertedCount);
        db.close();
    });
});