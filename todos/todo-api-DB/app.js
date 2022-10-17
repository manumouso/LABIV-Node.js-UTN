const express = require('express');
const cors = require('cors');
 
const app = express();
app.use(cors());
app.use(express.json());

//ROUTERS

const todosRouter = require('./routers/todos.router');
app.use('/api/todos',todosRouter);

//ROUTING
app.get('/',(req,res)=>{
  res.send('TODO API-PostgreSQL DATABASE');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log('Server listening on port: '+PORT);
})
