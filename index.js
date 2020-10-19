const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const greetings = require('./greetings-webapp');
const Routes = require('./routes');
const flash = require('express-flash');
const session = require('express-session');
//const _ = require('lodash');

const app = express();

const pg = require("pg");
const Pool = pg.Pool;

// which db connection to use
const connectionString = process.env.DATABASE_URL || 'postgresql://codex-coder:pg123@localhost:5432/my_greetings';

const pool = new Pool({
    connectionString
});

const greet = greetings(pool);
const routes = Routes(greet);


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

app.use(flash());

//setup template handlebars as the template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

//setup middleware

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

function errorHandler(err, req, res, next) {
    res.status(500);
    res.render('error', { error: err });
}

app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    layoutsDir: "./views/layouts"
}));

app.set('view engine', 'handlebars');

app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


app.get('/addFlash', routes.flashMessages)

app.get('/', routes.index)

app.post('/', routes.homeRoute)

app.get('/counter', routes.counter)

app.get('/greeted', routes.greeted)

app.get('/count/:name', routes.countUser)

app.get('/reset', routes.deleteData)

const PORT = process.env.PORT || 3008
app.listen(PORT, function () {

});

