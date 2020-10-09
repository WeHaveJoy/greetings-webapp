const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const greetings = require('./greetings-webapp');
const flash = require('express-flash');
const session = require('express-session');


const app = express();


const pg = require("pg");
const Pool = pg.Pool;

// should we use a SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}
// which db connection to use
const connectionString = process.env.DATABASE_URL || 'postgresql://codex-coder:pg123@localhost:5432/my_greetings';

const pool = new Pool({
    connectionString,
    ssl: useSSL
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



app.get('/', function (req, res) {
    res.render(
        "index", {
    })
});

app.post('/', async function (req, res) {

    try {
        // greet.greetLang(req.body.language, req.body.nameValue);
        //greet.setNames(req.body.nameValue);
        var error = greet.errorMessage(req.body.language, req.body.nameValue);
        res.render('index', {
            message: (error === "") ? await greet.greetLang(req.body.language, req.body.nameValue) : error,
            count:await greet.greetCounter(),
            greeted:await greet.getNames()

        })
    } catch (error) {
        console.log(error);

    }
});

app.get('/counter',async function (req, res) {
    // const listNames = greet.greetCounter();
    // for (counter of listNames) {
    //     counter.nameNum = listNames++;
    // }
    //res.render('counter', { counter: listNames });

    res.render('counter', { counter: await greet.greetCounter() });
});

app.get('/greeted',async function (req, res) {


   res.render('greeted', { greeted: await greet.getNames() });
})

app.get('/greeted/:name', async function (req, res) {
    const name = req.params.name;

    // const listNames = greet.actionsFor(nameType);
    var count = await greet.greetCounter(name)

    // for (action of listNames) {
    //     action.nameNum = action.listNames;
    // }
    res.render('greeted', { greetedName: `${name} have been greeted ${count} time(s)` });
});


app.get('/reset', async function (req, res){
    await greet.deletingData()
    res.render('index', {
        counter: await greet.greetCounter()
    })
    
})

const PORT = process.env.PORT || 3008
app.listen(PORT, function () {

});

