import { comments, getComments } from "./api.js";
import { addComment } from "./api.js";
import { renderComments } from "./render.js";
import { nameInputElement, commitInputElement } from "./api.js";
import { setInputValidation, lastCommentDelete, lastCommentDeleteButton, massageSendButton, massageSendListners, enableButtonOnInput, editButtonListners, doneButtonListners, quoteElementsListners } from "./other.js";


massageSendButton.disabled = true;


  getComments();
  renderComments({comments});

  //Условное ветвление отрабатывает невозможность ввода первой буквы в виде пробела
  setInputValidation(nameInputElement);
  setInputValidation(commitInputElement);

  enableButtonOnInput(nameInputElement, massageSendButton);
  enableButtonOnInput(commitInputElement, massageSendButton);

  lastCommentDelete(lastCommentDeleteButton);

  editButtonListners();

  doneButtonListners();

  quoteElementsListners();

  massageSendListners(massageSendButton, {addComment});
