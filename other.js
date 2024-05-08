import { renderComments } from "./render.js";
import { comments } from "./api.js";
import { addComment } from "./api.js";

export const lastCommentDeleteButton = document.querySelector('.delete-last-comment');
export const massageSendButton = document.querySelector('.add-form-button');

export const setInputValidation = (inputElement) => {
    inputElement.oninput = () => {
        if (inputElement.value.charAt(0) === ' ') {
            inputElement.value = '';
        }
    };
};

export const enableButtonOnInput = (InputElement, buttonElement) => {
    InputElement.addEventListener("input", () => {
       buttonElement.disabled = false;
    });
};

export const editButtonListners = () => {
  const editButtonElements = document.querySelectorAll(".edit");
  for (const editButtonElement of editButtonElements) {
    editButtonElement.addEventListener("click", (event) => {
      event.stopPropagation();
      comments[editButtonElement.dataset.index].isEdit = false;
      renderComments({comments});
    })
  }
}

export const doneButtonListners = () => {
  const doneButtonElements = document.querySelectorAll(".done");
  for (const doneButtonElement of doneButtonElements) {
    doneButtonElement.addEventListener("click", (event) => {
      event.stopPropagation();
      const done = doneButtonElement.dataset.index;
      const addFormTextEdit = document.querySelectorAll(".addformedit");
      comments[done].massage = addFormTextEdit[done].value;
      comments[done].isEdit = true;
      renderComments({comments});
    })

  }
}

export const quoteElementsListners = () => {
  const quoteElements = document.querySelectorAll(".comment-text");
  for (const quoteElement of quoteElements) {
    quoteElement.addEventListener("click", () => {
      const quote = quoteElement.dataset.index;
      commitInputElement.value = ">" + comments[quote].massage + "\n" + comments[quote].name + "\n";
      renderComments({comments});
    })
  }
}

export const massageSendListners = (massageSendButton, addComment) => {
  return massageSendButton.addEventListener("click", addComment);

}






//Не работает
export const lastCommentDelete = (lastCommentDeleteButton, comments, renderComments) => {
    lastCommentDeleteButton.addEventListener("click", () => {
      if (comments.length > 0) {
        comments.pop();
        renderComments({comments});
      }
    })
  };