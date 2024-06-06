import { addComment, getComments } from "./api.js";





export const massageSendListners = () => {
  const massageSendButton = document.querySelector('.add-form-button');
  const nameInputElement = document.querySelector('.add-form-name');
  const commitInputElement = document.querySelector('.add-form-text');

  massageSendButton.addEventListener('click', () => {


    massageSendButton.disabled = true;
    massageSendButton.textContent = 'Ждите....';

    addComment(nameInputElement.value, commitInputElement.value)
    .then(() => {
      nameInputElement.value = "";
      commitInputElement.value = "";
      nameInputElement.classList.remove("errorinput");
      commitInputElement.classList.remove("errorinput");
      return getComments();
    })
    .then(() => {
      massageSendButton.disabled = false;
      massageSendButton.textContent = 'Написать';
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
      .finally(() => {
        massageSendButton.disabled = false;
        massageSendButton.textContent = 'Написать';
      });
  });
};