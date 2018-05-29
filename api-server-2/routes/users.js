var express = require('express');
var router = express.Router();

var handler = require('../dataHandler');
handler.open();


/* GET users listing. */
router.get('/getAll', function(req, res, next) {
  res.send({result: handler.getAll()});
});

/* GET users listing. */
router.get('/:id', function(req, res, next) {
  res.send({result: handler.get(req.params.id)});
});


/* GET users listing. */
router.post('/', function(req, res, next) {
  res.send({result: handler.put(req.body)});
});


/* GET users listing. */
router.delete('/:id', function(req, res, next) {
  res.send({result: handler.del(+req.params.id)});
});

module.exports = router;
