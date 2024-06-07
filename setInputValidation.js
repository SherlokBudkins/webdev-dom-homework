import { user } from "./main.js";

export const setInputValidation = (inputElement) => {
    if(!user) return;
    inputElement.oninput = () => {
        if (inputElement.value.charAt(0) === ' ') {
            inputElement.value = '';
        }
    };
};