const h3 = document.getElementById('h3-task');
const input = document.getElementById('input-task');
const btnAdd  = document.getElementById('btn-add');
const btnRemove = document.getElementById('btn-remove');
const btnComplete = document.getElementById('btn-complete');
const ol = document.getElementById('todo-list');
const main = document.querySelector('.main');
const clearInput = document.querySelector('.clear-input')
const btnDeleteAll = document.querySelector('.clear-all');
const btnScrollToUp = document.querySelector('.imgScrollUp');
const buttonsBlock = document.querySelector('.buttons-block');
const editBlock = document.querySelector('.edit-block');


let edit = document.querySelector('.edit');

const declension = {0:'задач', 1:'задача',2:'задачи',3:'задачи',4:'задачи',5:'задач'};
let valueDeclension=+localStorage.getItem('valueDeclension')?localStorage.getItem('valueDeclension'):0;
let tasks= [];
let strTasks

cicleByDeclension();

let localStorageTasks;
if(localStorage.length>=1){
    tasks=JSON.parse(localStorage.getItem('localStorageTasks'));
    for(let i=0; i<tasks.length; i++){
        const li = document.createElement('li');
        li.id = tasks[i].id;
        li.append(tasks[i].text);
        if(!tasks[i].flagSelected&&!tasks[i].flagCompleted){
            li.style.color = 'black';
            li.style.textDecoration = 'line-through';
        }
        ol.append(li);
    } 
}
getTitleTasks();

let toggleEdit = false;
let disableEdit = false;
let disableOl = false;
let id = +localStorage.getItem('id')?localStorage.getItem('id'):0;

edit.addEventListener('click',()=>{
    if(disableEdit) return;
    const nodes=document.querySelectorAll('li');
    toggleEdit = !toggleEdit;
    disableOl = true;
    edit.src='./edit-complete.svg';
    if(toggleEdit){
        nodes.forEach(node=>{
            node.contentEditable='true',
            node.style.color='#138808';
        });
    }
    else{
        disableOl = false;
        removeСlassesBtns();
        edit.src='./p.svg';
        for(let i=0; i<nodes.length; i++){
            nodes[i].contentEditable='false';
            tasks[i].text = nodes[i].textContent;
            nodes[i].textContent = tasks[i].text; 
            nodes[i].style.color = 'black';
            if(nodes[i].textContent===''){ 
                nodes[i].remove();
                id--;
            };   
        }
        localStorage.setItem('id',id)
        tasks=tasks.filter(item=>item.text!=='');
        uptadeDeclinsionInTitle();
        localStorage.setItem('localStorageTasks',localStorageTasks);
        localStorageTasks = JSON.stringify(tasks);
        localStorage.setItem('localStorageTasks',localStorageTasks);
    } 
});

function uptadeDeclinsionInTitle(){
    valueDeclension = tasks.length;
    localStorage.setItem('valueDeclension',valueDeclension);
    cicleByDeclension();
    getTitleTasks();
}

btnAdd.addEventListener('click',addTask)

function addTask(){
    if(input.value.length<=1) return;
    tasks.push({flagSelected:false,flagCompleted:true,text:input.value,id:id});    
    const li = document.createElement('li');
    li.id = tasks[id].id;
    li.append(tasks[tasks.length-1].text);
    ol.append(li);
    localStorageTasks = JSON.stringify(tasks);
    localStorage.setItem('localStorageTasks',localStorageTasks);
    valueDeclension++;
    localStorage.setItem('valueDeclension',valueDeclension);
    getTitleTasks();
    input.value = '';
    clearInput.style.opacity = '0';
    visibleButtons();
    id++;
    localStorage.setItem('id',id)
}
ol.addEventListener('click',(e)=>{
    if(disableOl) return;
    disableEdit=true;
    const index = +e.target.id;
    const getElemById = document.getElementById(index);
    tasks[index].flagSelected = !tasks[index].flagSelected;
    tasks[index].flagCompleted = !tasks[index].flagCompleted;
    tasks[index].flagSelected? getElemById.style.color = 'blue' : getElemById.style.color = 'black';
    const isHasTasks = tasks.find(task=>task.flagSelected);
    if(isHasTasks){
        addClassesBtns();
    }
    else{
        removeСlassesBtns();
        disableEdit=false;
    }
    console.log(tasks);
});

btnComplete.addEventListener('click',()=>{
    disableEdit=false;
    removeСlassesBtns();
    for(let i=0; i<tasks.length; i++){
        const getElemById = document.getElementById(tasks[i].id);
        if(tasks[i].flagSelected){
            getElemById.style.textDecoration = 'line-through';
            getElemById.style.color = 'black';
            tasks[i].flagSelected = false;  
        }
        if(tasks[i].flagCompleted){
            getElemById.style.textDecoration ='';
        }
    };
    localStorageTasks = JSON.stringify(tasks);
    localStorage.setItem('localStorageTasks',localStorageTasks);  
});

btnDeleteAll.addEventListener('click',()=>{
    ol.innerHTML = '';
    localStorage.clear();
    h3.textContent = `0 задач`;
    tasks = [];
    valueDeclension = 0;
    hiddenButtons();
    id=0;
})
clearInput.addEventListener('click',()=>{
    input.value = '';
    clearInput.style.opacity = '0';
})
input.addEventListener('input',()=>{
    if(input.value==='')return;
    if(input.value[0]!=input.value[0].toUpperCase()){
        input.value=input.value[0].toUpperCase();
    } 
    input.value?clearInput.style.opacity='0.5':clearInput.style.opacity='0';
});
input.addEventListener('keydown',(e)=>{
    if(e.key==='Enter') addTask();
})
btnRemove.addEventListener('click',()=>{
    disableEdit=false;
    removeСlassesBtns();
    for(let i=0; i<tasks.length; i++){
        if(tasks[i].flagSelected) {
            document.getElementById(tasks[i].id).remove();
            id--;
        }
        getTitleTasks();
    }
    localStorage.setItem('id',id);
    tasks = tasks.filter(item=>!item.flagSelected);
    localStorageTasks = JSON.stringify(tasks);
    localStorage.setItem('localStorageTasks',localStorageTasks);
    uptadeDeclinsionInTitle();
    hiddenButtons();
})


function cicleByDeclension(){
    for(let i=valueDeclension; i>0; i--){
        if(declension[i] !== 'задач')continue;    
        else strTasks = declension[i];
    }
}
function getTitleTasks(){
    if(declension[valueDeclension]===undefined&&tasks.length===21||tasks.length===31){
        localStorage.setItem('valueDeclension','1')
        valueDeclension=+localStorage.getItem('valueDeclension');
        h3.textContent = `${tasks.length} ${strTasks=declension[valueDeclension]}`
    }
    else if(declension[valueDeclension]===undefined){;
        h3.textContent = `${tasks.length} ${strTasks}`
    }
    else{
        h3.textContent = `${tasks.length} ${strTasks=declension[valueDeclension]}`;
    }
}

scrollToUp();
function scrollToUp(){
    const imgScrollUp = document.querySelector('.imgScrollUp');

    window.addEventListener('scroll',()=>{
        window.scrollY<=300?imgScrollUp.style.visibility='hidden':imgScrollUp.style.visibility='visible';
    });
    imgScrollUp.addEventListener('click',()=>{
      window.scroll(0,0)
    });
  }

function hiddenButtons(){
    if(localStorage.getItem('localStorageTasks')==='[]'||!localStorage.getItem('localStorageTasks')){
        buttonsBlock.style.opacity=0;
    }
}

function visibleButtons(){
    buttonsBlock.style.opacity=1;
}
function addClassesBtns(){
    btnComplete.classList.add('btn-complete-active');
    btnRemove.classList.add('btn-remove-active');
}
function removeСlassesBtns(){
    btnComplete.classList.remove('btn-complete-active');
    btnRemove.classList.remove('btn-remove-active');
}
hiddenButtons();


