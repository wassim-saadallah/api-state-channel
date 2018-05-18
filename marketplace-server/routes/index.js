var express = require('express');
var router = express.Router();
var api = require('../models/api')
var ObjectId = require('mongoose').Types.ObjectId;

router.get('/', function (req, res, next) {
  api.find((err, apis) => {
    if (err) res.status(500).send(err)
    res.status(200).send(apis)
  })
});

router.get('/:id', function (req, res, next) {
  const id = req.params.id;
  console.log(ObjectId("" + id))
  api.findOne({ _id: id }, (err, apis) => {
    if (err) res.status(500).send(err)
    res.status(200).send(apis)
  })
});

router.post('/user', function(req, res, next){
  
})

module.exports = router;

