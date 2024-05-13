export const enableButtonOnInput = (InputElement, buttonElement) => {
    InputElement.addEventListener("input", () => {
       buttonElement.disabled = false;
    });
};