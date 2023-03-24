let signupForm = document.forms["signupForm"];

function validateForm() {
    let usernameVal = usernameInput.value;
    let emailVal = emailInput.value;
    let passwordVal = passwordInput.value;

    usernameVal = usernameVal.trim();
    emailVal = emailVal.trim();
    passwordVal = passwordVal.trim();

    if(usernameVal == "" || emailVal == "" || passwordVal == ""){
        alert("-__- Field Empty!");
        return false;
    }
}

