const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3000'

const headers = {
    'Accept': 'application/json'
};

export const getPersonalCartItems = (payload) =>
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


export const removeFromPersonalCart = (payload) =>
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