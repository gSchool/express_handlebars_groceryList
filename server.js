var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var index = require('./routes/index');

var app = express();
app.set('port', (process.env.PORT || 3000));

app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.use(express.static(path.join(__dirname,'dist')));
app.engine('jsx', require('express-react-views').createEngine({beautify: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/',  index);

app.listen(app.get('port'), function() {
  console.log('Server started:' + app.get('port') + '/');
});
