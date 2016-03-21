var express = require('express'),
fs = require('fs'),
router = express.Router(),
list;

/* GET home page. */
router.get('/', function(req, res, next) {
  fs.readFile('groceryList.txt', 'utf8', function(err, data){
    list = data.split('\n');
    for (var i = 0; i < list.length; i++) {
      if ( list[i] == "") list.splice(i, 1);
    };
    res.render('index', { list: list });
  })
});

router.post('/', function(req, res, next) {
  if ( req.body.name )
  fs.appendFile('groceryList.txt', "\n" + req.body.name, function(err){
    if ( err ) console.log(err);
    else res.redirect('/')
  })
  else res.render('index', {error: "input an item"})
});

router.post('/delete/:item', function(req, res, next) {
  fs.readFile('groceryList.txt', 'utf8', function(err, data){
    if ( err ) console.log(err);
    list = data.split("\n");
    for (var i = 0; i < list.length; i++) {
      if ( list[i] == req.params.item ) list.splice(i, 1);
      if ( list[i] == "") list.splice(i, 1);
    };
    fs.writeFile('groceryList.txt', list.join("\n"), function(err){
      if ( err ) console.log(err);
    });
    res.render('index', { list: list });
  })
});

router.post('/update/:item', function(req, res, next) {
  fs.readFile('groceryList.txt', 'utf8', function(err, data){
    if ( err ) console.log(err);
    list = data.split("\n");
    for (var i = 0; i < list.length; i++) {
      if ( list[i] == req.params.item ) list[i] = req.body.name;
      if ( list[i] == "") list.splice(i, 1);
    };
    fs.writeFile('groceryList.txt', list.join("\n"), function(err){
      if ( err ) console.log(err);
    });
  })
});

module.exports = router;
