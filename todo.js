// Defining the var and const used in js file
let tasks = [];//Array to store tasks
const taskList = document.getElementById('list');//DOM selectors used to select list
const addTaskInput = document.getElementById('add');// DOM selectors used to add List data from input to list
const tasksCounter = document.getElementById('tasks-counter');//DOM selectors used to select span tag to update count of list items


//Function to load list on update
function renderList () {
taskList.innerHTML = '';
for(let i=0;i<tasks.length;i++)
{
  addTaskToDOM(tasks[i]);
}
tasksCounter.innerHTML = tasks.length;
}

//Function to check and uncheck tasks
function toggleTask (taskId) {
    let currentTask = tasks.filter(task=>task.id==taskId);
    if(currentTask.length>0)
    {
        let t=currentTask[0];
        t.completed=!t.completed;
        renderList();
        showNotification('Task toggle successful');
        return;
    }
}

//Function to Add task to list in html code
function addTaskToDOM(task)
{
const li = document.createElement('li');
li.innerHTML = `
<input type="checkbox" id="${task.id}"  ${task.completed ? 'checked':''} class="custom-checkbox">
<label for="${task.id}">${task.title}</label>
<i id ="abc" class="delete fa-solid fa-xmark" data-id="${task.title}" ></i>`;
taskList.append(li);
}

//Function to remove an item of list
function deleteTask (taskId) {
    
    let newTask = tasks.filter((task)=>task.title!=taskId);
    tasks=newTask;
    showNotification('Task Deleted successfully');
    renderList();
    return;
}
//Function to add task to array of tasks
function addTask (task) {
    if(task)
    {
        tasks.push(task);
        showNotification('Task Added Successfully');
        renderList();
        return;
    }
showNotification('Task cannot be added');
}

//Function to popup the notification
function showNotification(text) {
    alert(text);
}


//To Handle key Events and take user input
function handleInputKeyPress(e)
{
if(e.key == 'Enter')
{
    let text = e.target.value;
    if(!text)
    {
        showNotification('Pls enter more than 3 character word to add in List');
        return;
    }
    e.target.value = '';
    const task = {
        title : text,
        id : Date.now().toString(),
        completed : false
    }
    addTask(task);
}
}
//Function to handle Event Delegation specially clicks
function handleClickEvents(e)
{
if(e.target.id == 'abc')
{
deleteTask(e.target.dataset.id);
return;
}
else if(e.target.className == 'custom-checkbox')
{
toggleTask(e.target.id);
return;
}
}
//Used IIFE to call function on load
(function initializeData()
{
    addTaskInput.addEventListener('keyup',handleInputKeyPress);
    document.addEventListener('click',handleClickEvents);
})();
