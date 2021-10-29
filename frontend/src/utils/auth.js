export const BASE_URL = 'https://api.matrosov.mesto.nomoredomains.rocks';
const TEST_URL = 'http://localhost:3000'

export const register = (email, password) => {

  return fetch(`${TEST_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password: password,
      email: email
    }),
    credentials: "include",
  })
      .then((response) => handleResponse(response)).then(data => data);
};
export const authorize = (email, password) => {
  return fetch(`${TEST_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: "include",
    body: JSON.stringify({
      password: password,
      email: email
    })
  })
      .then((response) => handleResponse(response))
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);

          return data;
        }
      })
};
export const checkToken = (token) => {
  return fetch(`${TEST_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    credentials: "include",
  })
      .then((response) => handleResponse(response)).then(data => data);
}

function handleResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};
