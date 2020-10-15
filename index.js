const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const greetings = require('./greetings-webapp');
const flash = require('express-flash');
const session = require('express-session');
const _ = require('lodash');

const app = express();

const pg = require("pg");
const Pool = pg.Pool;

// which db connection to use
const connectionString = process.env.DATABASE_URL || 'postgresql://codex-coder:pg123@localhost:5432/my_greetings';

const pool = new Pool({
    connectionString
});

const greet = greetings(pool);
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


app.get('/addFlash', function (req, res) {
    req.flash('info', 'Flash Message Added');
    res.redirect('/');
});

app.get('/', async function (req, res) {
    res.render(
        "index", { count: await greet.greetCounter() });
});

app.post('/', async function (req, res) {

    try {

        var name = _.capitalize(req.body.nameValue);
        var lang = req.body.language;


        if (lang === undefined) {
            req.flash('error', 'Oops! You forgot to select a language. Please select language...!')
            res.render('index')
            return;
        }
        else if (name === '') {
            req.flash('error', 'Please enter name!')
            res.render('index');
            return;
        }
        else if (lang === undefined && name === '') {
            req.flash('error', 'Please enter name and select a language!')
            res.render('index');
            return;
        }
        res.render('index', {
            message: await greet.greetLang(lang, name),
            count: await greet.greetCounter(),
            greeted: await greet.getNames(),
        })
    } catch (error) {
        console.log(error);
    }
});

app.get('/counter', async function (req, res) {


    res.render('counter', { counter: await greet.greetCounter() });
});

app.get('/greeted', async function (req, res) {


    res.render('greeted', { greeted: await greet.getNames() });
})

app.get('/count/:name', async function (req, res) {
    const name = req.params.name;

    var count = await greet.counterForOne(name)

    for (const action in count) {
        var gcounter = count[action]

    }
    res.render('count', { greetedName: `Hello, ${name} have been greeted ${gcounter} time(s)` });
});

app.get('/reset', async function (req, res) {
    await greet.deletingData()
    res.render('index', {
        counter: await greet.greetCounter(),
        count: await greet.greetCounter()
    })

})

const PORT = process.env.PORT || 3008
app.listen(PORT, function () {

});

