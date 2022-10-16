const express = require('express');

const {todos} = require('../data/todosInfo');
const {postValid, putValid,patchValid} = require('../validation/crudValidation');

const todosRouter = express.Router();
todosRouter.use(express.json());

todosRouter.get('/',(req,res)=>{
       
    res.send(todos);
});

todosRouter.post('/',(req,res)=>{
    if(!postValid(req))
      return res.status(400).send('Invalid request');
   
    let newTodo= req.body;
    todos.push(newTodo);
    res.send(todos);

});

todosRouter.put('/:id',(req,res)=>{
    if(!putValid(req))
      return res.status(400).send('Invalid request');
    
    const id= req.params.id;
    const updatedTodo= req.body;

    const index = todos.findIndex(todo=> todo.id == id);
    if(index<0)
      return res.status(404).send('Invalid id');
    
    todos[index] = updatedTodo;
    res.send(todos);
});

todosRouter.patch('/:id',(req,res)=>{
    if(!patchValid(req))
      return res.status(400).send('Invalid request');
    
    const id= req.params.id;
    const updatedData = req.body;
    const index = todos.findIndex(todo=> todo.id == id);
    if(index<0)
      return res.status(404).send('Invalid id');

    Object.assign(todos[index],updatedData);
    res.send(todos);

});

todosRouter.delete('/:id',(req,res)=>{

    const id= req.params.id;
    const index = todos.findIndex(todo=> todo.id == id);
    if(index<0)
      return res.status(404).send('Invalid id');
    
    todos.splice(index,1);
    res.send(todos);
    
});

module.exports=todosRouter;