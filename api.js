import { renderComments } from "./render.js";
export const nameInputElement = document.querySelector('.add-form-name');
export const commitInputElement = document.querySelector('.add-form-text');
export const loadElement = document.getElementById('loader');
export let comments = [];

//Функция получения и преобразования данных с сервера

export function getComments() {
    return fetch(
      'https://wedev-api.sky.pro/api/v1/anna-terenteva/comments',
      {
        method: "GET"
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


  export function addComment() {

    //Функция добавлений данных на сервер
    return fetch(
      'https://wedev-api.sky.pro/api/v1/anna-terenteva/comments',
      {
        method: "POST",
        body: JSON.stringify({
          name: nameInputElement.value
          .replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;"),
          text: commitInputElement.value
          .replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;"),
        })
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