export default async function APICall(_path, _method, _body) {
    const serverURL = 'https://rentflix-server.herokuapp.com/'
    const response = await fetch(serverURL + _path, {
        method: _method,
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.token
        },
        body: JSON.stringify(_body)
    });

    const data = await response.json();
    return data;
}