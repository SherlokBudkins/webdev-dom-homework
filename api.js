import { renderComments } from "./render.js";
import { validateInputAndSendMessage } from "./validateInputAndSendMessage.js";
export const nameInputElement = document.querySelector('.add-form-name');
export const commitInputElement = document.querySelector('.add-form-text');
export const loadElement = document.getElementById('loader');
export const massageSendButton = document.querySelector('.add-form-button');
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
    fetch(
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
      //Очистка форм input
    .then(() => {
      nameInputElement.value = "";
      commitInputElement.value = "";
      nameInputElement.classList.remove("errorinput");
      commitInputElement.classList.remove("errorinput");
      return getComments();
    })
    
    .catch((error) => {
        if (error.message === "Сервер сломался") {
        alert("Сервер сломался, попробуй позже");
        nameInputElement.value;
        commitInputElement.value;
        return;
      } if (error.message === "Некорректный запрос") {
        alert("Имя и комментарий должны быть не короче 3 символов");
        nameInputElement.value;
        commitInputElement.value;
      }
       if (error instanceof TypeError) {
       alert("Кажется, у вас сломался интернет, попробуйте позже");
       return;
      }
      console.log(error);
      })
    .then(() => {
      massageSendButton.disabled = false;
      massageSendButton.textContent = 'Написать';
    })
    validateInputAndSendMessage();
  };