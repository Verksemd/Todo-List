// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// Event listeners
document.addEventListener('DOMContentLoaded', showTasks);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

class Task {
    constructor(name, state) {
        this.name = name;
        this.state = state;
    }
}

// Functions
function addTodo(event){
    //Prevent the form from submitting
    event.preventDefault();
    //create  DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //Create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //ADD TODO TO LOCAL STORAGE
    saveTask(new Task(todoInput.value, 'new'))


    //checked mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    completedButton.addEventListener('click', function(event) {
        const item = event.target;
        if (item.classList[0] === "complete-btn") {
            const todo = item.parentElement;
            todo.classList.toggle("completed");
        }

        completeTask(item.parentElement.children[0].innerText);
    });
    todoDiv.appendChild(completedButton);


    //checked trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //append to list
    todoList.appendChild(todoDiv);
    //clear todoInput.value
    todoInput.value = "";

}

function completeTask(taskName) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        alert('Задача не найдена');

        return;
    }
    todos = JSON.parse(localStorage.getItem('todos'));

    for (let i=0; i<todos.length; i++) {
        if (todos[i].name === taskName) {
            todos[i].state = 'completed';
        }
    }

    localStorage.setItem("todos", JSON.stringify(todos));
}

function deleteCheck(e) {
    const item = e.target;
    //delete todo
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        //Animation
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function () {
            todo.remove();
        });
    }

}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch(e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

/**
 * @type Task task
 */
function saveTask(task) {
    //CHECK --HEY Do i have things in here?
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    for (let i=0; i<todos.length; i++) {
        if (todos[i].name === task.name) {
            alert('Такая задача уже есть');
            return;
        }
    }
    todos.push(task);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function showTasks() {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(task) {
        //create  DIV
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        //Create LI
        const newTodo = document.createElement('li');
        newTodo.innerText = task.name;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        if (task.state === 'completed') {
            todoDiv.classList.toggle("completed");
        }
        //checked mark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");

        completedButton.addEventListener('click', function(event) {
            const item = event.target;
            if (item.classList[0] === "complete-btn") {
                const todo = item.parentElement;
                todo.classList.toggle("completed");
            }

            completeTask(item.parentElement.children[0].innerText);
        });

        todoDiv.appendChild(completedButton);

        //checked trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        //append to list
        todoList.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const taskName = todo.children[0].innerText;
    for (let i=0; i<todos.length; i++) {
        if (todos[i].name === taskName) {
            todos.splice(i, 1);
            break;
        }
    }

    localStorage.setItem("todos", JSON.stringify(todos));
}