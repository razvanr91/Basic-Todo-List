//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

//Event Listeners
todoButton.addEventListener('click', addTodo);

//Functions
function addTodo(e) {
    e.preventDefault();
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    const newTodo = document.createElement('li');
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    newTodo.innerText= 'hey';
    const doneButton = document.createElement('button');
    doneButton.classList.add("done-button");
    doneButton.innerHTML = '<i class="fas fa-check"></i>';
    todoDiv.appendChild(doneButton);
    const deleteTodo = document.createElement('button');
    deleteTodo.classList.add("delete-button");
    deleteTodo.innerHTML= '<i class="fas fa-trash"></i>'
    todoDiv.appendChild(deleteTodo);
    todoList.appendChild(todoDiv);
}