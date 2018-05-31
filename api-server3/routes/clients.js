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
    if (!c)
        res.status(200).send({})
    else
        res.status(200).send(c);
});

router.delete('/:id', function (req, res, next) {
    console.log(req.params.id)
    const c = handler.deleteClient(req.params.id);
    handler.commit();
    if (!c)
        res.status(400).send(c)
    else
        res.status(200).send(c);
});


module.exports = router;