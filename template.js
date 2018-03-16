let templates = {
    index: () => {
      return "<section id='taskForm'></section><section id='list'></section><section id='task'></section><input name='taskTitle' type='text'><button type='button' class='addTaskButton'>Add task</button>";
    },
    tasks: (tasks) => {
        let resultHtml = "";

        tasks.forEach((task) => {

            resultHtml += "<tr><td>" + task.title + "</td><td><button type='button' id='" + task.id + "' class='editTaskButton'>Edit</button></td><td><button type='button' id='" + task.id + "' class='removeTaskButton'>Remove</button></td></tr>"
        });

        return "<header><h2>Tasks in this list</h2></header><table>" + resultHtml + "</table>"
    },
    lists: (lists) => {
        let resultHtml = "";

        lists.forEach((list) => {

            resultHtml += "<tr><td>" + list.title + "</td><td><button type='button' id='" + list.id + "' class='changeListButton'>Change list</button></td><td><button type='button' id='" + list.id + "' class='editListButton'>Edit</button></td><td><button type='button' id='" + list.id + "' class='removeListButton'>Remove</button></td></tr>";
        });

        return "<header><h2>Lists</h2><input name='listTitle' type='text'><button type='button'  class='addListButton'>Add list</button></header><table>" + resultHtml + "</table>"
    }
};

// `${var}`