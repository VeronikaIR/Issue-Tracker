const getLoginInfo = async (email, password) => {
    const url = `http://localhost:3000/users/login?email=${email}&password=${password}`;

    const options = {
        method: 'GET',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    return await sendAndReturnRequest(url, options, showCredentials, handleError);
};

function showCredentials (data) {
    return data;
}

const register = async (userData) => {
    const url = `http://localhost:3000/users/register`;

    const options = {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    };

    return await sendAndReturnRequest(url, options, showCredentials, handleError);
};