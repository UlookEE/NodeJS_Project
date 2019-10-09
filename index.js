var express = require('express');
var mysql = require('mysql');
var dbConfig = require('./config/database.js');
var connection = mysql.createConnection(dbConfig);

connection.query('select idx,title,writer,hit,DATE_FORMAT(moddate, "%Y/%m/%d %T") as moddate from board',function(err,rows) {
  if (!err)
    console.log('The solution is: ', rows);
  else
    console.log('Error while performing Query.', err);
});
