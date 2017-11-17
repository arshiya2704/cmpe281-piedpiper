const api = 'http://localhost:3000';
var fetch = require('node-fetch');
const headers = {
    'Accept': 'application/json'
};

const getPersonalCartItems = (payload) =>
fetch(`${api}/getPersonalCartItems`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
}).then(res => {
    return res;
})
    .catch(error => {
        console.log("This is error");
        return error;
});

const removeFromPersonalCart = (payload) =>
fetch(`${api}/removeFromPersonalCart`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
}).then(res => {
    return res;
})
    .catch(error => {
        console.log("This is error");
        return error;
});

exports.getPersonalCartItems = getPersonalCartItems;
exports.removeFromPersonalCart=removeFromPersonalCart;