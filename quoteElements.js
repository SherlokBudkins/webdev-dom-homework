import { comments } from "./api.js";

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