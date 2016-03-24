var express = require('express');
var router = express.Router();
var fs = require('fs');

/* Print list to homepage */
router.get('/', function(req, res, next) {
  fs.readFile('grocerylist.txt', 'utf8', function(err, data) {
    var list = data.split('\n');
    list.splice(list.length - 1, 1);
    res.render('index', {
      groceryList: list
    });
  });
});

/* Add items to list */
router.post('/', function(req, res, next) {
  if (req.body.item) {
    fs.appendFile('grocerylist.txt', req.body.item + '\n', function(err) {
      if (err) {
        console.log(err);
      } else {
        res.render('index', {
          success: "Item added to list"
        });
        res.redirect('/');
      }
    });
  } else {
    res.render('index', {
      error: "No item provided"
    });
  }
});

/* Delete items from list */
router.post('/delete/:item', function(req, res, next) {
  fs.readFile('grocerylist.txt', 'utf8', function(err, data) {
    var list = data.split('\n');
    var indexOfItem = list.indexOf(req.params.item);
    list.splice(indexOfItem, 1);
    var itemsBackToString = list.join('\n');
    fs.writeFile('grocerylist.txt', itemsBackToString, function(err) {
      if (err) {
        console.log(err);
      } else {
        res.redirect('/');
      }
    });
  });
});

module.exports = router;
