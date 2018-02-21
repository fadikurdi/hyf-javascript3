"use strict"

{
    const searchValue = document.getElementById('input');


    document.getElementById('rep_Button')
        .addEventListener('click', hyfRep, true);


    document.getElementById('user_Button')
        .addEventListener('click', hyfUser, true);



    function fetchJSON(url) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.responseType = 'json';
            xhr.onload = () => resolve(xhr.response);
            xhr.onerror = () => reject(xhr.statusText);
            xhr.send();
        }
        );
    }

    function hyfRep(data) {
        fetchJSON('https://api.github.com/repos/HackYourFuture/' + searchValue.value).then(data => {
            if (data.message) {
                createAndAppend('h1', rep, 'this repository does not exist ');
            } else {

                const repLink = data.svn_url;

                const contributorsUrl = data.contributors_url;
                const hyfRepLink = '<a href="' + repLink + '">' + 'View ' + data.name + '</a>';

                createAndAppend('h1', rep, 'Repository Name : ' + data.name);
                createAndAppend('h2', rep, 'Description : ' + data.description);
                createAndAppend('h4', rep, ' Created at : ' + data.created_at);
                createAndAppend('h4', rep, ' Updated at ' + data.updated_at);
                createAndAppend('h4', rep, 'Pushed at : ' + data.pushed_at);
                createAndAppend('h4', rep, ' Forks : ' + data.forks);
                createAndAppend('h4', rep, 'On Branch : ' + data.default_branch);
                createAndAppend('h4', rep, hyfRepLink);

                fetchJSON(contributorsUrl).then(data => {
                    createAndAppend('h2', rep, 'Contributors : ');

                    data.forEach(element => {

                        const contributorImg = element.avatar_url;
                        const contributorImgLink = '<img src="' + contributorImg + '">';

                        createAndAppend('h3', rep, 'Name : ' + element.login);
                        createAndAppend('div', rep, contributorImgLink);
                        createAndAppend('h3', rep, 'contributions : ' + element.contributions);
                    });


                })

            }
        });

    }

    function hyfUser() {
        fetchJSON("https://api.github.com/users/" + searchValue.value + "/repos").then(data => {
            if (data.message) {
                createAndAppend('h1', users, 'this user does not exist');
            } else {

                createAndAppend('h1', users, data[0].owner.login);
                const userImg = '<img id="userImg" src="' + data[0].owner.avatar_url + '">';
                createAndAppend('div', users, userImg);
                createAndAppend('h3', users, '<a href="' + data[0].owner.html_url + '">' + 'visit user' + '</a>');
                createAndAppend('h1', users, 'Repositories :');

                createAndAppend('h4', users, data.created_at);

                for (const key in data) {

                    let userInfo = " ";

                    userInfo += '<div id =' + data[key].name + '>' + '<br>'
                        + '<h2>' + '- Name : ' + data[key].name + '</h2>'
                        + '<h3>' + 'Description : ' + data[key].description + '</h3>'
                        + '<h4>' + 'Created at : ' + data[key].created_at + '</h4>'
                        + '<h4>' + 'Updated at : ' + data[key].updated_at + '</h4>'

                        + '</div>';



                    createAndAppend('div', users, userInfo);

                    fetchJSON(data[key].contributors_url).then(contData => {
                        for (let i = 0; i < contData.length; i++) {
                            let element = contData[i].login;
                            createAndAppend('h1', users, element);


                        }








                    }

                    );

                };
            };
        }




        )
    };

    // + '<h3>' + 'Contributors : ' + contributorsName[i] + '</h3>' + '<br>'




    function createAndAppend(name, parent, innerHTML) {
        const child = document.createElement(name);
        parent.appendChild(child);
        if (innerHTML !== undefined) {
            child.innerHTML = innerHTML;
        }
        return child;
    }

}