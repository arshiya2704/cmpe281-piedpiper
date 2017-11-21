const apis = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3002';


export const save = (payload) =>
    fetch(`${apis}/users/api/save`,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)

    })
        .then(res => res.json())
        .catch(error => {
            console.log("This is error.");
            return error;
        });

export const getCards = () =>
    fetch(`${apis}/users/api/get`,{
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },

    })
        .then(res => res.json())
        .catch(error => {
            console.log("This is error.");
            return error;
        });
