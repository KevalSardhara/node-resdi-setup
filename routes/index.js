var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
console.log("IT11111 add here");
console.log("IT add here");

router.get('/about_section', function(req, res, next) {
  res.render('index', { title: 'Express_About' });
});
router.get('/about_section', function(req, res, next) {
  res.render('index', { title: 'Express_About' });
});
router.get('/about_section', function(req, res, next) {
  res.render('index', { title: 'Express_About' });
});

router.get('/about', function(req, res, next) {
  res.render('index', { title: 'Express_About' });
});
router.get('/info', function(req, res, next) {
  res.render('index', { title: 'Express_Info' });
});

module.exports = router;
