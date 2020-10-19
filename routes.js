module.exports = function routes(greet) {
    const _ = require('lodash');

    function flashMessages(req, res) {
        req.flash('info', 'Flash Message Added');
        res.redirect('/');
    }

    async function index(req, res) {
        res.render(
            "index", { count: await greet.greetCounter() });
    }

    async function homeRoute(req, res) {

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
            else if(isNaN(name) === false){
                req.flash('error', "Please don't enter a number!")
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
    }

    async function counter(req, res) {

        res.render('counter', { counter: await greet.greetCounter() });
    }

    async function greeted(req, res) {


        res.render('greeted', { greeted: await greet.getNames() });
    }

    async function countUser(req, res) {
        const name = req.params.name;

        var count = await greet.counterForOne(name)

        for (const action in count) {
            var gcounter = count[action]

        }
        res.render('count', { greetedName: `Hello, ${name} have been greeted ${gcounter} time(s)` });
    }

    async function deleteData(req, res) {
        await greet.deletingData()
        res.render('index', {
            counter: await greet.greetCounter(),
            count: await greet.greetCounter()
        })
    }

    return {
        flashMessages,
        index,
        homeRoute,
        counter,
        greeted,
        countUser,
        deleteData
    }
}