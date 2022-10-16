//GET 
var index=0;
window.addEventListener('load',()=>{
  getTodos();
});

function createLis(todos){
  if(todos.length===0){
    index=0;
  }else{
    index=todos[todos.length-1].id;
  }
  let ul = document.getElementById('myUL');
  for (let i = 0; i< todos.length; i++) {
    let li = document.createElement('li');
    li.innerText=todos[i].description;
    li.id=todos[i].id;
    li.checked=todos[i].checked;
    if(li.checked){
      li.classList.toggle('checked');
    }
    ul.append(li);  
    
  }
  createCloseBtn();
  
}

//POST
let button = document.getElementById('btn1');
button.addEventListener('click',function(){
    postElement();
});

// Create a new list item when clicking on the "Add" button
function postElement() {
  let userInput = document.getElementById('userInput').value;
  let li = document.getElementsByTagName('li');
  index++;
  
  let todo ={
    id:index,
    description:userInput,
    checked:false
  }
  postTodo(todo);
  
}

function createLi(todo){
  let ul = document.getElementById('myUL');
  let li = document.createElement('li');
  li.innerText=todo.description;
  li.id=todo.id;
  li.checked=todo.checked;
  ul.appendChild(li);

  let button = document.createElement('button');
    button.id='button'+li.id;
    button.innerText='Close';
    button.className='btnClose';
    button.addEventListener('click',function(){
      deleteTodo(li.id);
    });
  li.append(button);
}

//PATCH
// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
       
    let id=ev.target.id;
    let data={};
    if(document.getElementById(id).className==='checked'){
      data={
        checked:false
      }
    }else{
      data={
        checked:true
      }
    }
     patchTodo(id,data);
  }
}, false);

//DELETE

function createCloseBtn(){
  let li= document.getElementsByTagName('li');
  for (let i = 0; i < li.length; i++) {
    let button = document.createElement('button');
    button.id='button'+i;
    button.innerText='Close';
    button.className='btnClose';
    button.addEventListener('click',function(){
      deleteTodo(li[i].id);
    })
    li[i].append(button);
  }
}

async function myFetch(url, type, data) {
 
    /* GET */
    if (type === "GET") {

        return fetch(url, {
          method: type,
          headers: {
          'Content-type': 'application/json'
        
          }
        })
        .then(response=>response.json())
        .then(json=>{
          return Promise.resolve(json);
        });

    }
  
    /* DELETE */
    if (type === "DELETE") {
    
        return fetch(url, {
          method: type,
          headers: {
            'Content-type': 'application/json'
          }
        })
        .then(response=>response.json())
        .then(json=>{
          return Promise.resolve(json);
    
        });
    }
  
    /* POST - PUT- PATCH */
    if (type === "POST" || type === "PUT" || type === "PATCH") {

        return fetch(url, {
          method: type,
          headers: {
          'Content-type': 'application/json'
        },
          body: JSON.stringify(data)
        })
        .then(response=>response.json())
        .then(json=>{
          return Promise.resolve(json);
    
        });
    }
}

async function getTodos(){
    const url ='http://localhost:3000/api/todos';
    try{
        let todos = await myFetch(url,'GET');
        createLis(todos);
    }catch(error){
        console.log(error);
    }
}
async function postTodo(data){
    const url ='http://localhost:3000/api/todos';
    try{
        let todos = await myFetch(url,'POST',data);
        createLi(todos[todos.length-1]);
    }catch(error){
        console.log(error);
    }
}

async function putTodo(id,data){
    const url ='http://localhost:3000/api/todos/';
    try{
        let todos = await myFetch(url+id,'PUT',data);
        
    }catch(error){
        console.log(error);
    }
}
async function patchTodo(id,data){
    const url ='http://localhost:3000/api/todos/';
    try{
        let todos = await myFetch(url+id,'PATCH',data);
        let li= document.getElementById(id).classList.toggle('checked');
        
    }catch(error){
        console.log(error);
    }
}

async function deleteTodo(id){
    const url ='http://localhost:3000/api/todos/';
    try{
        let todos = await myFetch(url+id,'DELETE');
        let hideLi= document.getElementById(id).className='hide';
        
    }catch(error){
        console.log(error);
    }
}
