const fs = require('fs');
const file = fs.readFileSync('clients.json');
let clients = [];
clients = JSON.parse(file);
let callCost = 0.00001;
console.log(clients)

module.exports = {
    getClients: () => clients,

    getClient: (address) => clients.find(client => client.add === address),

    addClient: (client) => {
        let c = clients.find(el => el.add === client.add);
        console.log(c)
        if (c) {
            c.balance += client.balance;
            return({ message: "client found, added the amount to balance" })
        }
        console.log(client)
        clients.push(client)
        return({ message: "client added" });
    },

    addToBalance: (add, amount) => {
        let client = clients.find(client => client.add === add);
        console.log(client)
        client.balance += amount;
    },

    pay: (add) => {
        let client = clients.find(client => client.add === add);
        console.log(client);
        client.balance -= callCost;
        client.amount ++;
    },

    commit: () => fs.writeFileSync('clients.json', JSON.stringify(clients))
}
