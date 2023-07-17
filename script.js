let inputs = Array.from(document.querySelectorAll("form .inputs")),
    inputsText = document.querySelectorAll(".cards #inputs-text"),
    errorMessages = Array.from(document.querySelectorAll("form .message")),
    btnConfirm = document.querySelector("form button");

// Swap
[inputs[0], inputs[1]] = [inputs[1], inputs[0]];
[errorMessages[0], errorMessages[1]] = [errorMessages[1], errorMessages[0]];

inputs.forEach(e => {
    let index = inputs.indexOf(e),
        textHtml = inputsText[index].innerHTML;
    e.addEventListener("keyup", () => {
        inputsText[index].innerHTML = e.value.length === 0 ? textHtml : e.value;
        let indexMessage = e.getAttribute("id") === "exp-y" || e.getAttribute("id") === "cvc" ? index - 1 : index;
        if (e.getAttribute("id") === "card-number") {
            if (event.key !== "Backspace") {
                if (e.value.length === 4 || e.value.length === 9 || e.value.length === 14) {
                    e.value = `${e.value} `;
                }
            }
        }
        if (e.value.length === 0) {
            errorMessages[indexMessage].innerHTML = "can't be blank";
            errorMessages[indexMessage].style.display = "block";
            e.style.borderColor = "hsl(0, 100%, 66%)";
        }
        else {
            errorMessages[indexMessage].style.display = "none";
            e.style.borderColor = "hsl(249, 99%, 64%)";
        }
        if (e.value > 12 && e.getAttribute("id") === "exp-m" && e.value.length !== 0) {
            errorMessages[indexMessage].innerHTML = "Invalid Value";
            errorMessages[indexMessage].style.display = "block";
            e.style.borderColor = "hsl(0, 100%, 66%)";
        }
        let idNames = ["card-number", "exp-m", "exp-y", "cvc"];
        idNames.forEach(element => {
            if (isNaN(e.value.split(" ").join("")) && e.getAttribute("id") === element && e.value.length !== 0) {
                errorMessages[indexMessage].innerHTML = "Wrong format, numbers only";
                errorMessages[indexMessage].style.display = "block";
                e.style.borderColor = "hsl(0, 100%, 66%)";
            }
        });
    });
});

btnConfirm.onclick = function (event) {
    inputs.forEach(e => {
        let index = inputs.indexOf(e)
        let indexMessage = e.getAttribute("id") === "exp-y" || e.getAttribute("id") === "cvc" ? index - 1 : index;
        let idNames = ["card-number", "exp-m", "exp-y", "cvc"];
        idNames.forEach(element => {
            if (isNaN(e.value.split(" ").join("")) && e.getAttribute("id") === element && e.value.length !== 0) {
                event.preventDefault();
                errorMessages[indexMessage].innerHTML = "Wrong format, numbers only";
                errorMessages[indexMessage].style.display = "block";
                e.style.borderColor = "hsl(0, 100%, 66%)";
            }
        });
        if (e.value.length === 0) {
            event.preventDefault();
            errorMessages[indexMessage].style.display = "block";
            e.style.borderColor = "hsl(0, 100%, 66%)";
        }
        else {
            event.preventDefault();
            document.querySelector("form").style.display = "none";
            document.querySelector(".completed").style.display = "flex";
        }
    });
}