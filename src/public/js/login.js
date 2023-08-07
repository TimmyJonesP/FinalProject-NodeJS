const login = document.getElementById('loginForm')

login.addEventListener('submit', e => {
    e.preventDefault();

    const data = new FormData(login);
    const obj = {};

    data.forEach((value, key) => (obj[key] = value));

    const url = "/auth";
    const headers = {
        'Content-Type': 'application/json',
    };
    const method = 'POST';
    const body = JSON.stringify(obj);

    fetch(url, {
        headers,
        method,
        body,
    })
        .then(response => response.json())
        .then(data =>{ console.log(data);
        window.location.href = '/api/products'})
        .catch(error => console.log(error));
});