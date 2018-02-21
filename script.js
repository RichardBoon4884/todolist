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

function editTask(id, event) {
    let title = event.target.parentNode.firstChild.nodeValue;
    let list = currentList;

    title = prompt("Please enter a title", title);

    let data = [{
        id: id,
        title: title,
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
            getAllTasks(currentList)
        }).catch(function(error) {
        console.log('Request failed', error);
    });
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
            getAllTasks(currentList);
            document.getElementsByName('taskTitle')[0].value = "";
        }).catch(function(error) {
        console.log('Request failed', error);
    });

}

function getAllTasks(list) {
    fetch('api/tasks/?action=index&list=' + list)
        .then(status)
        .then(json)
        .then(function(data) {
            let task = document.getElementById('task');
            task.innerHTML = templates.tasks(data);
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
            getAllTasks(currentList)
        }).catch(function(error) {
        console.log('Request failed', error);
    });
}

function getAllLists() {
    fetch('api/lists/?action=index')
        .then(status)
        .then(json)
        .then(function(data) {
            let list = document.getElementById('list');

            list.innerHTML = templates.lists(data);
        }).catch(function(error) {
        console.error('Request failed', error);
    });
}

function ChangeList(id) {
    currentList = Number(id);
    getAllTasks(currentList);
}

function removeList(id) {
    if (id === 1) {
        alert("Inbox can't be removed!");
        return false;
    }

    console.log(id);

    let data = [{
        id: id
    }];
    fetch('api/lists/?action=delete', {
        method: "POST",
        body: JSON.stringify(data)
    })
        .then(status)
        .then(json)
        .then(function(data) {
            currentList = 1;
            getAllLists();
            getAllTasks(currentList)
        }).catch(function(error) {
        console.log('Request failed', error);
    });
}

function addList() {
    let list = currentList;

    let data = [{
        title: document.getElementsByName('listTitle')[0].value,
    }];

    fetch('api/lists/?action=insert&list=' + list, {
        method: "POST",
        body: JSON.stringify(data)
    })
        .then(status)
        .then(json)
        .then(function(data) {
            getAllLists();
            getAllTasks(currentList);
            document.getElementsByName('listTitle')[0].value = "";
        }).catch(function(error) {
        console.log('Request failed', error);
    });
}

function editList(id, event) {
    if (id === 1) {
        alert("Inbox can't be edit!");
        return false;
    }

    let title = event.target.parentNode.firstChild.nodeValue;
    let list = currentList;

    title = prompt("Please enter a title", title);
    if (title === null) {
        return false;
    }

    let data = [{
        id: id,
        title: title
    }];

    fetch('api/lists/?action=insert', {
        method: "POST",
        body: JSON.stringify(data)
    })
        .then(status)
        .then(json)
        .then(function(data) {
            getAllLists();
            ChangeList(id);
        }).catch(function(error) {
        console.log('Request failed', error);
    });
}

window.onload = () => {
    let main = document.getElementsByTagName('main')[0];
    main.innerHTML = templates.index();

    getAllLists();
    getAllTasks(currentList);
};