const h3 = document.getElementById('h3-task');
const input = document.getElementById('input-task');
const btnAdd  = document.getElementById('btn-add');
const btnRemove = document.getElementById('btn-remove');
const btnComplete = document.getElementById('btn-complete');
const ol = document.getElementById('todo-list');
const main = document.querySelector('.main');
const clearInput = document.querySelector('.clear-input')
const btnClearAll = document.querySelector('.clear-all');
const btnScrollToUp = document.querySelector('.imgScrollUp');
const buttonsBlock = document.querySelector('.buttons-block');

const declension = {0:'задач', 1:'задача',2:'задачи',3:'задачи',4:'задачи',5:'задач'};
let keyDeclension=+localStorage.getItem('keyDeclension')?localStorage.getItem('keyDeclension'):0;
let tags = [];
let strTasks


cicleByDeclension();

let localStorageObj;


if(localStorage.length>=1){
    tags=JSON.parse(localStorage.getItem('localStorageObj'));
    for(let i=0; i<tags.length; i++){
        const li=document.createElement('li');
        li.id=tags[i].text;
        li.append(tags[i].text);
        if(!tags[i].flag&&!tags[i].flagComplete){
            li.style.color='black';
            li.style.textDecoration='line-through';
        }
        ol.append(li);
    } 
}
getTitleTasks();

console.log(tags);
console.log('--------начало---------');
btnAdd.addEventListener('click',()=>{
    if(tags.find(item=>item.text===input.value)||input.value.length<=3||input.value[0]===' ') return;
    tags.push({flagComplete:true,text:input.value});      
    const li = document.createElement('li');
    li.id=input.value;
    li.append(tags[tags.length-1].text);
    ol.append(li);
    localStorageObj=JSON.stringify(tags);
    localStorage.setItem('localStorageObj',localStorageObj);
    keyDeclension++;
    localStorage.setItem('keyDeclension',keyDeclension);
    getTitleTasks();
    input.value = '';
    clearInput.style.opacity='0';
    visibleButtons();
});


ol.addEventListener('click',(e)=>{
    const index = tags.findIndex(item=>item.text===e.target.textContent)
    e.target.id = e.target.textContent
    tags[index].flag=!tags[index].flag,
    tags[index].flagComplete=!tags[index].flagComplete;

    if(tags[index].flag){
        document.getElementById(tags[index].text).style.color='blue';
    }
    else{
        document.getElementById(tags[index].text).style.color='black';
    }   
})

btnComplete.addEventListener('click',(e)=>{

    for(let i=0; i<tags.length; i++){
        if(tags[i].flag){
            document.getElementById(tags[i].text).style.textDecoration='line-through';
            document.getElementById(tags[i].text).style.color='black';
            tags[i].flag=false;  
        }
        if(tags[i].flagComplete){
            document.getElementById(tags[i].text).style.textDecoration='';
        }
    }
    localStorageObj=JSON.stringify(tags);
    localStorage.setItem('localStorageObj',localStorageObj);
});



















btnClearAll.addEventListener('click',()=>{
    ol.innerHTML='';
    localStorage.clear();
    h3.textContent = `0 задач`;
    tags=[];
    keyDeclension=0;
    hiddenButtons();
})
clearInput.addEventListener('click',()=>{
    input.value = '';
    clearInput.style.opacity='0';
})

input.addEventListener('input',()=>{
    if(input.value[0]!=input.value[0].toUpperCase()){
        input.value=input.value[0].toUpperCase();
    } 
    input.value?clearInput.style.opacity='0.5':clearInput.style.opacity='0';
});

btnRemove.addEventListener('click',()=>{
    for(let i=0; i<tags.length; i++){
        if(tags[i].flag){
            tags[i].tag.remove();
        }
        getTitleTasks();
    }
    tags=tags.filter(item=>!item.flag)
    keyDeclension=tags.length;
    localStorage.setItem('keyDeclension',keyDeclension)
    localStorageObj=JSON.stringify(tags);
    localStorage.setItem('localStorageObj',localStorageObj)
    cicleByDeclension()
    getTitleTasks();
    hiddenButtons();
})

function cicleByDeclension(){
    for(let i=keyDeclension; i>0; i--){
        if(declension[i]!=='задач'){
            continue;
        }
        else{
            strTasks=declension[i]
        }
    }
}
function getTitleTasks(){
    if(declension[keyDeclension]===undefined&&tags.length===21||tags.length===31){
        localStorage.setItem('keyDeclension','1')
        keyDeclension=+localStorage.getItem('keyDeclension');
        h3.textContent = `${tags.length} ${strTasks=declension[keyDeclension]}`
    }
    else if(declension[keyDeclension]===undefined){;
        h3.textContent = `${tags.length} ${strTasks}`
    }
    else{
        h3.textContent = `${tags.length} ${strTasks=declension[keyDeclension]}`;
    }
}

scrollToUp();
function scrollToUp(){
    const imgScrollUp = document.querySelector('.imgScrollUp')
    window.addEventListener('scroll',()=>{
      if(window.scrollY<=300){
        imgScrollUp.style.visibility='hidden';
      }
      else{
        imgScrollUp.style.visibility='visible';
      }
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