import { user } from "./main.js";

export const enableButtonOnInput = (InputElement, buttonElement) => {
    if(!user) return;
    InputElement.addEventListener("input", () => {
       buttonElement.disabled = false;
    });
};