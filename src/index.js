

const toDo = (function() {

    const createTodoContent = () => {
        console.log("New Content");
        const todoContent = document.createElement("div");
        todoContent.classList.add("todo-content");

        const todoList = document.createElement("ul");
        todoList.classList.add("todo-list");
        todoContent.addEventListener('click', startNewTask);

        const addBtn = createAddBtn(); 

        todoContent.appendChild(addBtn);
        todoContent.appendChild(todoList);

        return todoContent;
    }

    const createAddBtn = () => {
        const btn = document.createElement("button");
        btn.textContent = "add";
        btn.classList.add("btn-ex");
        return btn;
    }

    const addNewTask = (e) => {
        if (e.key == "Enter") {
            const todoContent = document.querySelector(".todo-content")
            const taskInput = document.querySelector(".msg-from-user");

            const todo = document.createElement("li");
            todo.textContent = taskInput.value;

            const todoList = document.querySelector(".todo-list")
            todoList.appendChild(todo);

            todoContent.removeChild(taskInput)

            const btn = createAddBtn();
            todoContent.appendChild(btn);
        }
    }

    const startNewTask = (e) => {
        if (e.target.tagName == "BUTTON") {
            const todoContent = document.querySelector(".todo-content");
            const btn = document.querySelector(".btn-ex");
            todoContent.removeChild(btn);

            const inputUser = document.createElement("input");
            inputUser.classList.add("msg-from-user");

            todoContent.append(inputUser);

            inputUser.addEventListener("keypress", addNewTask);
        }
    }

    return {createTodoContent};
})()

const body = document.querySelector("body");
const container = document.createElement("div");
container.classList.add("container");

const todoContent = toDo.createTodoContent();
container.appendChild(todoContent);
body.appendChild(container);

