import { comments } from "./api.js";
import { user } from "./main.js";

export const doneButtonListners = () => {
  if(!user) return;
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