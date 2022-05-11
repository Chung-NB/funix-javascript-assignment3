'use strict';

/* ---------------------------------
--- RUN WHEN PAGE IS FIRST LOADED --
--------------------------------- */
start();

function start() {
    renderTodoList();
    handleChangeTodoIsDone();
    handleDeleteTodoTask();
}

/* ---------------------------------
--------- RENDER TO DO LIST --------
--------------------------------- */
function renderTodoList() {
    // get corresponding user & to do list
    const curUser = returnUserInstance(currentUser);
    if (JSON.stringify(curUser) !== '{}') {
        const {userTodoList} = todoArr.find(todo => todo.userName === curUser.userName);
        // get corresponding to do list
        const todoListDisplayValue = userTodoList.map(todo => {
            const todoUniqueClass = toOneLowerWord(todo.todoName);
            const todoClass = (todo.todoIsDone === 'true') ? `${todoUniqueClass} checked todo` : `${todoUniqueClass} todo`;
            return `<li class="${todoClass}">${todo.todoName}<span class="close ${todoUniqueClass}">×</span></li>`
        })
        // render coresponding to do list
        const todoListDisplayBlock = document.querySelector('#todo-list');
        todoListDisplayBlock.innerHTML = todoListDisplayValue.join('');
    }
}

/* ---------------------------------
---- HANDLE CHANGE TO DO STATUS ----
--------------------------------- */
function handleChangeTodoIsDone() {
    // get to do display block & corresponding to do list
    const curUser = returnUserInstance(currentUser);
    const {userTodoList} = todoArr.find(todo => todo.userName === curUser.userName);

    // event delegation 'click' on tasks
    const todoListDisplayBlock = document.querySelector('#todo-list');
    todoListDisplayBlock.addEventListener('click', e => {
        const clicked = e.target;
        if (clicked.classList.contains('todo')) {
            // toggle class 'checked'
            clicked.classList.toggle('checked');
            // re-assign value for corresponding todoIsDone
            const index = userTodoList.findIndex(todo => todo.todoName.replaceAll(' ', '').toLowerCase() === clicked.classList[0]);
            // re-assign todoIsDone and save changes to local storage
            userTodoList[index].todoIsDone = (clicked.classList.contains('checked')) ? 'true' : 'false';
            const userTodoIndex = todoArr.findIndex(todo => todo.userName === curUser.userName);
            todoArr.splice(userTodoIndex, 1, {
                userName: curUser.userName,
                userTodoList: userTodoList
            });
            setLocalStorage('todoArr', todoArr);
            todoArr = getLocalStorage('todoArr');
        }
    })
}

/* ---------------------------------
----- HANDLE DELETE TO DO TASK -----
--------------------------------- */
function handleDeleteTodoTask() {
    // get to do display block & corresponding to do list
    const curUser = returnUserInstance(currentUser);
    const {userTodoList} = todoArr.find(todo => todo.userName === curUser.userName);
    console.log(userTodoList);

    // event delegation 'click' on tasks
    const todoListDisplayBlock = document.querySelector('#todo-list');
    todoListDisplayBlock.addEventListener('click', e => {
        const clicked = e.target;
        if (clicked.classList.contains('close')) {
            // delete clicked task
            const todoName = clicked.classList[1];
            const todoIndex = userTodoList.findIndex(todo => todo.todoName.replaceAll(' ', '').toLowerCase() === todoName);
            userTodoList.splice(todoIndex, 1);
            // save to local storage after task deleted
            const userTodoIndex = todoArr.findIndex(todo => todo.userName === curUser.userName);
            todoArr.splice(userTodoIndex, 1, {
                userName: curUser.userName,
                userTodoList: userTodoList
            })
            setLocalStorage('todoArr', todoArr);
            todoArr = getLocalStorage('todoArr');
            // re-render tasks
            renderTodoList();
        }
    })
}

/* ---------------------------------
--------- TO ONE LOWER WORD --------
--------------------------------- */
function toOneLowerWord(word) {
    return word
        .replaceAll(' ', '')
        .toLowerCase()
};