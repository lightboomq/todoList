const h3 = document.getElementById('h3-task');
const input = document.getElementById('input-task');
const btnAdd  = document.getElementById('btn-add');
const btnRemove = document.getElementById('btn-remove');
const btnComplete = document.getElementById('btn-complete');
const ol = document.getElementById('todo-list');
const main = document.querySelector('main');

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


btnAdd.addEventListener('click',(e)=>{
    if(input.value.length<=3) return; 
    if(tags.find(item=>item.text===input.value)) return;
    tags.push({text:input.value});
    li = document.createElement('li');
    br = document.createElement('br')
    li.innerHTML = input.value;
    //ol.append(li);
    ol.append(li)
    localStorageObj=JSON.stringify(tags);
    localStorage.setItem('localStorageObj',localStorageObj)
    keyDeclension++;
    localStorage.setItem('keyDeclension',keyDeclension)
    getTitleTasks();
    input.value = '';
    
});

ol.addEventListener('click',(e)=>{
    let index;    
    index = tags.findIndex(item=>item.text===e.target.textContent)
    tags[index].tag=e.target
    tags[index].flag=!tags[index].flag,   
    tags[index].flag?tags[index].tag.style.color='blue':tags[index].tag.style.color='black';
})
  
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
        localStorageObj=JSON.stringify(tags)
        localStorage.setItem('localStorageObj',localStorageObj);
    }
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
