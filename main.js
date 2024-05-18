import { comments, getComments } from "./api.js";
import { addComment } from "./api.js";
import { nameInputElement, commitInputElement } from "./api.js";
import { lastCommentDelete } from "./lastCommentDelete.js";
import { massageSendListners } from "./massageSendListners.js";
import { quoteElementsListners } from "./quoteElementsListners.js";
import { doneButtonListners } from "./doneButtonListners.js";
import { editButtonListners } from "./editButtonListners.js";
import { enableButtonOnInput } from "./enableButtonOnInput.js";
import { setInputValidation } from "./setInputValidation.js";
import { massageSendButton } from "./massageSendListners.js";
import { lastCommentDeleteButton } from "./lastCommentDelete.js";


massageSendButton.disabled = true;




  getComments();


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
