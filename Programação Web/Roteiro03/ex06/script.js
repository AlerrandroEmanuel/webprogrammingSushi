let escuro = false;

function modo() {
    if (escuro) {
        document.body.style.backgroundColor = "white";
        document.body.style.color = "black";
        escuro = false;
    } else {
        document.body.style.backgroundColor = "black";
        document.body.style.color = "white";
        escuro = true;
    }
}