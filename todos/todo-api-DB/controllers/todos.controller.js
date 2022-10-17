const {db,sqlGetTodos,sqlCreateTodo,sqlUpdateTodo,sqlDeleteTodo, sqlFindId} = require('./../database/database');


const read= async(req,res)=>{
    try{
       const result= await db.any(sqlGetTodos);
       res.send(result); 
    }catch(error){
      
      res.status(500).send(error); 
    }
    
};

const create= async (req,res)=>{
    try{
      const todo= req.body;
      if(todo.description===undefined || todo.checked===undefined)
        return res.status(400).send({message:'Bad request'});
      
      const id = await db.any(sqlCreateTodo,[todo]);
      
      const result ={
        id:id[0].id,
        todo
      }
      res.send({message:'created correctly',result});
    }catch(error){
      res.status(500).send(error); 
    }
};

const update= async (req,res)=>{
  
  try{
    const id= parseInt(req.params.id);
    const {description,checked} = req.body;
    
    if(id ===undefined || isNaN(id) || id < 1)
      return res.status(400).send({message:'Bad request'});
    if(description===undefined || checked===undefined)
      return res.status(400).send({message:'Bad request'});
    
    const findId = await db.any(sqlFindId,id);
    if(findId.length===0)
      return res.status(404).send({message:'Id not found'});
      
    const todo ={
      id,description,checked
    }
    
    const result= await db.any(sqlUpdateTodo,todo);
    res.send({message:'updated correctly',todo});    
  }catch(error){
   
    res.status(500).send(error); 
  }  
  
};


const deleteTodo = async (req,res)=>{

  try{
    const id= parseInt(req.params.id);
    if(id ===undefined || isNaN(id) || id < 1)
      return res.status(400).send({message:'Bad request'});
    
    const findId = await db.any(sqlFindId,id);
    if(findId.length===0)
        return res.status(404).send({message:'Id not found'});
    
    const remove = await db.none(sqlDeleteTodo,id);  
    res.send({message:'deleted correctly'}); 
  
    
  }catch(error){
    res.status(500).send(error); 
  }
       
};

module.exports={
    read:read,
    create:create,
    update:update,
    deleteTodo:deleteTodo
};