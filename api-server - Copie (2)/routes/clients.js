var express = require('express');
var router = express.Router();

var handler = require('../clientsHandler');

router.get('/', function (req, res, next) {
    console.log(handler.getClients())
    res.send(handler.getClients())
});

router.post('/', function (req, res, next) {
    let result = handler.addClient(req.body);
    handler.commit();
    if (result === null)
        res.status(400).send({ message: "Error" })
    res.status(200).send(result)
});


router.get('/:id', function (req, res, next) {
    const c = handler.getClient(req.params.id)
    if (c)
        res.status(404).send(c)
    res.status(200).send(c);
});


module.exports = router;