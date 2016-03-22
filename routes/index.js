var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  fs.readFile('groceryList.txt', 'utf8', function(err, data) {
    var list = data.split('\n');
    list.splice(list.length - 1, 1);
    res.render('index', {
      list: list
    });
  })

});

router.get('/edit/:item', function(req, res, next) {
  res.render('edit', {
    item: req.params.item
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
      error: "No name provided"
    });
  }
});



router.post('/edit/:item', function(req,res,next){
  fs.readFile('groceryList.txt', 'utf8', function(err, data){
    var dataArr = data.split('\n');
    for (var i = 0; i < dataArr.length; i++) {
      if (req.params.item.toLowerCase() === dataArr[i].toLowerCase()) {
        dataArr[i] = req.body.name;
      }
    }
    fs.writeFile('groceryList.txt', dataArr.join('\n'), function(err){
      if (err) {
        console.log(err);
      } else {
        res.redirect('/');
      }
    })
  })
})


router.post('/delete/:item', function(req, res, next) {
  fs.readFile('groceryList.txt', 'utf8', function(err, data) {
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

module.exports = router;
