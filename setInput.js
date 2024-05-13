export const setInputValidation = (inputElement) => {
    inputElement.oninput = () => {
        if (inputElement.value.charAt(0) === ' ') {
            inputElement.value = '';
        }
    };
};