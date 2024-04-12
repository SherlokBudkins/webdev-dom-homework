import { comments, getComments } from "./api.js";
import { addComment } from "./api.js";
import { renderComments } from "./render.js";


const nameInputElement = document.querySelector('.add-form-name');
const commitInputElement = document.querySelector('.add-form-text');
const listElement = document.querySelector('.comments');
const massageSendButton = document.querySelector('.add-form-button');
const lastCommentDeleteButton = document.querySelector('.delete-last-comment');
massageSendButton.disabled = true;


getComments();
renderComments({ comments });

//Условное ветвление отрабатывает невозможность ввода первой буквы в виде пробела
nameInputElement.oninput = () => {
    if (nameInputElement.value.charAt(0) === ' ') {
        nameInputElement.value = '';
    }
}

commitInputElement.oninput = () => {
    if (commitInputElement.value.charAt(0) === ' ') {
        commitInputElement.value = '';
    }
}

//Функции ответа на комментарий
export const editButtonListners = () => {
    const editButtonElements = document.querySelectorAll(".edit");
    for (const editButtonElement of editButtonElements) {
        editButtonElement.addEventListener("click", (event) => {
            event.stopPropagation();
            comments[editButtonElement.dataset.index].isEdit = false;
            renderComments({ comments });
        })
    }
}


export const doneButtonListners = () => {
    const doneButtonElements = document.querySelectorAll(".done");
    for (const doneButtonElement of doneButtonElements) {
        doneButtonElement.addEventListener("click", (event) => {
            event.stopPropagation();
            const dune = doneButtonElement.dataset.index;
            const addFormTextEdit = document.querySelectorAll(".addformedit");
            comments[done].massage = addFormTextEdit[done].value;
            comments[done].isEdit = true;
            renderComments({ comments });
        })

    }
}


export const quoteElementsListners = () => {
    const quoteElements = document.querySelectorAll(".comment-text");
    for (const quoteElement of quoteElements) {
        quoteElement.addEventListener("click", () => {
            const quote = quoteElement.dataset.index;
            commitInputElement.value = ">" + comments[quote].massage + "\n" + comments[quote].name + "\n";
            renderComments({ comments });
        })
    }
}



massageSendButton.addEventListener("click", addComment);

nameInputElement.addEventListener("input", () => {
    massageSendButton.disabled = false;
})

commitInputElement.addEventListener("input", () => {
    massageSendButton.disabled = false;
})

lastCommentDeleteButton.addEventListener("click", () => {
    if (comments.length > 0) {
        comments.pop();
        renderComments({ comments });
    }
});