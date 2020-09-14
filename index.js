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
    res.render(
        "index", {
    })
});

app.post('/', function (req, res) {
    // console.log(greet.setNames(req.body.nameValue))
    // console.log(greet.greetLang(req.body.language,req.body.nameValue))

    greet.greetLang(req.body.language, req.body.nameValue);
    greet.setNames(req.body.nameValue);
    var error =  greet.errorMessage(req.body.language, req.body.nameValue);

    res.render('index', {
        message: (error === "") ? greet.greetLang(req.body.language, req.body.nameValue) : error,
        count: greet.greetCounter(),
        greeted: greet.getNames()
       
    })

    // res.redirect('/');
});


app.get('/counter', function (req, res) {
    const listNames = greet.counter();
    for (counter of listNames) {
        counter.nameNum = listNames++;
    }
    res.render('counter', { counter: listNames });

    res.render('counter', { counter: greet.counter() });
});

app.get('/greeted', function (req, res){
   
    
    res.render('greeted', { greeted:greet.getNames()});
})

app.get('/greeted/:name', function (req, res) {
    const name = req.params.name;

    // const listNames = greet.actionsFor(nameType);
    var count =  greet.getNameCount(name)

    // for (action of listNames) {
    //     action.nameNum = action.listNames;
    // }
    res.render('greeted', { greetedName: `${name} have been greeted ${count} time(s)` });
})

const PORT = process.env.PORT || 3010
app.listen(PORT, function () {

});

