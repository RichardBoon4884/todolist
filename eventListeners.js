let eventListeners = {
    // Add event listeners to elements
    addLists: () => {
        // For add list button
        document.getElementsByClassName("addListButton")[0].addEventListener("click", addList);

        // For change list buttons
        Array.prototype.forEach.call(document.getElementsByClassName("changeListButton"), (element) => {
            element.addEventListener("click", function(){ changeList(element.id); });
        });
        // For edit list buttons
        Array.prototype.forEach.call(document.getElementsByClassName("editListButton"), (element) => {
            element.addEventListener("click", function(){ editList(element.id, element); });
        });
        // For remove buttons
        Array.prototype.forEach.call(document.getElementsByClassName("removeListButton"), (element) => {
            element.addEventListener("click", function(){ removeList(element.id); });
        });
    },
    addTasks: () => {
        // For add list button
        document.getElementsByClassName("addTaskButton")[0].addEventListener("click", addTask);
        // For filter button
        document.getElementsByClassName("taskFilterButton")[0].addEventListener("click", (element) => {
            getAllTasks(currentList, {filter: true, sort: false})
        });
        // For filter button
        document.getElementsByClassName("taskSortButton")[0].addEventListener("click", (element) => {
            getAllTasks(currentList, {filter: false, sort: true})
        });
        // For normal view button
        document.getElementsByClassName("taskNormalViewButton")[0].addEventListener("click", (element) => {
            getAllTasks(currentList, {filter: false, sort: false})
        });

        // For edit list buttons
        Array.prototype.forEach.call(document.getElementsByClassName("editTaskButton"), (element) => {
            element.addEventListener("click", function(){ editTask(element.id, element); });
        });
        // For remove buttons
        Array.prototype.forEach.call(document.getElementsByClassName("removeTaskButton"), (element) => {
            element.addEventListener("click", function(){ removeTask(element.id); });
        });
        // For status checkboxes
        Array.prototype.forEach.call(document.getElementsByClassName("statusCheckbox"), (element) => {
            let id = element.id.split("-")[1]; // Get the id number of a string
            element.addEventListener("click", function(){ editTask(id, element);});
        });
    }
};