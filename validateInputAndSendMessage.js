        //Обработчик клика и проверка ввода
        if (nameInputElement.value === "" && commitInputElement.value === "") {
          nameInputElement.classList.add("errorinput");
          commitInputElement.classList.add("errorinput");
          return
        } else if (nameInputElement.value === "") {
          nameInputElement.classList.add("errorinput");
          return
        } else if (commitInputElement.value === "") {
          commitInputElement.classList.add("errorinput");
          return
        }