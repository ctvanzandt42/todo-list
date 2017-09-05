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