

const domManipulation = (function() {
    const container = document.createElement("div");
    container.classList.add("container");

    const todoContent = document.createElement("div")
    todoContent.classList.add("todo-content")

    const todoList = document.createElement("ul");
    todoList.classList.add("todo-list")

    const btn = document.createElement("button");
    btn.textContent = "add";
    btn.classList.add("btn-ex");

    todoContent.addEventListener("click", (e) => {
        if (e.target.tagName == "BUTTON") {
            const btn = document.querySelector(".btn-ex")
            todoContent.removeChild(btn);
            const inputUser = document.createElement("input");
            inputUser.classList.add("msg-from-user");
            todoContent.append(inputUser);
            inputUser.addEventListener("keypress", (e) => {
                if (e.key == "Enter") {
                    inputFromUser = document.querySelector(".msg-from-user");
                    dom = document.querySelector(".todo-list")
                    const todo = document.createElement("li");
                    todo.textContent = inputFromUser.value;
                    dom.appendChild(todo);
                    todoContent.removeChild(inputFromUser)
                    const btn = document.createElement("button");
                    btn.textContent = "add";
                    btn.classList.add("btn-ex");
                    todoContent.appendChild(btn);

                }
            })
        }
    })

    const body = document.querySelector("body");
    todoContent.appendChild(btn);
    todoContent.appendChild(todoList);
    container.appendChild(todoContent)
    body.appendChild(container)

})()
