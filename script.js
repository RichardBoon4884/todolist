(function() {
    let head = document.getElementsByTagName('head')[0];
    let headScript = document.getElementsByTagName('script')[0];

    let scriptTemplate = document.createElement('script');
    scriptTemplate.type = "text/javascript";
    scriptTemplate.src = "template.js";
    headScript.insertBefore(scriptTemplate, headScript.childNodes[3]);
    headScript.parentNode.insertBefore(scriptTemplate, headScript.nextSibling);

    let scriptEventListners = document.createElement('script');
    scriptEventListners.type = "text/javascript";
    scriptEventListners.src = "eventListeners.js";
    headScript.insertBefore(scriptEventListners, headScript.childNodes[3]);
    headScript.parentNode.insertBefore(scriptEventListners, headScript.nextSibling);
})(); // Initializing

// Active list
let currentList = 1;

// Checks the status for the promise
function status(response) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(new Error(response.statusText))
    }
}

// Get the JSON respond for the promise
function json(response) {
    return response.json()
}

// Change a specific task
function editTask(id, event) {
    let title = event.parentNode.parentNode.childNodes[1].innerText; // Getting the title of the task
    let done = document.getElementById("statusCheckbox-" + id).checked;
    let list = currentList;

    if (event.className === "editTaskButton") {
        title = prompt("Please enter a title", title);
    }

    let data = [{
        id: id,
        title: title,
        done: done,
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

// Adds a task to the current selected list
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

// Get all the tasks from the current list
function getAllTasks(list) {
    fetch('api/tasks/?action=index&list=' + list)
        .then(status)
        .then(json)
        .then(function(data) {
            let task = document.getElementById('task');
            task.innerHTML = templates.tasks(data);
            eventListeners.addTasks();
        }).catch(function(error) {
        console.error('Request failed', error);
    });
}

// Remove a specific task
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

// Get all lists
function getAllLists() {
    fetch('api/lists/?action=index')
        .then(status)
        .then(json)
        .then(function(data) {
            let list = document.getElementById('list');

            list.innerHTML = templates.lists(data);
            eventListeners.addLists();
        }).catch(function(error) {
        console.error('Request failed', error);
    });
}

// Change active list
function changeList(id) {
    currentList = Number(id);
    getAllTasks(currentList);
}

// Remove list
function removeList(id) {
    if (id == 1) {
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

// Add a new list
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

// Edit list a specif list
function editList(id, event) {
    if (id == 1) {
        alert("Inbox can't be edit!");
        return false;
    }

    let title = event.parentNode.firstChild.nodeValue; // Getting the title of the list
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