var express = require('express');

var router = express.Router();

router.get('/', function(req, res){
  res.render('index', {
    title: "Shopping",
    content: "This is page description for shopping app"

  });
});

module.exports = router;
