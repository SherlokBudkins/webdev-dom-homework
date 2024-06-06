import { renderComments } from "./render.js";
export const loadElement = document.getElementById('loader');
export let comments = [];

const host = 'https://wedev-api.sky.pro/api/v2/anna-terenteva/comments';
const userHost = 'https://wedev-api.sky.pro/api/user/login';
const authHost = 'https://wedev-api.sky.pro/api/user';
export let token;
export const setToken = (newToken) => {
  token = newToken;
};

//Функция получения и преобразования данных с сервера

export function getComments() {
    return fetch(
      host,
      {
        method: "GET",
        forceError: true,
      }
    )
    .then((response) => {
      if (response.status === 500) {
        throw new Error("Сервер сломался");
      }
      return response.json();
    })
      .then((responseData) => {
        const appComments = responseData.comments.map((comment) => {
          return {
            name: comment.author.name,
            date: new Date(comment.date).toLocaleDateString('ru-RU', { year: '2-digit', month: '2-digit', day: '2-digit' }) + ' ' + new Date(comment.date).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
            massage: comment.text,
            likesCounter: comment.likes,
            isLiked: false,
          };
        });
        comments = appComments;
        renderComments();
        loadElement.classList.add('hide');
      })
      .catch((error) => {
        if (error instanceof TypeError) {
       alert("Кажется, у вас сломался интернет, попробуйте позже");
       return;
      }
        alert('Произошла ошибка при загрузке данных: ' + error.message);
    });
  };


  export function addComment(name, text) {

    //Функция добавлений данных на сервер
    return fetch(
      host,
      {
        method: "POST",
        body: JSON.stringify({
          name: name
          .replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;"),
          text: text
          .replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;"),
        }),
        headers: {
          Authorization: `Bearer ${token}`,
        },
        forceError: true,
      }
    )
    .then((response) => {
      if (response.status === 400) {
      throw new Error("Некорректный запрос");
       }
      if (response.status === 500) {
        throw new Error("Сервер сломался");
      }
      else {
        return response.json();
      }
      })

  };

  export function authUser({ login, password }) {
    return fetch(userHost,
      {
        method: "POST",
        body: JSON.stringify({
          login: login.replaceAll('<', '&lt;').replaceAll('>', '&gt;'),
          password: password.replaceAll('<', '&lt;').replaceAll('>', '&gt;'),
        }),
        forceError: true,
      }).then((response) => {
        if (response.status === 500) {
          throw new Error("Сервер упал");
        } else if (response.status === 400) {
          throw new Error('Нет авторизации');
        } else {
          return response.json();
        }
      });
  };
  
  export function regUser({ name, login, password }) {
    return fetch(authHost,
      {
        method: "POST",
        body: JSON.stringify({
          name: name.replaceAll('<', '&lt;').replaceAll('>', '&gt;'),
          login: login.replaceAll('<', '&lt;').replaceAll('>', '&gt;'),
          password: password.replaceAll('<', '&lt;').replaceAll('>', '&gt;'),
        }),
        forceError: true,
      }).then((response) => {
        if (response.status === 500) {
          throw new Error("Сервер упал");
        } else if (response.status === 400) {
          throw new Error('Ошибка авторизации');
        } else {
          return response.json();
        }
      });
  };