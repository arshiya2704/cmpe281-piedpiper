const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3000'

const headers = {
    'Accept': 'application/json'
};

export const createGroup = (payload) =>
    fetch(`${api}/creategroup`, {
        method:'POST',
        headers:{
            ...headers,
            'Content-Type':'application/json'
        },
        credentials:'include'
        body:JSON.stringify(payload)
    }).then(res => {
        return res
    })

export const doLogin = (payload) =>
    fetch(`${api}/login`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        console.log(res);
        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const logout = () =>
    fetch(`${api}/logout`, {
        method: 'POST',
        headers: {
            ...headers
        },
        credentials:'include'
    }).then(res => {
        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });
