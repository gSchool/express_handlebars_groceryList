var express = require('express');
var router = express.Router();
var fs = require('fs');
var gldata = require('../gldata');

router.get('/', function(req, res, next) {
  fs.readFile('grocerylist.txt', 'utf8', function(err, data) {
    var list = data.split('\n');
    list.splice(list.length-1, 1);
    res.render('index', {list: list});
  });
});

router.get('/edit/:item', function(req,res,next) {
  res.render('edit', {item: req.params.item});
})

router.post('/add', function(req, res, next) {
  if (req.body.name) {
    fs.appendFile('grocerylist.txt', req.body.name + "\n", function(err) {
      if (err) {
        console.log(err);
      } else {
        res.redirect('/');
      }
    })
  } else {
    res.render('index', {error: "No data provided"});
  }
});

router.post('/delete/:item', function(req, res, next) {
  gldata.delete(req.params.item)
  res.redirect('/');
});

router.post('/edit/:item', function(req, res, next) {
  if (req.body.name) {
    fs.appendFile('grocerylist.txt', req.body.name + "\n", function(err) {
      if (err) {
        console.log(err);
      } else {
        gldata.delete(req.params.item);
        res.redirect('/');
      }
    })
  }
})

module.exports = router;
