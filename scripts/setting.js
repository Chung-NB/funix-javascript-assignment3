'use strict'

/* ---------------------------------
--- RUN WHEN PAGE IS FIRST LOADED --
--------------------------------- */
start();

function start() {
    changeSettings();
}

/* ---------------------------------
---------- CHANGE SETINGS ----------
--------------------------------- */
function changeSettings() {
    // get current user
    const curUser = returnUserInstance(currentUser);
    console.log(curUser);
    // get setting values
    const newsPerPageBlock = document.querySelector('#input-page-size');
    const newsCatBlock = document.querySelector('#input-category');
    let newsPerPage;
    let newsCat = 'General';
    // event change of the 2 inputs
    newsPerPageBlock.addEventListener('change', e => {
        newsPerPage = e.target.value;
    });
    newsCatBlock.addEventListener('change', e => {
        newsCat = e.target.value;
    })
    // event click on 'save settings' btn
    const saveBtn = document.querySelector('#btn-submit');
    saveBtn.addEventListener('click', () => {
        if (JSON.stringify(curUser) !== '{}') {
            if (!Number.isNaN(Number(newsPerPage))) {
                window.location.href = `./news.html?npp=${newsPerPage}&nc=${newsCat}`;
            }
            else {
                alert('Check again news per page!');
            }
        }
        else {
            alert('You have to login firs 🥰');
        }
    })
}