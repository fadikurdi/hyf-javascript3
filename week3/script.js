"use strict";

{
    const searchValue = document.getElementById('input');


    const users = document.getElementById('users');
    const rep = document.getElementById('rep');


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

    function hyfRep() {
        fetchJSON('https://api.github.com/repos/HackYourFuture/' + searchValue.value).then(data => {
            if (data.message) {
                users.innerHTML = "";
                rep.innerHTML = "";
                createAndAppend('h1', rep, 'this repository does not exist ');
            } else {
                rep.innerHTML = "";
                users.innerHTML = "";


                const repLink = data.svn_url;

                const contributorsUrl = data.contributors_url;
                const hyfRepLink = '<a href="' + repLink + '">' + 'View ' + data.name + '</a>';

                createAndAppend('h1', rep, 'Repository Name : ' + data.name);
                createAndAppend('h2', rep, 'Description : ' + data.description);
                createAndAppend('h3', rep, ' Created at : ' + data.created_at);
                createAndAppend('h3', rep, ' Updated at ' + data.updated_at);
                createAndAppend('h3', rep, 'Pushed at : ' + data.pushed_at);
                createAndAppend('h3', rep, ' Forks : ' + data.forks);
                createAndAppend('h3', rep, 'On Branch : ' + data.default_branch);
                createAndAppend('h3', rep, hyfRepLink);

                fetchJSON(contributorsUrl).then(data => {
                    createAndAppend('h2', rep, 'Contributors : ');

                    data.forEach(element => {

                        const contributorImg = element.avatar_url;
                        const contributorImgLink = '<img src="' + contributorImg + '">';

                        createAndAppend('h2', rep, ' - Name : ' + element.login);
                        createAndAppend('div', rep, contributorImgLink);
                        createAndAppend('h2', rep, 'contributions : ' + element.contributions);
                    });


                });

            }
        });

    }

    function hyfUser() {
        fetchJSON("https://api.github.com/users/" + searchValue.value + "/repos").then(data => {
            if (data.message) {
                users.innerHTML = "";
                rep.innerHTML = "";
                createAndAppend('h1', users, 'this user does not exist');
            } else {
                users.innerHTML = "";
                rep.innerHTML = "";

                const userName = document.createElement('h1');
                userName.innerHTML = data[0].owner.login;
                users.appendChild(userName);


                const userImg = document.createElement('img');
                userImg.setAttribute('src', data[0].owner.avatar_url);
                users.appendChild(userImg);

                const userLink = document.createElement('a');
                userLink.setAttribute('href', data[0].owner.html_url);
                userLink.innerHTML = '<h3>' + 'Visit user' + '</h3>';

                users.appendChild(userLink);
                // createAndAppend('h3', users, '<a href="' + data[0].owner.html_url + '">' + 'visit user' + '</a>');
                createAndAppend('h1', users, 'Repositories :');

                for (const key in data) {

                    const repositoryDiv = document.createElement('div');
                    repositoryDiv.setAttribute('id', data[key].name);

                    const nameOfRep = document.createElement('h2');
                    const description = document.createElement('h3');
                    const created = document.createElement('h3');
                    const updated = document.createElement('h3');
                    createAndAppend('h2', users, '<br>' + '<~~~~~~~~~~~~~~~~>')
                    nameOfRep.innerHTML = '-Repository name : ' + data[key].name;
                    description.innerHTML = 'Description : ' + data[key].description;
                    created.innerHTML = 'Created at : ' + data[key].created_at;
                    updated.innerHTML = 'Updated at : ' + data[key].updated_at;

                    users.appendChild(repositoryDiv);
                    repositoryDiv.appendChild(nameOfRep);
                    repositoryDiv.appendChild(description);
                    repositoryDiv.appendChild(created);
                    repositoryDiv.appendChild(updated);

                    createAndAppend('h1', repositoryDiv, '<br>' + 'Contributors : ');


                    fetchJSON(data[key].contributors_url).then(contData => {
                        for (let i = 0; i < contData.length; i++) {

                            const ContributorName = document.createElement('h2');
                            const ContributorPic = document.createElement('img');

                            ContributorPic.setAttribute('src', contData[i].avatar_url);
                            ContributorName.innerHTML = contData[i].login;

                            repositoryDiv.appendChild(ContributorName);
                            repositoryDiv.appendChild(ContributorPic);

                        }

                    });
                }
            }
        });
    }

    function createAndAppend(name, parent, innerHTML) {
        const child = document.createElement(name);
        parent.appendChild(child);
        if (innerHTML !== undefined) {
            child.innerHTML = innerHTML;
        }
        return child;
    }

}
