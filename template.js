let templates = {
    index: () => {
      return "<section id='taskForm'></section><section id='list'></section><section id='task'></section><input name='taskTitle' type='text'><button type='button' class='addTaskButton'>Add task</button>";
    },
    tasks: (tasks) => {
        let resultHtml = "";

        tasks.forEach((task) => {

            resultHtml += "<li>" + task.title + "<button type='button' id='" + task.id + "' class='editTaskButton'>Edit</button><button type='button' id='" + task.id + "' class='removeTaskButton'>Remove</button></li>"
        });

        return "<header><h2>Tasks in this list</h2></header><ul>" + resultHtml + "</ul>"
    },
    lists: (lists) => {
        let resultHtml = "";

        lists.forEach((list) => {

            resultHtml += "<li>" + list.title + "<button type='button' id='" + list.id + "' class='changeListButton'>Change list</button><button type='button' id='" + list.id + "' class='editListButton'>Edit</button><button type='button' id='" + list.id + "' class='removeListButton'>Remove</button></li>";
        });

        return "<header><h2>Lists</h2><input name='listTitle' type='text'><button type='button'  class='addListButton'>Add list</button></header><ul>" + resultHtml + "</ul>"
    }
};

// `${var}`