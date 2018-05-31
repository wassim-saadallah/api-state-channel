var express = require('express');
var router = express.Router();
var user = require('../models/user')
var api = require('../models/api');
var request = require('request');
var getURLOrigin = require('get-url-origin')

router.post('/', function (req, res, next) {
    let newUser = new user({
        uid: req.body.uid,
        add: req.body.add,
        api_ids: req.body.api_id == null ? [] : [req.body.api_id]
    });
    newUser.save(err => {
        if (err)
            return res.status(500).send(err);
        return res.status(200).send(newUser);
    });
})

router.post('/:id/api', (req, res, next) => {
    api.findOne({ _id: req.body.apiId }, (err, api) => {
        if (err) res.status(500).send(err)
        let origin = getURLOrigin.getURLOrigin((api.URIs[0].uri));
        console.log('sending request to ' + origin + '/clients')
        request.post(origin + '/clients/', function (err, httpResponse, body) {
            if (err) {
                console.log(err)
                return res.status(500).send(err)
            }
            console.log(body)
            user.findOne({ uid: req.params.id }, (err, result) => {
                if (err)
                    res.status(404).send(err)
                if (result.api_ids.indexOf(req.body.apiId) < 0)
                    result.api_ids.push(req.body.apiId)
                result.save(result, function (err, done) {
                    if (err)
                        return res.status(500).send(err);
                    return res.status(200).send(result);
                })
            })
        })
            .json({ add: req.body.add, amount: 0, balance: req.body.balance })
    })

})


router.post('/:id/api/delete', (req, res, next) => {
    api.findOne({ _id: req.body.apiId }, (err, api) => {
        if (err) res.status(500).send(err)
        let origin = getURLOrigin.getURLOrigin((api.URIs[0].uri));
        console.log('sending request to ' + origin + '/clients')
        request.delete(origin + '/clients/' + req.body.add, function (err, httpResponse, body) {
            if (err) {
                console.log(err)
                return res.status(500).send(err)
            }
            console.log(body)
            user.findOne({ uid: req.params.id }, (err, result) => {
                if (err)
                    res.status(404).send(err)
                let index = result.api_ids.indexOf(req.body.apiId)
                if (index > 0)
                    result.api_ids.splice(index, 1);
                else if(index == 0){
                    result.api_ids = [];
                }
                result.save(result, function (err, done) {
                    if (err)
                        return res.status(500).send(err);
                    return res.status(200).send(result);
                })
            })
        })
    })
})

router.get('/getAll', function (req, res, next) {
    user.find((err, users) => {
        if (err) res.status(500).send(err)
        res.status(200).send(users)
    })
})

router.get('/:id', function (req, res, next) {
    user.findOne({ uid: req.params.id }, (err, result) => {
        if (err)
            res.status(500).send(err)
        res.status(200).send(result)
    })
})

module.exports = router;

