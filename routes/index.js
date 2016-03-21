var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  fs.readFile('groceries.txt','utf8',function(err,data){
    var list = data.split('\n');
    
  });
  res.render('index', { title: 'Express' });
});

module.exports = router;
