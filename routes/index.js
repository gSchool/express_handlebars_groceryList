var express = require('express');
var router = express.Router();
var fs = require('fs');
/* GET home page. */
router.get('/', function(req, res, next) {
  fs.readFile('list.txt', 'utf8', function(err, data){
    var list = data.split('\n');
    list.splice(list.length-1, 1);
    res.render('index', { list: list });
  })
});

router.get('/edit/:item', function(req,res,next){
  res.render('edit', {item: req.params.item});
})
router.post('/edit/:item', function(req,res,next){
  fs.appendFile('list.txt', req.body.name + '\n', function(err){
    if (err) {
      console.log(err);
    } else {
      fs.readFile('list.txt', 'utf8', function(err, data){
        var dataArr = data.split('\n');
        for (var i = 0; i < dataArr.length; i++) {
          if(req.params.item.toLowerCase() === dataArr[i].toLowerCase()){
            dataArr.splice(i, 1);
          }
        }
        fs.writeFile('list.txt', dataArr.join('\n'), function(err) {
          if(err) {
            console.log(err);
          } else {
            res.redirect('/');
          }
        })
        })
    }
  })

  })

router.post('/', function(req, res, next){
  if (req.body.name){
    fs.appendFile('list.txt', req.body.name + '\n', function(err){
      if (err) {
        console.log(err);
      } else {
        res.redirect('/')
      }
    })
  } else {
    res.render('index', {error: 'No name provided!'})
  }
});
router.post('/delete/:item', function(req,res,next){
  console.log(req.params.item);
  fs.readFile('list.txt', 'utf8', function(err, data){
    var dataArr = data.split('\n');
    for (var i = 0; i < dataArr.length; i++) {
      if(req.params.item.toLowerCase() === dataArr[i].toLowerCase()){
        dataArr.splice(i, 1);
      }
    }
    fs.writeFile('list.txt', dataArr.join('\n'), function(err) {
      if(err) {
        console.log(err);
      } else {
        res.redirect('/');
      }
    })
  })
});

module.exports = router;
