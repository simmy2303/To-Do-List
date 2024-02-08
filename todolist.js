const todoList = JSON.parse(localStorage.getItem('todoList')) || [{
  name: 'make dinner',
  dueDate: '2022-12-22',
  completed:false
}, {
  name: 'wash dishes',
  dueDate: '2022-12-22',
  completed:false
}];

renderTodoList();

function renderTodoList() {
  let todoListHTML = '';

  for (let i = 0; i < todoList.length; i++) {
    const todoObject = todoList[i];

    const { name, dueDate, completed } = todoObject;

    const html = `<div id="todo-${i}" class="listitem ${completed ? 'completed' : ''}">
  <div class="nameee">${name}		&nbsp;	&nbsp;	&nbsp; </div>
  <div class="nameee"><span style="font-weight: bold;">${dueDate}</span></div>
  <button onclick="handleCheckClick(${i})" class="check"><i class="fas fa-check"></i></button>
  <button onclick="handleDeleteClick(${i})" class="delete-todo-button"><i class="fas fa-trash"></i></button> 
</div>`;
    todoListHTML += html;
  }

  const numlist = todoList.length;
  document.querySelector('.todo-list').innerHTML = todoListHTML;
  document.querySelector('.num').innerHTML = `<p class="mytodos">My Todos: ${numlist}</p>`;

  saveToStorage(); // Move saveToStorage to the end of renderTodoList
}

  const numlist = todoList.length;
  document.querySelector('.todo-list').innerHTML = todoListHTML;
  document.querySelector('.num').innerHTML = `<p class="mytodos">My Todos: ${numlist}</p>`;

  saveToStorage(); // Move saveToStorage to the end of renderTodoList


function handleCheckClick(index) {
  completeTodo(index);
  renderTodoList();
  saveToStorage();
}
function handleDeleteClick(index) {
  const listItem = document.querySelector(`#todo-${index}`);
  
  listItem.classList.add('fall');

  listItem.addEventListener('transitionend', function() {
      todoList.splice(index, 1);

      listItem.classList.remove('fall');

      renderTodoList();


      saveToStorage();
  });
}


function completeTodo(i) {
  const todoObject = todoList[i];
  const listItem = document.querySelector(`#todo-${i}`);

  // Update the completed property first
  todoObject.completed = !todoObject.completed;

  // Toggle the CSS class based on the updated state
  if (todoObject.completed) {
    listItem.classList.add('completed');
  } else {
    listItem.classList.remove('completed');
  }

  saveToStorage();
}


function enterkey() {
  if (event.key === 'Enter') {
    addTodo();
  }
}

function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;

  const dateInputElement = document.querySelector('.js-due-date-input');
  const dueDate = dateInputElement.value;

  if (name === '' || !/\S/.test(inputElement.value)) {
    alert(`You can't get NOTHING done :)`);
    return;
  }
  todoList.push({
    name: name,
    dueDate: dueDate,
  });

  inputElement.value = '';

  renderTodoList();

  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('todoList', JSON.stringify(todoList));
}

  
function changeTheme(theme) {
  const body = document.body;
  const inputField = document.querySelector('.js-name-input');
  const duedate= document.querySelector('.js-due-date-input');
  const listitem= document.querySelector('.listitem');

  body.classList.remove('standardTheme', 'lightTheme', 'darkerTheme');
  
  if (theme === 'standardTheme') {
    body.classList.add('standardTheme');

  } else if (theme === 'lightTheme') {
    body.classList.add('lightTheme');
  } else if (theme === 'darkerTheme') {
    body.classList.add('darkerTheme');
  }

  if (theme === 'darkerTheme') {
    inputField.classList.add('darkerThemeInput');
    duedate.classList.add('darkerThemeDueDate');
    listitem.classList.add('darkerlistitem');
  } else {
    inputField.classList.remove('darkerThemeInput');
    duedate.classList.remove('darkerThemeDueDate');
    listitem.classList.remove('darkerlistitem');
  }
  if (theme==='lightTheme'){
    inputField.classList.add('lighterThemeInput');
    duedate.classList.add('lighterThemeDueDate');
    listitem.classList.add('lighterlistitem');
  } else {
    inputField.classList.remove('lighterThemeInput');
    duedate.classList.remove('lighterThemeDueDate');
    listitem.classList.remove('lighterlistitem');
  }
}
  document.addEventListener('DOMContentLoaded', function () {
    const standardThemeButton = document.querySelector('.standardTheme');
    const lightThemeButton = document.querySelector('.lightTheme');
    const darkerThemeButton = document.querySelector('.darkerTheme');
  
    standardThemeButton.addEventListener('click', function () {
      changeTheme('standardTheme');
    });
  
    lightThemeButton.addEventListener('click', function () {
      changeTheme('lightTheme');
    });
  
    darkerThemeButton.addEventListener('click', function () {
      changeTheme('darkerTheme');
    })})