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

const declension = {0:'задач', 1:'задача',2:'задачи',3:'задачи',4:'задачи',5:'задач'};
let keyDeclension=+localStorage.getItem('keyDeclension')?localStorage.getItem('keyDeclension'):0;
let tasks= [];
let strTasks

cicleByDeclension();

let localStorageObj;
if(localStorage.length>=1){
    tasks=JSON.parse(localStorage.getItem('localStorageObj'));
    for(let i=0; i<tasks.length; i++){
        const li = document.createElement('li');
        const img = document.createElement('img');
        img.src=tasks[i].svg
        li.id = tasks[i].text;
        li.append(img,tasks[i].text);
        if(!tasks[i].flagSelected&&!tasks[i].flagCompleted){
            li.style.color = 'black';
            li.style.textDecoration = 'line-through';
        }
        ol.append(li);
    } 
}
getTitleTasks();

btnAdd.addEventListener('click',addTask)


function addTask(){
    if(tasks.find(item=>item.text===input.value)||input.value.length<=3||input.value[0]===' ') return;
    tasks.push({svg:'./p.svg',flagCompleted:true,text:input.value});      
    const li = document.createElement('li');
    const img = document.createElement('img');
    img.src=tasks[tasks.length-1].svg
    li.id = input.value;
    li.append(img,tasks[tasks.length-1].text);
    ol.append(li);
    localStorageObj = JSON.stringify(tasks);
    localStorage.setItem('localStorageObj',localStorageObj);
    keyDeclension++;
    localStorage.setItem('keyDeclension',keyDeclension);
    getTitleTasks();
    input.value = '';
    clearInput.style.opacity = '0';
    visibleButtons();
}

ol.addEventListener('click',(e)=>{
    const index = tasks.findIndex(item=>item.text===e.target.textContent);
    console.log(index);
    const getElemById = document.getElementById(tasks[index].text);
    tasks[index].flagSelected = !tasks[index].flagSelected;
    tasks[index].flagCompleted = !tasks[index].flagCompleted;
    tasks[index].flagSelected? getElemById.style.color = 'blue' : getElemById.style.color = 'black';
    const isHasTasks = tasks.find(task=>task.flagSelected);
    if(isHasTasks){
        btnComplete.classList.add('btn-complete-active');
        btnRemove.classList.add('btn-remove-active');
    }
    else{
        btnComplete.classList.remove('btn-complete-active');
        btnRemove.classList.remove('btn-remove-active');
    }
});

btnComplete.addEventListener('click',()=>{
    btnComplete.classList.remove('btn-complete-active');
    btnRemove.classList.remove('btn-remove-active');
    for(let i=0; i<tasks.length; i++){
        const getElemById = document.getElementById(tasks[i].text);
        if(tasks[i].flagSelected){
            getElemById.style.textDecoration = 'line-through';
            getElemById.style.color = 'black';
            tasks[i].flagSelected = false;  
        }
        if(tasks[i].flagCompleted){
            getElemById.style.textDecoration ='';
        }
    };
    localStorageObj = JSON.stringify(tasks);
    localStorage.setItem('localStorageObj',localStorageObj);  
});

btnDeleteAll.addEventListener('click',()=>{
    ol.innerHTML = '';
    localStorage.clear();
    h3.textContent = `0 задач`;
    tasks = [];
    keyDeclension = 0;
    hiddenButtons();
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
    btnComplete.classList.remove('btn-complete-active');
    btnRemove.classList.remove('btn-remove-active');
    for(let i=0; i<tasks.length; i++){
        if(tasks[i].flagSelected){
            document.getElementById(tasks[i].text).remove();
        }
        getTitleTasks();
    }
    tasks = tasks.filter(item=>!item.flagSelected)
    keyDeclension = tasks.length;
    localStorage.setItem('keyDeclension',keyDeclension)
    localStorageObj = JSON.stringify(tasks);
    localStorage.setItem('localStorageObj',localStorageObj)
    cicleByDeclension()
    getTitleTasks();
    hiddenButtons();
})

function cicleByDeclension(){
    for(let i=keyDeclension; i>0; i--){
        if(declension[i] !== 'задач'){
            continue;
        }
        else{
            strTasks = declension[i]
        }
    }
}
function getTitleTasks(){
    if(declension[keyDeclension]===undefined&&tasks.length===21||tasks.length===31){
        localStorage.setItem('keyDeclension','1')
        keyDeclension=+localStorage.getItem('keyDeclension');
        h3.textContent = `${tasks.length} ${strTasks=declension[keyDeclension]}`
    }
    else if(declension[keyDeclension]===undefined){;
        h3.textContent = `${tasks.length} ${strTasks}`
    }
    else{
        h3.textContent = `${tasks.length} ${strTasks=declension[keyDeclension]}`;
    }
}

scrollToUp();
function scrollToUp(){
    const imgScrollUp = document.querySelector('.imgScrollUp')

    window.addEventListener('scroll',()=>{
        window.scrollY<=300?imgScrollUp.style.visibility='hidden':imgScrollUp.style.visibility='visible';
    });

    imgScrollUp.addEventListener('click',()=>{
      window.scroll(0,0)
    })
  }

function hiddenButtons(){
    if(localStorage.getItem('localStorageObj')==='[]'||!localStorage.getItem('localStorageObj')){
        buttonsBlock.style.opacity=0;
    }
}

function visibleButtons(){
    buttonsBlock.style.opacity=1;
}
hiddenButtons();


