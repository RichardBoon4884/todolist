let templates = {
    tasks: (tasks) => {
        let resultHtml = "";

        tasks.forEach((task) => {

            resultHtml += "<li>" + task.title + "</li>"
        });

        return "<header><h2>Tasks</h2></header><ul>" + resultHtml + "</ul>"
    },
    lists: (lists) => {
        let resultHtml = "";

        lists.forEach((list) => {

            resultHtml += "<li>" + list.title + "</li>"
        });

        return "<header><h2>Lists</h2></header><ul>" + resultHtml + "</ul>"
    }
};