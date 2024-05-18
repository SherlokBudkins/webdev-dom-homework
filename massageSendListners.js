import { addComment, getComments } from "./api.js";
import { nameInputElement, commitInputElement } from "./api.js";
import { validateInputAndSendMessage } from "./validateInputAndSendMessage.js";

export const massageSendButton = document.querySelector('.add-form-button');


export const sendValidation = () => {
  massageSendButton.addEventListener("click", validateInputAndSendMessage());
}

export const massageSendListners = () => {
  massageSendButton.addEventListener('click', () => {
    massageSendButton.disabled = true;
    massageSendButton.textContent = 'Ждите....'; 

    addComment()
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
  });
};