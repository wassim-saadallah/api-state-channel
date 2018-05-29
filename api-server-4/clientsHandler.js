const fs = require('fs');
const file = fs.readFileSync('clients.json');
let clients = [];
clients = JSON.parse(file);
console.log('got clients')

module.exports = {
    getClients: () => clients,

    getClient: (add) => clients.find(client => client.add === add),

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

    addAmount: (add, amount) => this.getClient(add).balance += amount,

    commit: () => fs.writeFileSync('clients.json', JSON.stringify(clients))
}
