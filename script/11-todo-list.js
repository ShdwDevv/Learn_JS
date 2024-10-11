const todoList = [
    {
        name:"something",
        dueDate : "2022-06-02"
    }
];
const todoElement = document.querySelector('.todo-list');
const inputElement = document.querySelector('.js-name-input');
const inputDateElement = document.querySelector('.js-date-input');
let handleCostKeydown = (event) => {
    if(event.code === 'Enter') addTodo();
};
renderTodoList();
const addTodo = () => {
    const name = inputElement.value;
    const date = inputDateElement.value;
    if(name && date){
        todoList.push({name:name,dueDate:date});
        console.log(todoList);
        inputElement.value = "";
        renderTodoList();
    }
}
function renderTodoList(){
    let todoListHTML = '';
    for(let i = 0; i < todoList.length;i++){
        const {name,dueDate} = todoList[i];
        todoListHTML += `
        <div>${name}</div>
        <div>${dueDate}</div>
        <button class="delete-todo-button" onclick="
            todoList.splice(${i},1);
            renderTodoList();  
        "
        >Delete</button>
        `
    }
    todoElement.innerHTML = todoListHTML;
}
