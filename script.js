const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

function loadTasks() {
    const saved = JSON.parse(localStorage.getItem("tasks")) || [];
    saved.forEach(t => createTask(t.text, t.completed));
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll("li").forEach(li => {
        tasks.push({
            text: li.querySelector("span").textContent,
            completed: li.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function createTask(text, completed = false) {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = text;
    li.appendChild(span);

    const del = document.createElement("button");
    del.textContent = "X";

    del.addEventListener("click", () => {
        li.remove();
        saveTasks();
    });

    li.appendChild(del);

    li.addEventListener("click", () => {
        li.classList.toggle("completed");
        saveTasks();
    });

    if (completed) li.classList.add("completed");

    taskList.appendChild(li);
    saveTasks();
}

addBtn.addEventListener("click", () => {
    if (taskInput.value.trim() !== "") {
        createTask(taskInput.value);
        taskInput.value = "";
    }
});

loadTasks();
