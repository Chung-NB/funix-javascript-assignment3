'use strict';

/* ---------------------------------
--- RUN WHEN PAGE IS FIRST LOADED --
--------------------------------- */
start();

function start() {
    createNewUser();
}

/* ---------------------------------
---------- CREATE NEW USER ---------
--------------------------------- */
function createNewUser() {
    // get input data
    const inputFirstNameBlock = document.querySelector('#input-firstname');
    const inputLastNameBlock = document.querySelector('#input-lastname');
    const inputUsernameBlock = document.querySelector('#input-username');
    const inputPasswordBlock = document.querySelector('#input-password');
    const inputPasswordConfirmBlock = document.querySelector('#input-password-confirm');
    // get event click on register btn
    const registerBtn = document.querySelector('#btn-submit');
    registerBtn.addEventListener('click', () => {
        handleValidateNewUser(inputFirstNameBlock.value, inputLastNameBlock.value, inputUsernameBlock.value, inputPasswordBlock.value, inputPasswordConfirmBlock.value);
    });
}

/* ---------------------------------
----- HANDLE VALIDATE NEW USER -----
--------------------------------- */
function handleValidateNewUser(firstName, lastName, userName, pw, pwc) {
    // check no input is empty
    let checkInput = 0;
    const checkEmptyInput = [];
    !firstName && checkEmptyInput.push('First Name');
    !lastName && checkEmptyInput.push('Last Name');
    !userName && checkEmptyInput.push('Username');
    !pw && checkEmptyInput.push('Password');
    !pwc && checkEmptyInput.push('Confirm Password');
    
    if (checkEmptyInput.length === 1) {
        alert(`The following field is empty: ${checkEmptyInput.join('')}.`);
    }
    else if (checkEmptyInput.length > 1) {
        alert(`The following fields are empty: ${checkEmptyInput.join(', ')}.`);
    }
    else {
        checkInput = 1;
    }

    // check username not already existed
    let checkUsername = 0;
    const existedUser = userArr.find(user => user.userName === userName);
    if (userName !== '' && existedUser) {
        alert(`Username '${userName}' already existed, please choose another one.`);
    }
    else {
        checkUsername = 1;
    }

    // check pw >= 8 chars, and password === confirm password
    let checkPw = 0;
    const msg2 = (pw === pwc) ? 1 : 0;
    if (pw && pwc) {
        if (pw.length < 8 || !msg2) {
            alert('Make sure that password has more than or equal to 8 characters, and the comfirm password is correctly matched.');
        }
        else {
            checkPw = 1;
        }
    }

    // if all satisfied, create and add new user
    if (checkInput && checkUsername && checkPw) {
        // create and add new user
        userArr.push(new User(firstName, lastName, userName, pw));
        setLocalStorage('userArr', userArr);
        // get userArr again
        userArr = getLocalStorage('userArr');
        // init user to do list, add to todoArr and save on local storage
        todoArr.push({
            userName,
            userTodoList: []
        })
        setLocalStorage('todoArr', todoArr);
        todoArr = getLocalStorage('todoArr');
        // reset input fields
        resetInputFields();
        // move to login page
        window.location.href = './login.html';
    }
}

/* ---------------------------------
----- HANDLE VALIDATE NEW USER -----
--------------------------------- */
function resetInputFields() {
    // get input data
    const inputFirstNameBlock = document.querySelector('#input-firstname');
    const inputLastNameBlock = document.querySelector('#input-lastname');
    const inputUsernameBlock = document.querySelector('#input-username');
    const inputPasswordBlock = document.querySelector('#input-password');
    const inputPasswordConfirmBlock = document.querySelector('#input-password-confirm');
    // reset input fields
    inputFirstNameBlock.value = '';
    inputLastNameBlock.value = '';
    inputUsernameBlock.value = '';
    inputPasswordBlock.value = '';
    inputPasswordConfirmBlock.value = '';
}