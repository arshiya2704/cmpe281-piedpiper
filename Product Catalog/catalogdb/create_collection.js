var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/catalogdb";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  //Create a collection name "customers":
  db.createCollection("catalog", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});
