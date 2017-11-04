const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3000'
var fetch = require('node-fetch');

const headers = {
    'Accept': 'application/json'
};

const getItems = () =>
    fetch(`${api}/items`, {
        method: 'GET',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
    }).then(res => {
        return res;
    })
        .catch(error => {
            console.log("This is error");
            return error;
});

exports.getItems = getItems;
