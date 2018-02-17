"use strict";
{
    document.getElementById('searchButton')
        .addEventListener('click', loadXML, true);


    function loadXML() {

        const userInputValue = document.getElementById('inputField').value;
        const userName = `https://api.github.com/users/${userInputValue}`;
        const userRepoUrl = `https://api.github.com/users/${userInputValue}/repos`;

        function getUserName(link) {
            let xmlNameRequest = new XMLHttpRequest();
            xmlNameRequest.open('GET', userName, true);
            xmlNameRequest.onreadystatechange = function () {
                if (xmlNameRequest.readyState == 4 && xmlNameRequest.status == 200) {
                    const response = JSON.parse(xmlNameRequest.responseText);
                    renderUser(response);
                    // console.log(response);
                }
            };
            xmlNameRequest.onerror = function () {
                console.log(xmlNameRequest.statusText);
            };
            xmlNameRequest.send();


            function renderUser(userApiData) {
                const name = userApiData.name;
                const avatar = userApiData.avatar_url;
                let userInfo = " ";
                userInfo += '<h1>' + name + '</h1>' + '<img src=' + avatar + '/>';
                createAndAppend('div', results, userInfo);
            }
        }


        function getRepXml(link) {
            let xmlRepoRequest = new XMLHttpRequest();
            xmlRepoRequest.open('GET', userRepoUrl, true);
            xmlRepoRequest.onreadystatechange = function () {
                if (xmlRepoRequest.readyState == 4 && xmlRepoRequest.status == 200) {
                    const response = JSON.parse(xmlRepoRequest.responseText);
                    renderRep(response);
                }
            };
            xmlRepoRequest.onerror = function () {
                console.log(xmlRepoRequest.statusText);
            };
            xmlRepoRequest.send();

            function renderRep(repApiData) {
                const reposName = repApiData.map(repo => repo.name);
                reposName.forEach(element => {
                    let repUserInfo = " ";
                    repUserInfo += '<div id =' + 'reposName' + '>'
                        + '<h3>' + 'The repositorie name is : ' + element + '</h3>' +
                        '</div>';
                    createAndAppend('div', results, repUserInfo);
                });
            }
        }


        getUserName(userName);
        getRepXml(userRepoUrl);

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
