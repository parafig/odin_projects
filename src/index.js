

const domManipulation = (function() {
    const container = document.createElement("div");
    container.classList.add("container");

    const todoContent = document.createElement("div");
    todoContent.classList.add("todo-content");

    const createTodoContent = () => {
        console.log("New Content");

        const todoList = document.createElement("ul");
        todoList.classList.add("todo-list");
        todoContent.addEventListener('click', newTask);

        const addBtn = createAddBtn(); 

        todoContent.appendChild(addBtn);
        todoContent.appendChild(todoList)

    }

    const createAddBtn = () => {
        const btn = document.createElement("button");
        btn.textContent = "add";
        btn.classList.add("btn-ex");
        return btn;
    }

    const createInput = () => {
        const inputUser = document.createElement("input");
        inputUser.classList.add("msg-from-user");
    }

    const newTask = (e) => {
        if (e.target.tagName == "BUTTON") {
            const btn = document.querySelector(".btn-ex")
            todoContent.removeChild(btn);

            const inputUser = document.createElement("input");
            inputUser.classList.add("msg-from-user");

            todoContent.append(inputUser);
            inputUser.addEventListener("keypress", (e) => {
                if (e.key == "Enter") {
                    const taskInput = document.querySelector(".msg-from-user");

                    const todo = document.createElement("li");
                    todo.textContent = taskInput.value;

                    const todoList = document.querySelector(".todo-list")
                    todoList.appendChild(todo);

                    todoContent.removeChild(taskInput)

                    const btn = document.createElement("button");
                    btn.textContent = "add";
                    btn.classList.add("btn-ex");
                    todoContent.appendChild(btn);
                }
            })
        }
    }


    const body = document.querySelector("body");
    createTodoContent();
    container.appendChild(todoContent);
    body.appendChild(container);

})()

