import { UserRepository } from '../../../server/src/database/repositories/UserRepository.js';

document.addEventListener("DOMContentLoaded", ()=>{

    let loginForm = document.querySelector("#login-container");
    let registerForm = document.querySelector("#register-container");

    const loginButton = document.getElementById("loginButton");
    let loginError = document.getElementById("loginError");

    const registerButton = document.getElementById("registerButton");
    let registerUsernameError = document.getElementById("registerUsernameError");
    let registerEmailError = document.getElementById("registerEmailError");
    let registerPasswordError = document.getElementById("registerPasswordError");

    loginButton.addEventListener("click", (event)=>{
        const usernameField = document.getElementById("loginUsername").value;
        const passwordField = document.getElementById("loginPassword").value;

        if(UserRepository.validateUser(usernameField, passwordField)){
            event.preventDefault();
            window.location.assign("../dashboard.html");
        } else {
            event.preventDefault();
            loginError.innerHTML = "Invalid Credentials";
            usernameField.classList.add("error-border");
            passwordField.classList.add("error-border");
        }
    })

    registerButton.addEventListener("click", (event)=>{
        event.preventDefault();
        const usernameField = document.getElementById("registerUsername");
        const emailField = document.getElementById("registerEmail");
        const passwordField = document.getElementById("registerPassword");
        let isUsernameCorrect = false;
        let isEmailCorrect = false;
        let isPasswordCorrect = false;

        if(usernameField.value.length < 3){
            event.preventDefault();
            registerUsernameError.innerHTML = "Username is too short";
            usernameField.classList.add("error-border");
        }else{
            usernameField.classList.remove("error-border");
            registerUsernameError.innerHTML = "";
            isUsernameCorrect = true;
        }

        if(!isValidEmail(emailField.value.trim())){
            event.preventDefault();
            registerEmailError.innerHTML = "Invalid email";
            emailField.classList.add("error-border");
        }else{
            emailField.classList.remove("error-border");
            registerEmailError.innerHTML = "";
            isEmailCorrect = true;
        }

        if(!isValidPassword(passwordField.value.trim())){
            event.preventDefault();
            registerPasswordError.innerHTML = "Password must contain uppercase and lowercase letters, number and '?'";
            passwordField.classList.add("error-border");
        }else{
            passwordField.classList.remove("error-border");
            registerPasswordError.innerHTML = "";
            isPasswordCorrect = true;
        }


        if(isUsernameCorrect && isEmailCorrect && isPasswordCorrect){
            if(UserRepository.checkIfUserExists(usernameField)){
                //error
                registerUsernameError.innerHTML = "Username already exists";
                usernameField.classList.add("error-border");
            }else{
                usernameField.classList.remove("error-border");
                registerUsernameError.innerHTML = "";
                
                UserRepository.createUser({name:usernameField,email:emailField,password:passwordField});
                window.location.assign("../dashboard.html");
            }
        }
    })

    document.querySelector("#toRegister")
    .addEventListener("click", (event)=>{
        event.preventDefault();
        registerForm.classList.remove("hidden");
        loginForm.classList.add("hidden");
        clearInputs();
        loginError.innerHTML = "";
    })

    document.querySelector("#toLogin")
    .addEventListener("click", (event)=>{
        event.preventDefault();
        loginForm.classList.remove("hidden");
        registerForm.classList.add("hidden");
        clearInputs();
        registerUsernameError.innerHTML = "";
        registerEmailError.innerHTML = "";
        registerPasswordError.innerHTML = "";
    })

    const clearInputs = ()=>{
        let inputs = document.getElementsByTagName("input");
        var arr = Array.prototype.slice.call(inputs);
        arr.map(x=>{
            x.value = "";
            x.classList.remove("error-border");
        });
    }

    const isValidEmail = (email)=>{
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(String(email).toLowerCase());
    };
    
    const isValidPassword = (password)=>{
        const regex = /(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[!?])[a-zA-Z0-9!?]{6,}/g;
        return regex.test(String(password));
    };
})