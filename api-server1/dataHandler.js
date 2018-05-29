
const fs = require('fs');

let data = [];


module.exports = {

    open: () => {
        const file = fs.readFileSync('data.json');
        data = JSON.parse(file);
    },

    getAll: () => data,

    get: (id) => {
        for (let obj of data) {
            if (obj._id == id) return obj
            else return null
        }
    },

    put: (newObj) => {
        console.log('adding user')
        for (let obj of data) {
            if (obj._id == newObj._id) {

                return null
            }
        }
        data.push(newObj)
        return data
    },

    del: (id) => {
        for (let [index, obj] of data.entries()) {
            if (obj._id == id) {
                let d = data.splice(index, 1)
                return data
            }
        }
        return null
    },

    close: () => fs.writeFileSync('data.json', JSON.stringify(data))
}