var express = require('express')
var mysql = require('mysql');

var router = express.Router();
var dbConfig = require('../config/database');

var connection = mysql.createConnection(dbConfig);
  /* GET List Page. */

router.get('/list',function (req,res,next) {
    var query = connection.query('select idx,title,writer,hit,DATE_FORMAT(moddate, "%Y/%m/%d %T") as moddate from board', function(err,rows){
        if(err) console.log(err);        // 만약 에러값이 존재한다면 로그에 표시합니다.
        //console.log(rows);
        res.render('list.ejs', { title:'Post List',rows : rows}); // view 디렉토리에 있는 list 파일로 이동합니다.
    });
});

router.get('/list/:page', function(req, res, next) {
    var query = connection.query('select idx,title,writer,hit,DATE_FORMAT(regdate, "%Y/%m/%d %T") as regdate ,DATE_FORMAT(moddate, "%Y/%m/%d %T") as moddate '+ 
                                 'from board '+
                                 `where idx = ${req.params.page}`, function(err,rows){
        if(err) console.log(err);        // 만약 에러값이 존재한다면 로그에 표시합니다.
        //console.log(rows);
        res.render('read.ejs', { title:'View Post',rows : rows}); // view 디렉토리에 있는 list 파일로 이동합니다.
    });
});

module.exports = router;