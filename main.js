import { comments, getComments } from "./api.js";
import { addComment } from "./api.js";
import { lastCommentDelete } from "./lastCommentDelete.js";
import { massageSendListners } from "./massageSendListners.js";
import { quoteElementsListners } from "./quoteElementsListners.js";
import { doneButtonListners } from "./doneButtonListners.js";
import { editButtonListners } from "./editButtonListners.js";
import { enableButtonOnInput } from "./enableButtonOnInput.js";
import { setInputValidation } from "./setInputValidation.js";
import { lastCommentDeleteButton } from "./lastCommentDelete.js";
import { renderCommentForm } from "./renderForms.js";
import { renderLoginForm, renderRegForm } from "./login.js";


renderLoginForm();
renderRegForm();

export let user = null;
export function setUser(value) {
  user = value;
}




export function renderApp() {
  const container = document.querySelector('.container');
  container.innerHTML = `
  <ul class="comments" id = 'list'>
  </ul>
  <div class="form"></div>
  <div class="loader"></div>`
  getComments();
  renderCommentForm();
}





  //Условное ветвление отрабатывает невозможность ввода первой буквы в виде пробела
  setInputValidation(nameInputElement);
  setInputValidation(commitInputElement);

  enableButtonOnInput(nameInputElement);
  enableButtonOnInput(commitInputElement);

  lastCommentDelete(lastCommentDeleteButton);

  editButtonListners();

  doneButtonListners();

  quoteElementsListners();

  massageSendListners({addComment});
