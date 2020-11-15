//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodos);

//Functions
function addTodo(e) {
    e.preventDefault();
    //Check if input is empty
    if (!(todoInput.value === '')) {
        //Todo Div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        //Create li
        const newTodo = document.createElement('li');
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        newTodo.innerText= todoInput.value;
        //Add Todo To Local Storage
        saveLocalTodos(todoInput.value);
        //Done button
        const doneButton = document.createElement('button');
        doneButton.classList.add("done-button");
        doneButton.innerHTML = '<i class="fas fa-check"></i>';
        todoDiv.appendChild(doneButton);
        //Delete button
        const deleteTodo = document.createElement('button');
        deleteTodo.classList.add("delete-button");
        deleteTodo.innerHTML= '<i class="fas fa-trash"></i>'
        todoDiv.appendChild(deleteTodo);
        todoList.appendChild(todoDiv);
        //Clear Todo Input Value
        todoInput.value = "";
    } else {
        alert('You need to write something...');
    }
}

function deleteCheck(e) {
    const item = e.target;
    //Delete Todo
    if(item.classList[0] === "delete-button") {
        //Animation
        item.parentElement.classList.add('fall');
        removeLocalTodos(item.parentElement);
        todoList.addEventListener('transitionend', () => {
            item.parentElement.remove();
        });
    }

    //Do Todo
    if(item.classList[0] === "done-button") {
        item.parentElement.classList.toggle('completed');
    }
}

function filterTodos(e) {
    const todos = todoList.childNodes;
    todos.forEach(todo => {
        switch(filterOption.value) {
            case 'all':
                todo.style.display = "flex";
                break;
            case 'done':
                if(todo.classList.contains('completed')) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case 'undone':
                if(!todo.classList.contains('completed')) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalTodos(todo) {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(todo => {
    //Todo Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //Create li
    const newTodo = document.createElement('li');
    newTodo.classList.add('todo-item');
    newTodo.innerText= todo;
    todoDiv.appendChild(newTodo);
    //Done button
    const doneButton = document.createElement('button');
    doneButton.classList.add("done-button");
    doneButton.innerHTML = '<i class="fas fa-check"></i>';
    todoDiv.appendChild(doneButton);
    //Delete button
    const deleteTodo = document.createElement('button');
    deleteTodo.classList.add("delete-button");
    deleteTodo.innerHTML= '<i class="fas fa-trash"></i>'
    todoDiv.appendChild(deleteTodo);
    todoList.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo) {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}