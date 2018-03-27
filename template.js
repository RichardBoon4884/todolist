let templates = {
    index: () => {
      return "<section id='taskForm'></section><section id='list'></section><section id='task'></section><input name='taskTitle' type='text'><button type='button' class='addTaskButton'>Add task</button>";
    },
    tasks: (tasks) => {
        let resultHtml = "";

        tasks.forEach((task) => {
            let checked = task.done === true ? 'checked' : '';

            resultHtml += "<tr><td><input type='checkbox' name='status' id='statusCheckbox-" + task.id + "' class='statusCheckbox'" + checked + "></td><td>" + task.title + "</td><td><button type='button' id='editTaskButton-" + task.id + "' class='editTaskButton'>Edit</button></td><td><button type='button' id='removeTaskButton-" + task.id + "' class='removeTaskButton'>Remove</button></td></tr>"
        });

        return "<header><h2>Tasks in this list</h2></header><button class='taskFilterButton'>Show only finished tasks</button><button class='taskSortButton'>Show finished tasks first</button><button class='taskNormalViewButton'>Show normal view</button><table>" + resultHtml + "</table>"
    },
    lists: (lists) => {
        let resultHtml = "";

        lists.forEach((list) => {

            resultHtml += "<tr><td><a style='cursor: pointer; text-decoration: underline;' id='changeListButton-" + list.id + "' class='changeListButton'>" + list.title + "</a></td><td><button type='button' id='editListButton-" + list.id + "' class='editListButton'>Edit</button></td><td><button type='button' id='removeListButton-" + list.id + "' class='removeListButton'>Remove</button></td></tr>";
        });

        return "<header><h2>Lists</h2><input name='listTitle' type='text'><button type='button'  class='addListButton'>Add list</button></header><table>" + resultHtml + "</table>"
    }
};

// `${var}`