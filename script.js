(function() {
    let head = document.getElementsByTagName('head')[0];
    let headScript = document.getElementsByTagName('script')[0];

    let scriptTemplate = document.createElement('script');
    scriptTemplate.type = "text/javascript";
    scriptTemplate.src = "template.js";
    headScript.insertBefore(scriptTemplate, headScript.childNodes[3]);
    headScript.parentNode.insertBefore(scriptTemplate, headScript.nextSibling);
})(); // Initializings

let currentList = 1;

function status(response) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(new Error(response.statusText))
    }
}

function json(response) {
    return response.json()
}

function addTask() {
    let list = currentList;

    let data = [{
       title: document.getElementsByName('taskTitle')[0].value,
        done: false,
        list: list
    }];

    fetch('api/tasks/?action=insert&list=' + list, {
        method: "POST",
        body: JSON.stringify(data)
    })
        .then(status)
        .then(json)
        .then(function(data) {
            getAllTasks()
        }).catch(function(error) {
        console.log('Request failed', error);
    });

}

function getAllTasks(list) {
    fetch('api/tasks/?action=index&list=' + list)
        .then(status)
        .then(json)
        .then(function(data) {
            let list = document.getElementById('list');

            list.innerHTML = templates.tasks(data);
        }).catch(function(error) {
        console.error('Request failed', error);
    });
}

function removeTask(id) {
    let data = [{
        id: id
    }];
    fetch('api/tasks/?action=delete', {
        method: "POST",
        body: JSON.stringify(data)
    })
        .then(status)
        .then(json)
        .then(function(data) {
            getAllTasks()
        }).catch(function(error) {
        console.log('Request failed', error);
    });
}

window.onload = () => {
    let main = document.getElementsByTagName('main')[0];
    main.innerHTML = templates.index();

    getAllTasks(currentList);
};