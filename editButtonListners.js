import { comments } from "./api.js";
import { renderComments } from "./render.js";
import { user } from "./main.js";

export const editButtonListners = () => {
  if(!user) return;
    const editButtonElements = document.querySelectorAll(".edit");
    for (const editButtonElement of editButtonElements) {
      editButtonElement.addEventListener("click", (event) => {
        event.stopPropagation();
        comments[editButtonElement.dataset.index].isEdit = false;
        renderComments({comments});
      })
    }
  }