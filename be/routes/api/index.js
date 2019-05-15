var express = require('express');
var createError = require('http-errors');
var router = express.Router();

//미들웨어1
router.all('*', function(req, res, next) {  
  if (req.path === '/xxx') return res.send({ status : 'OK'})
  next()
});


/* GET home page. */
router.use('/test', require('./test'));
router.use('/user', require('./user'));
router.use('/register', require('./register'));
router.use('/login', require('./login'));

router.all('*', function(req, res, next) {
  next(createError(404, 'API를 찾을 수 없습니다.'));
});

module.exports = router;
