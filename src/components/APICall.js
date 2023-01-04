export default async function APICall(_path, _method, _body) {
    const ROOT_URL = 'https://ott-rentals-production.up.railway.app'
    // const ROOT_URL = 'http://localhost:5000'
    const response = await fetch(ROOT_URL + _path, {
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