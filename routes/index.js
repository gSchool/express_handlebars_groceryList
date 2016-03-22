var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  fs.readFile('groceries.txt', 'utf8', function(err, data) {
    if(err){
      console.log(err);
      return;
    }
    var list = data.split('\n');
    res.render('index', {
      list: list
    });
  });
});

router.get('/edit/:item', function(req, res, next) {
  res.render('edit', {
    item: req.params.item
  });
});

router.post('/edit/:item', function(req, res, next) {
if (req.body.name) {

  fs.readFile('groceries.txt', 'utf8', function(err, data) {
    var list = data.split('\n');
    var food = list.indexOf(req.params.item);
    console.log(req.body.name);
    if (food !== -1) {
      list[food] = req.body.name;
      console.log(req.params.item);
    }
    fs.writeFile('groceries.txt', list.join('\n'), function(err) {
      if (err) {
        console.log(err);
      }
      res.redirect('/');
    });
  });
}
});


router.post('/add', function(req, res, next) {
  if (req.body.name) {
    fs.appendFile('groceries.txt', req.body.name + "\n", function(err) {
      if (err) {
        console.log(err);
      } else {
        res.redirect('/');
      }
    })

  } else {
    res.render('index', {
      error: "No name provided"
    });
  }
});

router.post('/delete/:item', function(req, res, next) {
  console.log(req.params.item);
  fs.readFile('groceries.txt', 'utf8', function(err, data) {
    var dataArr = data.split('\n');
    for (var i = 0; i < dataArr.length; i++) {
      if (req.params.item.toLowerCase() === dataArr[i].toLowerCase()) {
        dataArr.splice(i, 1);
      }
    }
    fs.writeFile('groceries.txt', dataArr.join('\n'), function(err) {
      if (err) {
        console.log(err);
      } else {
        res.redirect('/');
      }
    })
  })
});

module.exports = router;
