var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */


router.get('/', function(req, res, next) {
  fs.readFile("grocery_list.txt", "utf-8", function(err,data){
    var list = data.split('\n');
    list.splice(list.length-1, 1);
    res.render('index', { list: list});
  });

});

router.get('/edit/:item', function (req,res,next){
  res.render('edit', {item: req.params.item})
});

router.post('/', function(req,res,next){
  if (req.body.item){
    fs.appendFile('grocery_list.txt', req.body.item + "\n", function(err){
      if (err) {
        console.log(err);
      } else {
        res.redirect('/');
      }
    })
  } else {
    res.render('index', {error: "no item added"});
  }
});

router.post('/delete/:item', function(req, res, next){
  console.log(req.params.item);
  fs.readFile('grocery_list.txt', 'utf8', function(err, data){
    var dataArr = data.split('\n');
    for (var i=0; i<dataArr.length; i++){
      if (req.params.item.toLowerCase() ===dataArr[i].toLowerCase()){
        dataArr.splice(i, 1);
      }
    }
    fs.writeFile('grocery_list.txt', dataArr.join('\n'), function(err){
      if (err){
        console.log(err);
      } else {
        res.redirect('/');
      }
    });
  });
});


  router.post('/edit/:item', function(req, res, next){
    console.log(req.params.item);
    console.log(req.body.newName);

    if (req.body.newName){
      fs.readFile('grocery_list.txt', 'utf8', function(err, data){
        var dataArr2 = data.split('\n');
        for (var i=0; i<dataArr2.length; i++){
          if (req.params.item.toLowerCase()=== dataArr2[i].toLowerCase()){
            dataArr2[i] = req.body.newName;
          }
        }
        fs.writeFile('grocery_list.txt', dataArr2.join('\n'), function(err){
          if (err){
            console.log(err)
          } else {
            res.redirect('/');
          }
        });
      });
    }
  });

module.exports = router;
