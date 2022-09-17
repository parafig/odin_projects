// TODO crear show o display para mostrar el contenido creado(nodos) ya sea,
// en un modulo nuevo o funciones dentro del modulo toDO
// TODO crear codigo que valide los input de la forma.
// TODO crear la posibilidad de editar, borrar  o actualizar un item.
// TODO crear logica capaz de declarar una tarea como terminada.

const toDo = (function () {
  const createNewItemBtn = () => {
    const btn = document.createElement('button');
    btn.textContent = 'New';
    btn.classList.add('btn-new-item');
    return btn;
  };

  const createTodoContent = () => {
    const newItembtn = createNewItemBtn();
    const todoItems = document.createElement('div');
    todoItems.classList.add('todo-items');

    const todoContent = document.createElement('div');
    todoContent.classList.add('todo-content');
    todoContent.appendChild(newItembtn);
    todoContent.appendChild(todoItems);

    return todoContent;
  };

  const createNewITem = (title, description, date, priority) => {
    const todoItem = document.createElement('div');
    todoItem.classList.add('todo-item');

    const todoTitle = document.createElement('h2');
    todoTitle.textContent = title;

    const todoDueDate = document.createElement('h4');
    todoDueDate.textContent = date;

    const todoPriority = document.createElement('h4');
    todoPriority.textContent = priority;

    const todoDescription = document.createElement('p');
    todoDescription.textContent = description;

    todoItem.append(todoTitle, todoDueDate, todoPriority, todoDescription);

    return todoItem;
  };

  const getForm = () => {
    const form = document.querySelector('.todo-item-form');
    return form;
  };

  const getItems = () => {
    const items = document.querySelector('.todo-items');
    return items;
  };

  const getContent = () => {
    const content = document.querySelector(('.todo-content'));
    return content;
  };

  const createNewItemButton = () => {
    const todoContent = getContent();
    const btn = createNewItemBtn();
    todoContent.appendChild(btn);
  };

  const removeForm = () => {
    const todoContent = getContent();
    const form = getForm();
    todoContent.removeChild(form);
  };

  const showNewItem = (item) => {
    const todoItems = getItems();
    todoItems.append(item);
  };

  const createOption = (value) => {
    const option = document.createElement('option');
    option.value = value;
    option.text = value;
    return option;
  };

  const createTodoForm = () => {
    const todoItemForm = document.createElement('form');
    todoItemForm.classList.add('todo-item-form');

    const todoTitleInput = document.createElement('input');
    todoTitleInput.setAttribute('type', 'text');
    todoTitleInput.setAttribute('name', 'title');

    const todoDescriptionInput = document.createElement('input');
    todoDescriptionInput.setAttribute('type', 'text');
    todoDescriptionInput.setAttribute('name', 'description');

    const todoDuedateInput = document.createElement('input');
    todoDuedateInput.setAttribute('type', 'date');
    todoDuedateInput.setAttribute('name', 'date');

    const todoPriorityInput = document.createElement('select');
    todoPriorityInput.setAttribute('name', 'priority');

    const hightPriotity = createOption('High');
    const mediumPriority = createOption('Medium');
    const lowPriority = createOption('Low');

    const submitBtn = document.createElement('button');
    submitBtn.classList.add('submit-new-form');
    submitBtn.textContent = 'submit';

    todoPriorityInput.append(lowPriority, mediumPriority, hightPriotity);

    todoItemForm.append(
      todoTitleInput,
      todoDescriptionInput,
      todoDuedateInput,
      todoPriorityInput,
      submitBtn,
    );

    return todoItemForm;
  };

  const removeNewItemButton = () => {
    const todoContent = getContent();
    const btn = document.querySelector('.btn-new-item');
    todoContent.removeChild(btn);
  };

  return {
    createTodoContent,
    getForm,
    getContent,
    removeForm,
    createNewITem,
    showNewItem,
    createNewItemButton,
    removeNewItemButton,
    createTodoForm,
  };
}());


const todoEvents = (function () {
  const AddNewitem = (e) => {
    e.preventDefault();

    const {
      title,
      description,
      date,
      priority,
    } = e.target;
    const todoItem = toDo.createNewITem(title.value, description.value, date.value, priority.value);
    toDo.showNewItem(todoItem);
    toDo.removeForm();
    toDo.createNewItemButton();
  };

  const startNewTodoItem = (e) => {
    if (e.target.className === 'btn-new-item') {
      toDo.removeNewItemButton();
      const todoForm = toDo.createTodoForm();
      todoForm.addEventListener('submit', AddNewitem);

      const todoContent = toDo.getContent();
      todoContent.append(todoForm);
    }
  };

  return { startNewTodoItem };
}());

const body = document.querySelector('body');
const container = document.createElement('div');
container.classList.add('container');

const todoContent = toDo.createTodoContent();
container.appendChild(todoContent);
body.appendChild(container);

todoContent.addEventListener('click', todoEvents.startNewTodoItem);
