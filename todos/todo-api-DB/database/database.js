const pgp = require('pg-promise')(/* options */);
const {host,database,user,password,port} = require('./../config');
const {join: joinPath} = require('path');

const connectionString=user+':'+password+'@'+host+':'+port+'/'+database;

const db = pgp('postgres://'+connectionString);


// Helper for linking to external query files:
function sql(file) {
    const fullPath = joinPath(__dirname, file);
    return new pgp.QueryFile(fullPath, {minify: true});
}

// Create a QueryFile globally, once per file:
const sqlGetTodos = sql('./../sql/getTodos.sql');
const sqlCreateTodo =sql('./../sql/createTodo.sql');
const sqlUpdateTodo =sql('./../sql/updateTodo.sql');
const sqlDeleteTodo =sql('./../sql/deleteTodo.sql');
const sqlFindId=sql('./../sql/findId.sql');

module.exports={
    db:db,
    sqlGetTodos:sqlGetTodos,
    sqlCreateTodo:sqlCreateTodo,
    sqlUpdateTodo:sqlUpdateTodo,
    sqlDeleteTodo:sqlDeleteTodo,
    sqlFindId,sqlFindId
}