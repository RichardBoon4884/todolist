let templates = {
    index: () => {
      return "<section id='taskForm'><input name='taskTitle' type='text'><button type='button' onclick='addTask()'>Add task</button></section><section id='list'></section><section id='task'></section>";
    },
    tasks: (tasks) => {
        let resultHtml = "";

        tasks.forEach((task) => {

            resultHtml += "<li>" + task.title + "<button type='button' onclick='removeTask(" + task.id + ")'>x</button></li>"
        });

        return "<header><h2>Tasks</h2></header><ul>" + resultHtml + "</ul>"
    },
    lists: (lists) => {
        let resultHtmlLi = "";
        let resultHtmlOption = "";

        lists.forEach((list) => {

            resultHtmlLi += "<li>" + list.title + "</li>";
            resultHtmlOption += "<option value='" + list.id + "'>" + list.title + "</option>";
        });

        return "<header><h2>Lists</h2></header><select>" + resultHtmlOption + "</select>"
    }
};