const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3000'
var fetch = require('node-fetch');

const headers = {
    'Accept': 'application/json'
};

const createGroup = (payload) =>
    fetch(`${api}/creategroup`, {
        method:'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type':'application/json'
        },
        credentials:'include',
        body:JSON.stringify(payload)
    }).then(res => {
        return res
    })
        .catch(err => {
            console.log("This is error");
            return err;
        })

const getItems = () =>
    fetch(`${api}/items`, {
        method: 'GET',
        headers: {
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
exports.createGroup = createGroup;