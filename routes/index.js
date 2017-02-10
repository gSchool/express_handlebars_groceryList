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
  if (req.body.addname) {
    fs.appendFile('grocerylist.txt', req.body.addname + "\n", function(err) {
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

  fs.readFile('grocerylist.txt', 'utf-8', function(err, data) {
    var dataArr = data.split('\n');
    for (var i = 0; i < dataArr.length; i++) {
      if (req.params.item.toLowerCase() === dataArr[i].toLowerCase()) {
        dataArr.splice(i, 1);
      }
    }
    fs.writeFile('grocerylist.txt', dataArr.join('\n'), function(err) {
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
  var newitem = req.body.newitem;

  res.render('edit', {
    item: item,
    newitem: newitem
  })

});

router.post('/edited/:olditem', function (req, res, err) {
  var olditem = req.params.olditem;

  if (req.body.newitem) {

    fs.readFile('grocerylist.txt', 'utf-8', function(err, data) {
      var dataArr = data.split('\n');

      for (var i = 0; i < dataArr.length; i++) {
        if (req.params.olditem.toLowerCase() === dataArr[i].toLowerCase()) {
          dataArr[i] = req.body.newitem;
        }
      }

      fs.writeFile('grocerylist.txt', dataArr.join('\n'), function(err) {
        if (err) {
          console.log(err);
        } else {
          res.redirect('/');
        }
      })

    })

  }

});

module.exports = router;
