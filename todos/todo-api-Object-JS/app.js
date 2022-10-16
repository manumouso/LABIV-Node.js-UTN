const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const todosRouter= require('./routers/todos');
app.use('/api/todos',todosRouter);

app.get('/',(req,res)=>{
    
    res.send('WELCOME TODOS API-Routes: GET: api/todos, POST: api/todos ,PUT-PATCH-DELETE: api/todos/id');
});

const PORT= process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log('application listening on http://localhost:'+PORT);
})