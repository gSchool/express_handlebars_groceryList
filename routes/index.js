var express = require('express');
var fs = require("fs");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  fs.readFile("grocery.txt", "utf-8", function(err,data){
    var list = data.split('\n');
    res.render('index', { list: list});
  });
});

router.get('/edit', function(req, res, next) {
  fs.readFile("grocery.txt", "utf-8", function(err,data){
    var newlist = data.split(',\n');
    newlist = newlist.join("\n");
    res.render('edit', { list: newlist});
  });
});

router.post("/edit", function(req, res, next){
  fs.writeFile("grocery.txt", req.body.newlist, function(err){
      res.redirect('/')
  })
})

router.post("/", function(req, res, next){
  if(req.body.item){
    fs.appendFile("grocery.txt", req.body.item+ "\n", function(err){
      if(err){
        console.log(err)
      } else{
        res.redirect('/')
      }
    })
  } else if (req.body.delete){
    fs.readFile("grocery.txt", "utf-8", function(err, data){
      var list = data.split("\n");
      for (var i = 0; i < list.length; i++) {
        if(list[i] === req.body.delete){
          list.splice(i, 1);
        }
      }
      fs.writeFile("grocery.txt", list.join("\n"), function(err){
      res.redirect("/")
      })
      })
  } else{
    res.redirect("/edit")
  }

});

module.exports = router;
