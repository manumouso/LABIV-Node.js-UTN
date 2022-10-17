INSERT INTO todos.todo($1:name)
VALUES($1:list)
RETURNING id;