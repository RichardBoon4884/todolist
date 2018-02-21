(function() {
    let head = document.getElementsByTagName('head')[0];
    let headScript = document.getElementsByTagName('script')[0];

    let scriptTemplate = document.createElement('script');
    scriptTemplate.type = "text/javascript";
    scriptTemplate.src = "template.js";
    headScript.insertBefore(scriptTemplate, headScript.childNodes[3]);
    headScript.parentNode.insertBefore(scriptTemplate, headScript.nextSibling);

    window.onload = () => {
        let main = document.getElementsByTagName('main')[0];
        main.innerHTML = "<section id='list'></section><section id='task'></section>"
    };
})(); // Initializings

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

fetch('api/tasks/?action=index&list=1')
    .then(status)
    .then(json)
    .then(function(data) {
        let list = document.getElementById('list');

        list.innerHTML = templates.index(data);
    }).catch(function(error) {
    console.log('Request failed', error);
});

