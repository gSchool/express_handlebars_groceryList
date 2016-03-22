var express = require('express');
var router = express.Router();
var fs = require('fs')

/* GET home page. */
router.get('/', function(req, res, next) {
  fs.readFile('grocerylist.txt', 'utf8', function(err, data){
    var list = data.split('\n');
    if (list[list.length - 1] === ''){
      list.splice(list.length - 1 , 1)
    };
    res.render('index', { title: list });
    // console.log(list);
  })
});

router.post('/', function(req, res, next) {
  if( req.body.name ){
    fs.appendFile('grocerylist.txt', req.body.name + '\n', function(err){
      if (err) {
        console.log(err);
      }else {
        res.redirect('/')
      }
    })
  }else {
    res.render('index', {error: 'No name provided'})
  }
})

router.post('/del/:index',function( req, res, next) {
  fs.readFile('grocerylist.txt', 'utf8', function(err, data){
    var list = data.split('\n');
    list.splice( +req.params.index, 1)
    var join = list.join('\n');
    fs.writeFile('grocerylist.txt', join)
  })
  res.redirect('/')
})

router.post('/edit/:index',function( req, res, next) {
  fs.readFile('grocerylist.txt', 'utf8', function(err, data){
    var list = data.split('\n');
    list[+req.params.index] = req.body.edit;
    var join = list.join('\n');
    fs.writeFile('grocerylist.txt', join)
  })
  res.redirect('/')
})
module.exports = router;
