const fs = require('fs');
const file = fs.readFileSync('clients.json');
let clients = [];
clients = JSON.parse(file);
let callCost = 100000;
console.log(clients)

module.exports = {
    getClients: () => clients,

    getClient: (address) => clients.find(client => client.add === address),

    addClient: (client) => {
        let c = clients.find(el => el.add.toLowerCase() === client.add.toLowerCase());
        console.log(c)
        if (c) {
            c.balance += client.balance;
            return ({ message: "client found, added the amount to balance" })
        }
        console.log(client)
        clients.push(client)
        return ({ message: "client added" });
    },

    deleteClient: (add) => {
        let i = clients.findIndex(el => el.add.toLowerCase() === add.toLowerCase());
        console.log(i)
        if (i) {
            clients.splice(i, 1)
            return { message: "client deleted" }
        }
        else if(i == 0){
            clients = [];
            return { message: "client deleted" }
        }
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
        client.amount++;
    },


    commit: () => fs.writeFileSync('clients.json', JSON.stringify(clients))
}
