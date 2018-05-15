var express = require('express');
var router = express.Router();
var fs = require('fs');

var APIs = JSON.parse(fs.readFileSync('api.json'));

router.get('/', function (req, res, next) {
  res.send(APIs)
});

router.get('/:id', function(req, res, next){
  console.log(typeof(+req.params.id))
  res.send(APIs[+req.params.id])
});



module.exports = router;

