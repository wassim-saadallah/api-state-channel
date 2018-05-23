var express = require('express');
var router = express.Router();
var api = require('../models/api')
var user = require('../models/user')
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

router.post('/user', function (req, res, next) {
  let newUser = new user({
    uid: req.body.uid,
    api_ids: [req.body.api_id] || []
  });
  newUser.save(err => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(newUser);
  });
})

router.get('/users', function(req, res, next){
  user.find((err, users) => {
    if (err) res.status(500).send(err)
    res.status(200).send(users)
  })
})

module.exports = router;

