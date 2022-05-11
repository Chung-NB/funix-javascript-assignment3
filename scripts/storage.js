'use strict';

/* ---------------------------------
----------- IIFE FIRST RUN ---------
--------------------------------- */
(function() {
    // check existed or not userArr, currentUser, todoArr
    const checkUserArr = getLocalStorage('userArr');
    if (!checkUserArr) {
        setLocalStorage('userArr', userArr);
    }
    
    const checkCurrentUser = getLocalStorage('currentUser');
    if (!checkCurrentUser) {
        setLocalStorage('currentUser', currentUser);
    }

    const checkTodoArr = getLocalStorage('todoArr');
    if (!checkTodoArr) {
        setLocalStorage('todoArr', todoArr);
    }

    const checkApi = localStorage.getItem('defaultApi');
    if (!checkApi) {
        setLocalStorage('defaultApi', defaultApi);
    }

    const checkPostsPerPage = localStorage.getItem('postsPerPage');
    if (!checkPostsPerPage) {
        setLocalStorage('postsPerPage', postsPerPage);
    }

    //  get userArr, currentUser, todoArr from local storage
    userArr = getLocalStorage('userArr');
    currentUser = getLocalStorage('currentUser');
    todoArr = getLocalStorage('todoArr');
    defaultApi = localStorage.getItem('defaultApi');
    postsPerPage = localStorage.getItem('postsPerPage');
})();

/* ---------------------------------
--------- SET LOCAL STORAGE --------
--------------------------------- */
function setLocalStorage(key, value) {
    if (typeof value === 'string') {
        localStorage.setItem(key, value);
    }
    else {
        localStorage.setItem(key, JSON.stringify(value));
    }
}

/* ---------------------------------
--------- GET LOCAL STORAGE --------
--------------------------------- */
function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

/* ---------------------------------
------- RETURN USER INSTANCE -------
--------------------------------- */
function returnUserInstance(user) {
    if (JSON.stringify(user) !== '{}') {
        const userInstance = new User(user.firstName, user.lastName, user.userName, user.password);
        return userInstance;
    }
    else {
        return {};
    }
}

/* ---------------------------------
------- RETURN TASK INSTANCE -------
--------------------------------- */
function returnTaskInstance(task) {
    const taskInstance = new Task(task.userName, task.userTodoList);
    return taskInstance;
}