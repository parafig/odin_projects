const TodoForm = () => {
  const createOption = (value) => {
    const option = document.createElement('option');
    option.value = value;
    option.text = value;
    return option;
  };

  const formatDate = (date, format) => {
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
  };

  const createDueDate = () => {
    const todoDuedateInput = document.createElement('input');
    todoDuedateInput.setAttribute('type', 'date');
    todoDuedateInput.setAttribute('name', 'date');

    const today = new Date();
    const formatToday = formatDate(today, 'yyyy-mm-dd');
    todoDuedateInput.setAttribute('value', formatToday);
    todoDuedateInput.setAttribute('required', '');

    return todoDuedateInput;
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
      if (child.value === valueSelected) {
        child.setAttribute('selected', '');
      }
    });

    return todoPriorityInput;
  };

  const createBtn = (className, text) => {
    const btn = document.createElement('button');
    btn.classList.add(className);
    btn.textContent = text;
    return btn;
  };

  const createForm = () => {
    const todoItemForm = document.createElement('form');
    todoItemForm.classList.add('todo-item-form');

    const todoTitleInput = document.createElement('input');
    todoTitleInput.setAttribute('type', 'text');
    todoTitleInput.setAttribute('name', 'title');
    todoTitleInput.setAttribute('required', '');

    const todoDescriptionInput = document.createElement('textarea');
    todoDescriptionInput.setAttribute('cols', '50');
    todoDescriptionInput.setAttribute('rows', '10');
    todoDescriptionInput.setAttribute('name', 'description');

    const todoDuedateInput = createDueDate();

    const todoPriorityInput = createPriority('Low');

    const submitBtn = createBtn('submit-new-form', 'submit');

    todoItemForm.append(
      todoTitleInput,
      todoDescriptionInput,
      todoDuedateInput,
      todoPriorityInput,
      submitBtn,
    );

    return todoItemForm;
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
    todoDescription.hidden = true;
    todoDescription.setAttribute('fontSize', '0px');
    todoDescription.setAttribute('contenteditable', 'false');

    const showDescriptionBtn = createBtn('show-description-btn', 'show description');

    const deleteBtn = createBtn('delete-btn', 'Remove');

    deleteBtn.addEventListener('click', () => {
      const item = deleteBtn.parentNode;
      const items = item.parentNode;
      items.removeChild(item);
    });

    todoItem.append(
      todoTitle,
      todoDueDate,
      todoPriority,
      todoDescription,
      showDescriptionBtn,
      deleteBtn,
    );

    return todoItem;
  };

  return { createForm, createNewITem };
};

export default TodoForm;
