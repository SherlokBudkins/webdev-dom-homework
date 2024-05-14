import { renderComments } from "./render.js";
import { comments } from "./api.js";

export const lastCommentDeleteButton = document.querySelector('.delete-last-comment');


export const lastCommentDelete = (lastCommentDeleteButton) => {
  lastCommentDeleteButton.addEventListener("click", () => {
    if (comments.length > 0) {
      comments.pop();
      renderComments({ comments });
    }
  });
};