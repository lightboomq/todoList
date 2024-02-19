const h3 = document.getElementById('h3-task');
const input = document.getElementById('input-task');
const btnAdd  = document.getElementById('btn-add');
const blockRemoveComplete = document.querySelector('.block-remove-complete');
const btnRemove = document.getElementById('btn-remove');
const btnComplete = document.getElementById('btn-complete');
const ol = document.getElementById('todo-list');
const main = document.querySelector('.main');
const clearInput = document.querySelector('.clear-input')
const btnClearAll = document.querySelector('.clear-all');
const btnScrollToUp = document.querySelector('.imgScrollUp');

const declension = {0:'задач', 1:'задача',2:'задачи',3:'задачи',4:'задачи',5:'задач'};
let keyDeclension=+localStorage.getItem('keyDeclension')?localStorage.getItem('keyDeclension'):0;
let tags = [];
let strTasks


cicleByDeclension();
let li;
let localStorageObj;
if(localStorage.length>=1){
    tags=JSON.parse(localStorage.getItem('localStorageObj'));
    for(let i=0; i<tags.length; i++){
        li=document.createElement('li');
        
        li.innerHTML=tags[i].text;
        
        if(tags[i].color||tags[i].textDecoration){
            li.style.color='black';
            li.style.textDecoration='line-through';
        }
        ol.append(li);
    } 
}
getTitleTasks();

clearInput.addEventListener('click',()=>{
    input.value = '';
    clearInput.style.opacity='0';
})

btnAdd.addEventListener('click',()=>{
    if(input.value.length<=3) return;
    
    if(tags.find(item=>item.text===input.value)) return;
    tags.push({text:firstSymbolToUpperCase(input.value),pencil:'./pencil.svg'});      
    li = document.createElement('li');
    li.append(tags[tags.length-1].text) 
    ol.append(li)
    localStorageObj=JSON.stringify(tags);
    localStorage.setItem('localStorageObj',localStorageObj)
    keyDeclension++;
    localStorage.setItem('keyDeclension',keyDeclension)
    getTitleTasks();
    input.value = '';
    clearInput.style.opacity='0';
    const mainHeight = main.getBoundingClientRect().height;
    const heightLi = li.getBoundingClientRect().height;
    const heightOl = ol.getBoundingClientRect().height;

    main.style.height=`${mainHeight+heightOl}px`;
    visibleButtons();
});

if(localStorage.getItem('localStorageObj')){
    visibleButtons();
    document.querySelectorAll('li').forEach(item=>item.style.opacity=1)
}
else{
    hiddenButtons();
}
btnClearAll.addEventListener('click',()=>{
    ol.innerHTML='';
    localStorage.clear();
    h3.textContent = `0 задач`;
    tags=[];
    keyDeclension=0;
    main.style.height = `${250}px`;
    btnClearAll.style.opacity=0;
    blockRemoveComplete.style.opacity=0;
})

ol.addEventListener('click',(e)=>{
    let index = tags.findIndex(item=>item.text===e.target.textContent)
    tags[index].tag=e.target
    tags[index].flag=!tags[index].flag,   
    tags[index].flag?tags[index].tag.style.color='blue':tags[index].tag.style.color='black';
})

btnRemove.addEventListener('click',()=>{
    const mainHeight = main.getBoundingClientRect().height;
    const heightLi = ol.lastChild.getBoundingClientRect().height;
    main.style.height=`${mainHeight-heightLi}px`;

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

    if(localStorage.getItem('localStorageObj')==='[]'||!localStorage.getItem('localStorageObj')){
        btnClearAll.style.opacity=0;
        blockRemoveComplete.style.opacity=0;
    }
})

btnComplete.addEventListener('click',()=>{
    for(let i=0; i<tags.length; i++){
        if(tags[i].flag){
            tags[i].tag.style.color='black';
            tags[i].tag.style.textDecoration='line-through';
            tags[i].flag=false;
            tags[i].color='black'
            tags[i].textDecoration='line-through';      
        }
    }
    localStorageObj=JSON.stringify(tags)
    localStorage.setItem('localStorageObj',localStorageObj);
    
});
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
input.addEventListener('input',()=>{
    input.value?clearInput.style.opacity='0.5':clearInput.style.opacity='0';
})


function firstSymbolToUpperCase(inputValue){
    let str='';
    for(let i=0; i<inputValue.length; i++){
        if(i===0){
            str+=inputValue[i].toUpperCase();
        }
        else{
            str+=inputValue[i];
        }
    }
    return str;
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
    btnClearAll.style.opacity=0;
    blockRemoveComplete.style.opacity=0;
}

function visibleButtons(){
    li.style.opacity = 1;
    btnClearAll.style.opacity=1;
    blockRemoveComplete.style.opacity=1;
}
