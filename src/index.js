// TODO crear show o display para mostrar el contenido creado(nodos) ya sea,
// en un modulo nuevo o funciones dentro del modulo toDO
// TODO crear logica capaz de declarar una tarea como terminada.
// TODO refactorizar el evento que permite editar un item y las cosas
// relacionadas a el.

const toDo = (function toDo() {
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

  const createOption = (value) => {
    const option = document.createElement('option');
    option.value = value;
    option.text = value;
    return option;
  };

  const createPriority = (valueSelected) => {
    const hightPriotity = createOption('High');
    const mediumPriority = createOption('Medium');
    const lowPriority = createOption('Low');
    const todoPriorityInput = document.createElement('select');
    todoPriorityInput.setAttribute('name', 'priority');

    todoPriorityInput.append(lowPriority, mediumPriority, hightPriotity);

    const children = todoPriorityInput.childNodes;
    children.forEach((child) => {
      console.log(child);
      if (child.value === valueSelected) {
        child.setAttribute('selected', '');
      }
    });

    return todoPriorityInput;
  };

  const createNewITem = (title, description, date, priority) => {
    const todoItem = document.createElement('div');
    todoItem.classList.add('todo-item');

    const todoTitle = document.createElement('h2');
    todoTitle.setAttribute('contenteditable', 'false');
    todoTitle.textContent = title;

    const todoDueDate = document.createElement('input');
    todoDueDate.setAttribute('type', 'date');
    todoDueDate.setAttribute('disabled', '');
    todoDueDate.setAttribute('value', date);

    const todoPriority = createPriority(priority);
    todoPriority.setAttribute('disabled', '');

    const todoDescription = document.createElement('p');
    todoDescription.textContent = description;
    todoDescription.style.visibility = 'hidden';
    todoDescription.style.fontSize = '2px';
    todoDescription.setAttribute('contenteditable', 'false');

    const showDescriptionBtn = document.createElement('button');
    showDescriptionBtn.classList.add('show-description-btn');
    showDescriptionBtn.textContent = 'show description';

    const updateButton = document.createElement('button');
    updateButton.classList.add('update-btn');
    updateButton.textContent = 'Edit';

    showDescriptionBtn.addEventListener('click', () => {
      const visibility = todoDescription.style.visibility;
      if (visibility === 'hidden') {
        todoDescription.style.fontSize = '16px';
        todoDescription.style.visibility = 'visible';
        todoDescription.setAttribute('contenteditable', 'true');
        todoTitle.setAttribute('contenteditable', 'true');
        todoPriority.removeAttribute('disabled');
        todoDueDate.removeAttribute('disabled');
      } else if (visibility === 'visible') {
        todoDescription.style.visibility = 'hidden';
        todoDescription.style.fontSize = '2px';
        todoDescription.setAttribute('contenteditable', 'false');
        todoTitle.setAttribute('contenteditable', 'false');
        todoPriority.setAttribute('disabled', '');
        todoDueDate.setAttribute('disabled', '');
      }
    });

    todoItem.append(
      todoTitle,
      todoDueDate,
      todoPriority,
      todoDescription,
      showDescriptionBtn,
      updateButton,
    );

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


  const createTodoForm = () => {
    const todoItemForm = document.createElement('form');
    todoItemForm.classList.add('todo-item-form');

    const todoTitleInput = document.createElement('input');
    todoTitleInput.setAttribute('type', 'text');
    todoTitleInput.setAttribute('contenteditable', 'true');
    todoTitleInput.setAttribute('name', 'title');
    todoTitleInput.setAttribute('required', '');

    const todoDescriptionInput = document.createElement('textarea');
    todoDescriptionInput.setAttribute('cols', '50');
    todoDescriptionInput.setAttribute('rows', '10');
    todoDescriptionInput.setAttribute('name', 'description');

    const todoDuedateInput = document.createElement('input');
    todoDuedateInput.setAttribute('type', 'date');
    todoDuedateInput.setAttribute('name', 'date');

    const today = new Date();
    function formatDate(date, format) {
      const map = {
        mm: date.getMonth() + 1,
        dd: date.getDate(),
        yyyy: date.getFullYear(),
      };
      if (map.mm < 10) {
        map.mm = `0${map.mm}`;
      }
      if (map.dd < 10) {
        map.dd = `0${map.dd}`;
      }

      return format.replace(/mm|dd|yyyy/gi, (matched) => map[matched]);
    }

    const formatToday = formatDate(today, 'yyyy-mm-dd');
    todoDuedateInput.setAttribute('value', formatToday);
    todoDuedateInput.setAttribute('required', '');

    const todoPriorityInput = createPriority('Low');

    const submitBtn = document.createElement('button');
    submitBtn.classList.add('submit-new-form');
    submitBtn.textContent = 'submit';

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
    getContent,
    removeForm,
    createNewITem,
    showNewItem,
    createNewItemButton,
    removeNewItemButton,
    createTodoForm,
  };
}());

const todoEvents = (function todoEvents() {
  const AddNewitem = (e) => {
    e.preventDefault();

    const {
      title,
      description,
      date,
      priority,
    } = e.target;
    const todoItem = toDo.createNewITem(
      title.value,
      description.value,
      date.value,
      priority.value,
    );
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
