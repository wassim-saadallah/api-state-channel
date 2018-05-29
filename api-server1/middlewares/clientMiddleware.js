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
    if (Object.keys(req.headers).indexOf('api-key') < 0) {
        console.log('not found');
        return res.status(403).send({ message: 'no api key found' });
    }
    let apiKey = req.headers['api-key'];
    let add = web3.eth.personal.ecRecover(web3.utils.sha3("" + callCost), apiKey)
    add.then(address => {
        console.log(address)
        let client = clients.getClient(address);
        console.log('client', client)
        if (client.balance < callCost)
            return res.status(403).send({ message: 'invalid api key' });
        clients.pay(address);
        return next();
    })
    .catch((err) =>{
        console.log(err)
        return res.status(403).send({ message: 'invalid api key' });
    })
    

}