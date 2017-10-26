var ejs = require("ejs");

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('mongodb:27017/cmpe281');

function showIndex(req,res) {

  var collection = db.get('items');
  collection.find({},{},function(e,items){
    
    ejs.renderFile('./views/index.ejs',{"items":items,"items2":JSON.stringify(items)},function(err, result) {
      // render on success
      if (!err) {
          res.end(result);
      }
      // render or error
      else {
          res.end('An error occurred');
          console.log(err);
      }
    });
  });

    
}

exports.showIndex = showIndex;

