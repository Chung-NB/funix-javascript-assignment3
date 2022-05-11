'use strict'

/* ---------------------------------
--- RUN WHEN PAGE IS FIRST LOADED --
--------------------------------- */
start();

function start() {
    // get query strings
    const npp = getQueryStrings('npp');
    const nc = getQueryStrings('nc');
    // move without changing settings
    if (!npp & !nc) {
        postsPerPage = getLocalStorage('postsPerPage');
        handleRenderPosts(defaultApi, postsPerPage);
    }
    // move after changing settings
    else {
        // re-assign value for postsPerPage
        setLocalStorage('postsPerPage', npp);
        postsPerPage = getLocalStorage('postsPerPage');
        // render news
        defaultApi = `https://newsapi.org/v2/top-headlines?country=us&category=${nc}&apiKey=b5e0040c3fe24c78aa3f3ae6a39a9a84`;
        handleRenderPosts(defaultApi, postsPerPage);
        // re-assign value for defaultApi
        setLocalStorage('defaultApi', defaultApi);
        defaultApi = localStorage.getItem('defaultApi');
    }
}

/* ---------------------------------
--- HANDLE RENDER POSTS FROM REST --
--------------------------------- */
function handleRenderPosts(link, arcPerPage) {
    const curUser = returnUserInstance(currentUser);
    curUser.getPosts(link, arcPerPage);
}

/* ---------------------------------
--------- GET QUERY STRINGS --------
--------------------------------- */
function getQueryStrings(queryStr, url = window.location.href) {
    queryStr = queryStr.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + queryStr + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}