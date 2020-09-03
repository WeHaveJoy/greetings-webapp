const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const greetings = require('./greetings-webapp');

const app = express();
const greet = greetings();

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
    res.render('index', {
       setNames: greet.getNames(),
       greet: greet.greetLang(),
       counter: greet.greetCounter(),
       message: greet.errorMessage(),     

    });
});

app.post('/greeted', function (req, res) {

    Greet.greetLang({
        selectedLang: req.body.selectedLang,
        nameEntered: req.body.nameEntered
    });
    res.redirect('/');
});

app.get('/counter', function (req, res) {
    const listNames = greet.counter();
    for (var i= 0;  i< listNames.length;i++) {
       if(){
           
       }
    }
    res.render('counter', { counter: Greet.counter() });
});

const PORT = process.env.PORT || 3010
app.listen(PORT, function () {
    
});

