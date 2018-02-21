let templates = {
    index: () => {
      return "<section id='taskForm'></section><section id='list'></section><section id='task'></section><input name='taskTitle' type='text'><button type='button' onclick='addTask()'>Add task</button>";
    },
    tasks: (tasks) => {
        let resultHtml = "";

        tasks.forEach((task) => {

            resultHtml += "<li>" + task.title + "<button type='button' onclick='removeTask(" + task.id + ")'>Remove</button></li>"
        });

        return "<header><h2>Tasks</h2></header><ul>" + resultHtml + "</ul>"
    },
    lists: (lists) => {
        let resultHtml = "";

        lists.forEach((list) => {

            resultHtml += "<li>" + list.title + "<button type='button' onclick='ChangeList(" + list.id + ")'>Change list</button><button type='button' onclick='removeList(" + list.id + ")'>Remove</button></li>";
        });

        return "<header><h2>Lists</h2><input name='listTitle' type='text'><button type='button' onclick='addList()'>Add list</button></header><ul>" + resultHtml + "</ul>"
    }
};