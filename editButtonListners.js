import { comments } from "./api.js";
import { renderComments } from "./render.js";

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