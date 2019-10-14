var express = require('express');
require('express-async-errors');
var path = require('path');
var bodyParser = require('body-parser');

var board = require('./routes/board');

var app = express();
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/board', board);
app.get('/', (req, res) => {
  res.send('Root');
});

const server = app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + server.address().port);
});