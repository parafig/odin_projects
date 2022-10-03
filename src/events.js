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

export default todoEvents;
