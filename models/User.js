'use strict'

/* ---------------------------------
---- CLASS USER - ARRAY USERARR ----
--------------------------------- */
class User {
    // constructor
    constructor(firstName, lastName, userName, password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        this.password = password;
    }
    // async method get posts
    async getPosts(link, arcPerPage = 3) {
        try {
            // get articles from api
            const response = await fetch(link);
            const news = await response.json();
            const articles = await news.articles;
            // render articles on screen
            this.renderArticles(articles, 1, arcPerPage);
            // handle paginations
            this.handlePagination(articles, arcPerPage);
            return articles;
        }
        catch(err) {
            console.error(`${err.message} 🤬`);
        }
    }
    // method render articles
    renderArticles(ars, pageNumber, arcPerPage) {
        const articlesDisplayBlock = document.querySelector('#news-container');
        const articlesValue = ars.map(ar => {
            return `
            <div class="article">
                <div class="article__img" style="background-image: url('${ar.urlToImage}')"></div>
                <div class="article__content">
                    <h4 class="article__content--heading">${ar.title}</h4>
                    <p class="article__content--description">${ar.description}</p>
                    <a href="${ar.url}" target="_blank" class="article__content--link">View</a>
                </div>
            </div>
            `
        });
        // calc indexes and get corresponding articles with page number
        const topIndex = pageNumber * arcPerPage - 1;
        const bottomIndex = topIndex - arcPerPage + 1;
        const articlesDisplayValue = articlesValue.slice(bottomIndex, topIndex + 1);
        // render articles
        articlesDisplayBlock.innerHTML = articlesDisplayValue.join('');
    }
    // method handle pagination
    handlePagination(ars, arcPerPage = 2) {
        // get page number
        let pageNumber = Number(document.querySelector('#page-num').textContent);
        const maxPageNumber = Math.ceil(ars.length / arcPerPage);
        const paginationBlock = document.querySelector('.pagination');
        // hide prev btn at the first page
        this.paginationBtns(pageNumber, maxPageNumber);
        // event click on pagination btns
        paginationBlock.addEventListener('click', e => {
            // if number of posts is greater than arcPerPage, pagination actives
            // if number of posts is smaller than arcPerPage, pagination doesn't active
            if (ars.length > arcPerPage) {
                const clicked = e.target;
                if (clicked.classList.contains('btn')) {
                    if (clicked.classList.contains('nextBtn')) {
                        pageNumber++;
                        document.querySelector('#page-num').textContent =  pageNumber;
                        this.renderArticles(ars, pageNumber, arcPerPage);
                        this.paginationBtns(pageNumber, maxPageNumber);
                    }
                    else if (clicked.classList.contains('prevBtn')) {
                        pageNumber--;
                        document.querySelector('#page-num').textContent =  pageNumber;
                        this.renderArticles(ars, pageNumber, arcPerPage);
                        this.paginationBtns(pageNumber, maxPageNumber);
                    }
                }
            }
        })
    }
    // show / hide pagination btns
    paginationBtns(num, maxNum) {
        // get pagination btns
        const prevBtn = document.querySelector('#btn-prev');
        const nextBtn = document.querySelector('#btn-next');
        if (num === 1) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'block';
        }
        else if (num === maxNum) {
            nextBtn.style.display = 'none';
            prevBtn.style.display = 'block';
        }
        else {
            prevBtn.style.display = 'block';
            nextBtn.style.display = 'block';
        }
    }
}

/* ---------------------------------
--------- GLOBAL VARIABLES ---------
--------------------------------- */
let userArr = [];
let currentUser = {};
let todoArr = [];
let defaultApi = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=b5e0040c3fe24c78aa3f3ae6a39a9a84';
let postsPerPage = 3;

// init 2 default users
userArr.push(new User('Chung', 'NB', 'ChungNB96', 'nguyenbaochung'));
userArr.push(new User('Van', 'Anh', 'VanhXinhGai', 'vuvananh'));

// init default to do list for default users
todoArr.push({
    userName: 'ChungNB96',
    userTodoList: [
        {todoName: 'Do homework', todoIsDone: 'false'},
        {todoName: 'Check email', todoIsDone: 'true'},
        {todoName: 'Wash dishes', todoIsDone: 'false'},
        {todoName: 'Go to gym', todoIsDone: 'false'},
        {todoName: 'Buy food for tomorrow morning', todoIsDone: 'true'}
    ]
});
todoArr.push({
    userName: 'VanhXinhGai',
    userTodoList: [
        {todoName: 'Feed the cat', todoIsDone: 'false'},
        {todoName: 'Buy vegetables', todoIsDone: 'false'},
        {todoName: 'Go shopping', todoIsDone: 'true'},
        {todoName: 'Finish tasks', todoIsDone: 'true'}
    ]
});

/* ---------------------------------
------------ CLASS TASK ------------
--------------------------------- */
class TodoTask extends User {
    // private fields
    #owner;
    #todoArr = [];
    // constructor
    constructor(userName, todoName, todoIsDone) {
        super(userName);
        this.todoName = todoName;
        this.todoIsDone = todoIsDone;
    }
    // mpublic methods
    setOwner(owner) {
        this.#owner = owner;
    }
    getTodoArr() {
        return this.#todoArr;
    }
}