class Api {
  constructor({baseUrl, headers}) {
    this._URL = baseUrl;
    this._token = headers.authorization;
  };

  getInitialCards(token) {
    return fetch(`${this._URL}cards`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
      credentials: "include",
    })
        .then(this._handleResponse);
  };

  getUserInfoFromServer(token) {
    return fetch(`${this._URL}users/me`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
      credentials: "include",
    })
        .then(this._handleResponse);
  };

  setUserInfoFromServer(name, about, token) {
    return fetch(`${this._URL}users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      credentials: "include",
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
        .then(this._handleResponse);
  };

  addCardToServer(title, link, token) {
    return fetch(`${this._URL}cards`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      credentials: "include",
      body: JSON.stringify({
        name: title,
        link: link
      })
    })
        .then(this._handleResponse);
  };

  deleteCardFromServer(data, token) {
    return fetch(`${this._URL}cards/${data}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      credentials: "include",
    })
        .then(this._handleResponse);
  };

  changeLikeCardStatus(id, isLiked, token) {
    let method
    if (isLiked) {
      method = 'DELETE'
    } else {
      method = 'PUT'
    }
    return fetch(`${this._URL}cards/${id}/likes`, {
      method: method,
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      credentials: "include",
    })
        .then(this._handleResponse);
  };

  changeAvatar(item, token) {
    return fetch(`${this._URL}users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      credentials: "include",
      body: JSON.stringify({
        avatar: item.avatar,
      })
    })
        .then(this._handleResponse);
  };

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  };

};

const BASE_URL = 'https://api.matrosov.mesto.nomoredomains.rocks/';
const TEST_URL = 'http://localhost:3000/'

const api = new Api({
  baseUrl: TEST_URL,
  headers: {
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
    'Content-Type': 'application/json'
  }
});

export default api;

