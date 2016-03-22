var express = require('express');
var router = express.Router();
var fs = require('fs');


/* GET home page. */
router.get('/', function(req, res, next) {
  fs.readFile('list.txt', 'utf8', function(err, data) {
    var list = null;
    if(data){
      list = data.toString().trim().split('\n');
      if(list[list.length - 1] === "\n") list.pop();
      console.log(data.toString().trim().split('\n'));
    }


    res.render('index', {list: list})
  })
});

router.get('/edit/:id', function(req, res, next){
  fs.readFile('list.txt', function(err, data){
    res.render('edit', {item: data.toString().split("\n")[req.params.id],
                        id: req.params.id});
  });
})

router.post('/edit/:id', function(req, res, next){
  console.log("in put");
  if(req.params.id) {
    fs.readFile('list.txt', function(err, data){
      if(err){
        console.log("Reading in edit error: " + err);
      }else{
        data = data.toString().split('\n');
        data.splice(req.params.id, 1, req.body.name);
        console.log(data);
        console.log(req.params.id);
        fs.writeFile('list.txt', data.join('\n') ,function(err){
          if(err) console.log(err);
        })
      }
    })
  }
  res.redirect('/');
})

router.post('/', function(req, res, next) {
  method = req.body.method
  if(method && method.toUpperCase() === "DELETE"){
    if(req.body.item) {
      fs.readFile('list.txt', function(err, data){
        if(err){
          console.log("Reading in Delete error: " + err);
        }else{
          console.log("in delete");
          data = data.toString().split('\n');
          data.splice(req.body.item, 1);
          fs.writeFile('list.txt', data.join('\n') ,function(err){
            if(err) console.log(err);
          })
        }
      })
    }
    res.redirect('/');
  } else if (!req.body.method) {
    console.log("in post");
    if(req.body.name) {
      fs.appendFile('list.txt', req.body.name + "\n", function(err){
        if(err) {
          console.log(err);
        } else {
          res.redirect('/');
        }
      })
    }else{
      res.render('index', {error: "No name provided"})
    }
  }

});

module.exports = router;
