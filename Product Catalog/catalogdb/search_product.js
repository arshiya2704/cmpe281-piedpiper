var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/catalogdb";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var query = { product_name: "Cold Coffee" };
  db.collection("catalog").find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});