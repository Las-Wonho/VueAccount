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
  let sex = req.body.sex;
  let name = req.body.name;
  let age = req.body.age;

  connection.query(`insert into account values("${id}", "${pwd}", "${sex}", "${name}", ${age});`, (error, results, fields) => {
    console.log(error)
    if (error)
      res.send({ success : false })
    else
      res.send({ success : true })
  });
});

router.all('*', function (req, res, next) {
  next(createError(404, 'API를 찾을 수 없습니다.'));
});

module.exports = router;
