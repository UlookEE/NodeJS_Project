var express = require('express');
var path = require('path');

var app = express();
var board = require('./routes/board');


app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/board', board);
app.get('/', (req, res)=>{
  res.send('Root');
});

app.listen(app.get('port'), ()=>{
  console.log('Express server listening on port ' + app.get('port'));
});

