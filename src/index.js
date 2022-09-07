

const domManipulation = (function() {
    const container = document.createElement("div");
    container.classList.add("container");

    const todoList = document.createElement("ul");
    todoList.classList.add("todo-list")

    const btn = document.createElement("button");
    btn.textContent = "add";
    btn.classList.add("btn-ex");

    const inputUser = document.createElement("input");
    inputUser.classList.add("msg-from-user");


    const addToDom = (msg) => {
        dom = document.querySelector(".todo-list")
        const todo = document.createElement("li");
        todo.textContent = msg;
        dom.appendChild(todo);
    }

    btn.addEventListener("click", addToDom.bind(this, "new todo"));

    inputUser.addEventListener("keypress", (e) => {
        console.log(e)
        if (e.key == "Enter") {
            inputFromUser = document.querySelector(".msg-from-user");
            dom = document.querySelector(".todo-list")
            const todo = document.createElement("li");
            todo.textContent = inputFromUser.value;
            dom.appendChild(todo);
        }
    })


    const body = document.querySelector("body");
    body.appendChild(btn);
    container.appendChild(todoList);
    container.append(inputUser)
    body.appendChild(container)

})()
