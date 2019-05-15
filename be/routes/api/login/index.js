var express = require('express');
var createError = require('http-errors');
var router = express.Router();
const fs = require('fs')
const token = JSON.parse(fs.readFileSync("database_token.txt"))
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: token.ip,
  user: token.user,
  password: token.pass,
  port: token.port,
  database: 'VueAccount'
})

connection.connect()

router.post('/', function (req, res, next) {
  let id = req.body.id;
  let pwd = req.body.pw;

  connection.query(`select * from account where id = "${id}" and pwd = "${pwd}"`, (error, results, fields) => {
    if (error)
      res.send({ success : false })
    else{
      if(results.length > 0)
        res.send({ success : true })
      else
        res.send({ success : false })
    }
  });
});

router.all('*', function (req, res, next) {
  next(createError(404, 'API를 찾을 수 없습니다.'));
});

module.exports = router;
