const express = require('express');
const mustacheExpress = require('mustache-express');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 3000;
const app = express();
const data = require('./data');

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');
app.listen(port, () => {
    console.log(`Running on port ${port}!`);
});

app.get('/', (req, res) => {
    res.render('home', { todos: data.todos, markoff: data.markoff });
});


app.post("/complete/:todo", (req, res) => {
    let task = req.params.todo;
    let index = data.todos.findIndex(function (item) { return item.todo === task });
    let targetTodo = data.todos[index];
    targetTodo.completed = !targetTodo.completed;
    data.markoff.push(targetTodo);
    data.todos.splice(index, 1);
    return res.redirect("/");
});

app.post('/todo', (req, res) => {
    let newTodo = req.body;
    newTodo.completed = false;
    data.todos.push(newTodo);
    res.redirect('/');
});