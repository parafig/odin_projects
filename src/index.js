// TODO crear show o display para mostrar el contenido creado(nodos) ya sea,
// en un modulo nuevo o funciones dentro del modulo toDO
// TODO crear logica capaz de declarar una tarea como terminada.
// TODO refactorizar el evento que permite editar un item y las cosas
// relacionadas a el.
// TODO crear pub sub que divide la creacion y eliminacion de nodos o actualizaciones,
// y los eventos que la invocan
// TODO quizas crear una lista de botones o de todos los elementos
import TodoForm from './form';

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

  const getItems = () => {
    const items = document.querySelector('.todo-items');
    return items;
  };

  const getForm = () => {
    const form = document.querySelector('.todo-item-form');
    return form;
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

  const removeNewItemButton = () => {
    const todoContent = getContent();
    const btn = document.querySelector('.btn-new-item');
    todoContent.removeChild(btn);
  };

  return {
    createTodoContent,
    getContent,
    removeForm,
    showNewItem,
    createNewItemButton,
    removeNewItemButton,
  };
}());

const todoEvents = (function todoEvents() {
  const changeInputState = (element) => {
    if (element.nodeName === 'INPUT' || element.nodeName === 'SELECT') {
      const isDisabled = element.attributes.disabled;
      if (isDisabled) {
        element.removeAttribute('disabled');
      } else {
        element.setAttribute('disabled', '');
      }
    } else if (element.nodeName === 'H2' || element.nodeName === 'P') {
      const isEditable = element.attributes.contenteditable.value;
      if (isEditable) {
        element.setAttribute('contenteditable', 'true');
      } else {
        element.setAttribute('contenteditable', 'false');
      }
      if (element.nodeName === 'P') {
        const isVisible = element.hidden;
        if (isVisible) {
          element.removeAttribute('hidden');
          element.removeAttribute('fontSize');
          element.setAttribute('fontSize', '16px');
        } else {
          element.setAttribute('hidden', '');
          element.removeAttribute('fontSize');
          element.setAttribute('fontSize', '0px');
        }
      }
    }
  };

  const createBtn = (className, text) => {
    const btn = document.createElement('button');
    btn.classList.add(className);
    btn.textContent = text;
    return btn;
  };

  const editItem = (e) => {
    const buttons = ['show-description-btn', 'hide-description-btn'];
    let btn;
    let replaceBtn;

    const index = buttons.indexOf(e.target.className);
    if (index >= 0) {
      btn = e.target;
      if (btn.className === buttons[0]) {
        replaceBtn = createBtn(buttons[1], 'hide');
      } else {
        replaceBtn = createBtn(buttons[0], 'show');
      }
      const item = btn.parentNode;
      const children = item.childNodes;
      children.forEach((child) => {
        changeInputState(child);
      });

      item.append(replaceBtn);
      item.removeChild(btn);
    }
  };

  const AddNewitem = (e) => {
    e.preventDefault();

    const {
      title,
      description,
      date,
      priority,
    } = e.target;
    const newItem = TodoForm();
    const itemContent = newItem.createNewITem(
      title.value,
      description.value,
      date.value,
      priority.value,
    );
    itemContent.addEventListener('click', editItem);
    toDo.showNewItem(itemContent);
    toDo.removeForm();
    toDo.createNewItemButton();
  };

  const startNewTodoItem = (e) => {
    if (e.target.className === 'btn-new-item') {
      toDo.removeNewItemButton();
      const form = TodoForm();
      const formContent = form.createForm();
      formContent.addEventListener('submit', AddNewitem);

      const todoContent = toDo.getContent();
      todoContent.append(formContent);
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
