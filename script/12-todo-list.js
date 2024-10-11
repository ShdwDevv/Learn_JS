const todoList = [
];
const todoElement = document.querySelector('.todo-list');
const inputElement = document.querySelector('.js-name-input');
const inputDateElement = document.querySelector('.js-date-input');
document.querySelector('.js-add-todo-button').addEventListener('click',()=>{
    addTodo();
});
inputElement.addEventListener('keydown',()=>handleCostKeydown(event));
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
        inputDateElement.value = "";
        renderTodoList();
    }
}
function renderTodoList(){
    let todoListHTML = '';
    todoList.forEach((todoObject,index)=>{
        const {name,dueDate} = todoObject;
        todoListHTML += `
        <div>${name}</div>
        <div>${dueDate}</div>
        <button class="delete-todo-button js-delete-todo-button">Delete</button>
        `
    });
    document.querySelectorAll('.js-delete-todo-button').forEach((deleteButton,index)=>{
        deleteButton.addEventListener('click',()=>{
            todoList.splice(index,1);
            renderTodoList();  
        });
    });
    todoElement.innerHTML = todoListHTML;
}
