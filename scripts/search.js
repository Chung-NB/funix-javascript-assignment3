'use strict';

/* ---------------------------------
--- RUN WHEN PAGE IS FIRST LOADED --
--------------------------------- */
start();

function start() {
    handleSearchByKeyword();
}

/* ---------------------------------
----- HANDLE SEARCH BY KEYWORD -----
--------------------------------- */
function handleSearchByKeyword() {
    // event click on 'search' btn
    const inputBtn = document.querySelector('#btn-submit');
    inputBtn.addEventListener('click', () => {
        // get currentUser and articles
        const curUser = returnUserInstance(currentUser);
        postsPerPage = getLocalStorage('postsPerPage');
        // have not logged in yet
        if (JSON.stringify(curUser) === '{}') {
            alert('You have to log-in first 🥰');
        }
        // logged in
        else {
            const inputValue = document.querySelector('#input-query').value;
            if (inputValue) {
                // get posts per page and current user from local storage
                defaultApi = `https://newsapi.org/v2/top-headlines?country=us&q=${inputValue}&apiKey=b5e0040c3fe24c78aa3f3ae6a39a9a84`;
                // render posts
                curUser.getPosts(defaultApi, postsPerPage);
            }
            else {
                alert('Keyword field cannot be empty 😁');
            }
        }
    })
}

/* ---------------------------------
---- CHECK INPUT KEYWORD OR NOT ----
--------------------------------- */
function checkInputKeyword() {

}