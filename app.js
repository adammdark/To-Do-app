// declering variables
const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector("#btn-test");
const search = document.querySelector("#search");

// console.log(form,task,taskList,clearBtn);
//eventlistners
loadEventListners();

function loadEventListners(){

// event listner to do addTask when enter key pressed    
form.addEventListener('keypress', function(event){
    if(event.key=='Enter'){
        form.addEventListener("submit",addTask);
    }
})
form.addEventListener("submit",addTask);
clearBtn.addEventListener('click', clearTask)
taskList.addEventListener("click",deleteTask)
document.addEventListener("DOMContentLoaded",getTask);
search.addEventListener("keyup",searchTask);

}
function getTask(){
    let tasks;
    if(localStorage.getItem("tasks") === null){
        tasks = [];
        console.log(tasks);
    }
    else{
        tasks = JSON.parse(localStorage.getItem("tasks"));
        console.log(tasks);

        tasks.forEach(function(element){
         // declering li adding classname and giving the task value 
        const li = document.createElement("li");
        li.className = "collection-item";
        li.innerText = element;

        // declering a adding icon
        const link = document.createElement("a");
        link.className = "delete-item secondary-content";
        link.innerHTML = `<i class="fa fa-remove"></i>`;

        //append a into li
        li.appendChild(link);

        // append li into ul
        taskList.appendChild(li);

        })
    }
}

function addTask(e){
    // to prevent browser refresh
    e.preventDefault();

    //if the input not entered
    if(taskInput.value == ""){
        alert('Please fill the text field');
    }
    else{
        // declering li adding classname and giving the task value 
        const li = document.createElement("li");
        li.className = "collection-item";
        li.innerText = task.value;

        // declering a adding icon
        const link = document.createElement("a");
        link.className = "delete-item secondary-content";
        link.innerHTML = `<i class="fa fa-remove"></i>`;

        //append a into li
        li.appendChild(link);

        // append li into ul
        taskList.appendChild(li);

        // store in LS
        storeLocalStorage(taskInput.value);

        // to make the input empty after adding
        taskInput.value = "";
        
    }
}
function storeLocalStorage(task){
    let tasks;
    if(localStorage.getItem("tasks") === null){
        tasks = [];
        tasks.push(task);
        localStorage.setItem("tasks",JSON.stringify(tasks));
    }
    else{
        tasks = JSON.parse(localStorage.getItem("tasks"));
        tasks.push(task);
        console.log(tasks);
        localStorage.setItem("tasks",JSON.stringify(tasks));
        
    }
    
    
}

function clearTask(){
    taskList.innerHTML="";
    clearLocalStorage();
    function clearLocalStorage(){
        localStorage.removeItem("tasks");
    }
}

function deleteTask(e){
  if(e.target.parentElement.classList.contains("delete-item")){
    if(confirm('Are You Sure')){
        e.target.parentElement.parentElement.remove()
        removeFromLocalStorage(e.target.parentElement.parentElement.innerText);
    }
  }
}

function removeFromLocalStorage(liText){

    let tasks;
    if(localStorage.getItem("tasks") === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem("tasks"));
        tasks.forEach(function(task,index){
            if(liText === task){
                tasks.splice(index,1);
            }
        })
        
    }
    localStorage.setItem("tasks",JSON.stringify(tasks));
   

}

function searchTask(e){
    let searchValue = search.value.toUpperCase();
    // console.log(searchValue);
    // console.log(taskList.children);
    Array.from(taskList.children).forEach(function(element){
        // console.log(element.innerText);
        // console.log(element.innerText.indexOf(searchValue));
        if(element.innerText.toUpperCase().indexOf(searchValue) == -1){
           element.classList.add("hide");
        }
        else{
            element.classList.remove("show");
        }
    })
}

