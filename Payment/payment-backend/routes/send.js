const apis = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3002';
var fetch= require ('node-fetch');

const deduct = (payload) =>
fetch(`${apis}/users/api/deduct`, {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
}).then(res => {
    return res.json();
})
.catch(error => {
    console.log("This is error");
return error;});

exports.deduct= deduct;