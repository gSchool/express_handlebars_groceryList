var express = require('express');
var router = express.Router();
var fs = require('fs');
var title = 'Grocery List';

/* GET home page. */
router.get('/', function(req, res, next) {
  fs.readFile('grocerylist.txt', 'utf8', function(err,data){
    var list = data.split('\n');
    var itemArr = list.splice(0,list.length-1);
    res.render('index', {
      itemArr: itemArr,
      list: list,
    });
  });
});

router.post('/add', function(req, res, next) {
  if (req.body.name) {
    fs.appendFile('groceryList.txt', req.body.name + "\n", function(err) {
      if (err) {
        console.log(err);
      } else {
        res.redirect('/');
      }
    })
  } else {
    res.render('index', {
      error: "No name provided",
    });
  }
});

router.post('/delete/:item', function(req, res, next) {

  fs.readFile('groceryList.txt', 'utf-8', function(err, data) {
    var dataArr = data.split('\n');
    for (var i = 0; i < dataArr.length; i++) {
      if (req.params.item.toLowerCase() === dataArr[i].toLowerCase()) {
        dataArr.splice(i, 1);
      }
    }
    fs.writeFile('groceryList.txt', dataArr.join('\n'), function(err) {
      if (err) {
        console.log(err);
      } else {
        res.redirect('/');
      }
    })
  })

});

router.get('/edit/:item', function (req, res, err) {
  var item = req.params.item;
  res.render('edit', {
    item: item
  })
});

router.post('/edited', function (req, res, err) {
  res.redirect('/');
});



module.exports = router;
