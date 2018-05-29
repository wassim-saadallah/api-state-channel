let Web3 = require('web3');
var HDWalletProvider = require("truffle-hdwallet-provider");
let clients = require('../clientsHandler')
var mnemonic = "opinion destroy betray ..."; // 12 word mnemonic
var provider = new HDWalletProvider(mnemonic, "https://ropsten.infura.io/");
let web3 = new Web3(provider);
let callCost = 0.00001;

/*
if a client doesnt have the autorization he can't invoke the api
*/
module.exports = function (req, res, next) {
    console.log('waaaaaa', req.headers);
    if (Object.keys(req.headers).indexOf('api-key') < 0) {
        console.log('not found');
        return res.status(403).send({ message: 'no api key found' });
    }
    let apiKey = req.headers['api-key'];
    console.log(typeof apiKey, apiKey);
    let add = web3.eth.personal.ecRecover(web3.utils.sha3("" + callCost), apiKey)
    add.then(address => {
        let client = clients.getClient(res);
        if (client.balance < callCost)
            return res.status(403).send({ message: 'no api key found' });
        clients.addAmount(res, 1);
        return next();
    })
    console.log(add)

}