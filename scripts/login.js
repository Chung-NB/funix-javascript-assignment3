'use strict';

/* ---------------------------------
--- RUN WHEN PAGE IS FIRST LOADED --
--------------------------------- */
start();

function start() {
    checkLogin();
}

/* ---------------------------------
----------- CHECK LOG IN -----------
--------------------------------- */
function checkLogin() {
    const loginBtn = document.querySelector('#btn-submit');
    loginBtn.addEventListener('click', () => {
        // get input blocks
        const usernameInputBlock = document.querySelector('#input-username');
        const passwordInputBlock = document.querySelector('#input-password');
        // check no empty input
        let checkEmptyInput = 1;
        if (usernameInputBlock.value === '' || passwordInputBlock.value === '') {
            checkEmptyInput = 0;
            alert('Login fail, check again your Username/Password 😋');
        }
        // check input
        if (checkEmptyInput) {
            const inputUser = userArr.find(user => {
                return (user.userName === usernameInputBlock.value && user.password === passwordInputBlock.value);
            })
            if (!inputUser) {
                alert('Login fail, check again your Username/Password 😋');
            }
            else {
                window.location.href = '../index.html';
                setLocalStorage('currentUser', inputUser);
                currentUser = getLocalStorage('currentUser');
            }
        }
    })
}