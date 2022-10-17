const express = require('express');

const todosRouter = express.Router();


const {create,read,update,deleteTodo} = require('./../controllers/todos.controller');

todosRouter.get('/',read);

todosRouter.post('/',create);

todosRouter.put('/:id',update);

todosRouter.delete('/:id',deleteTodo);

module.exports=todosRouter;