var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  fs.readFile('groceryList.txt', 'utf8', function(err, data) {
    var list = data.split('\n');
    list.splice(list.length - 1, 1)
    res.render('index', {
      list: list
    });
  });
});

router.get('/edit/:item', function(req, res, next) {
  res.render('edit', {
    item: req.params.item
  });
  console.log(req.params.item + "item");
});

router.post('/edit/:item', function(req, res, next) {
  if (req.body.name) {
    fs.readFile('groceryList.txt', 'utf8', function(err, list) {
      var newItem = req.body.name
      var oldItem = req.params.item
      console.log(oldItem);
      if (err) {
        res.send("Error")
      }
      console.log(newItem + "YAASSSS");
      var listArr = list.split('\n')
      for (var i = 0; i < listArr.length; i++) {
        if (listArr[i] === oldItem) {
          listArr[i] = newItem
          console.log(listArr);
        }
      }
      fs.writeFile('groceryList.txt', listArr.join('\n'), function(err) {
        if (err) {
          console.log(err);
        } else {
          res.redirect('/');
        }

      });
    });
  } else {
    res.render('index', {
        error: 'No change has been made'
      });
    }
});

router.post('/add', function(req, res, next) {
  if (req.body.name) {
    fs.appendFile('groceryList.txt', req.body.name + '\n', function(err) {
      if (err) {
        console.log(err);
      } else {
        res.redirect('/');
      }
    })
  } else {
    res.render('index', {
      error: 'No name provided'
    });
  }
});
router.post('/delete/:item', function(req, res, next) {
  console.log(req.params.item);
  fs.readFile('groceryList.txt', 'utf8', function(err, data) {
    var dataArr = data.split('\n')
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
    });
  });
});


module.exports = router;
