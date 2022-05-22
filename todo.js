let tasks = [];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

function renderList () {
taskList.innerHTML = '';
for(let i=0;i<tasks.length;i++)
{
  addTaskToDOM(tasks[i]);
}
tasksCounter.innerHTML = tasks.length;
}

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
function addTaskToDOM(task)
{
const li = document.createElement('li');
li.innerHTML = `
<input type="checkbox" id="${task.id}"  ${task.completed ? 'checked':''} class="custom-checkbox">
<label for="${task.id}">${task.title}</label>
<i id ="abc" class="delete fa-solid fa-xmark" data-id="${task.title}" ></i>`;
taskList.append(li);
}
function deleteTask (taskId) {
    
    let newTask = tasks.filter((task)=>task.title!=taskId);
    tasks=newTask;
    showNotification('Task Deleted successfully');
    renderList();
    return;
}

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

function showNotification(text) {
    alert(text);
}

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
(function initializeData()
{
    addTaskInput.addEventListener('keyup',handleInputKeyPress);
    document.addEventListener('click',handleClickEvents);
})();
