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
  "index",{  
})
});

app.post('/', function (req, res) {
console.log(greet.setNames(req.body.nameValue))
console.log(greet.greetLang(req.body.language,req.body.nameValue))

    greet.greetLang(req.body.language,req.body.nameValue);
    greet.setNames(req.body.nameValue);

    
res.render('index',{
   message :  greet.greetLang(req.body.language,req.body.nameValue),
   count : greet.greetCounter()
})

    // res.redirect('/');
});


app.get('/counter/names', function (req, res) {
    // const listNames = greet.counter();
    // for (var i= 0;  i< listNames.length;i++) {
    //    if(){

    //    }
    // }
    res.render('counter', { counter: Greet.counter() });
});

const PORT = process.env.PORT || 3010
app.listen(PORT, function () {

});

