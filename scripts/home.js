'use strict';

/* ---------------------------------
--- RUN WHEN PAGE IS FIRST LOADED --
--------------------------------- */
start();

function start() {
    loadUserData(currentUser);
    logOut();
};

/* ---------------------------------
------ LOAD CORRESPONDING DATA -----
--------------------------------- */
function loadUserData(curUser) {
    // get DOM elements
    const welcomeBlock = document.querySelector('#welcome-message');
    const logInBlock = document.querySelector('#login-modal');
    const mainContentBlock = document.querySelector('#main-content');
    // render corresponding data
    if (JSON.stringify(curUser) !== '{}') {
        welcomeBlock.textContent = `Welcome ${curUser.userName}`;
        mainContentBlock.style.display = 'block';
        logInBlock.style.display = 'none';
    }
    else {
        logInBlock.style.display = 'block';
        mainContentBlock.style.display = 'none';
    }
};

/* ---------------------------------
-------------- LOG OUT -------------
--------------------------------- */
function logOut() {
    const logOutBtn = document.querySelector('#btn-logout');
    logOutBtn.addEventListener('click', () => {
        // reset data in local storage
        setLocalStorage('currentUser', {});
        currentUser = getLocalStorage('currentUser');

        setLocalStorage('postsPerPage', 3);
        postsPerPage = getLocalStorage('postsPerPage');

        localStorage.setItem('defaultApi', 'https://newsapi.org/v2/top-headlines?country=us&apiKey=b5e0040c3fe24c78aa3f3ae6a39a9a84')
        defaultApi = localStorage.getItem('defaultApi');
        // reset display content
        // const loginBlock = document.querySelector('#login-modal');
        // const mainContentBlock = document.querySelector('#main-content');
        // const welcomeBlock = document.querySelector('#login-modal .content');
        // loginBlock.style.display = 'block';
        // mainContentBlock.style.display = 'none';
        // welcomeBlock.textContent = `Please Login or Register`;d
        // move back to login page
        window.location.href = './pages/login.html';
    })
};