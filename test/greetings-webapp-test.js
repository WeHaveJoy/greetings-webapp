let assert = require("assert");
let Greet = require("../greetings-webapp");
const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://codex-coder:pg123@localhost:5432/my_greetings';

const pool = new Pool({
    connectionString
});

// describe("Greet factory function", function () {
//     it("should be able to set names", function () {
//         let greetings = Greet();
//         var theNames = greetings.greetLang("IsiXhosa", "Sino")


//         assert.equal(theNames, 'Molo, Sino!');

//     })

//     it("should be able to get names", function () {
//         let greetings = Greet();
//         var names = greetings.greetLang("Afrikaans", "Sino")


//         assert.equal(names, 'Hallo, Sino!');
//     })

//     it("should be able to choose a language", function () {
//         let greetings = Greet();
//         var selectedLang = greetings.greetLang("English", "Bongi")

//         assert.equal(selectedLang, "Hello, Bongi!");
//     })

    it("should be able to show error message", function () {
        let greetings = Greet();
        var message = greetings.errorMessage("Please enter name!");


        assert.equal(message, "Please enter name!");
    })

//     it("should be able to count names", function () {
//         let greetings = Greet();

//         greetings.setNames("IsiXhosa", "Sino");
//         greetings.setNames("English", "Zizo");
//         greetings.setNames("Afrikaans", "Sibo");

//         assert.equal(3, greetings.greetCounter());
//     })
// })


describe('The basic database Greet web app', function(){

    beforeEach(async function(){
        // clean the tables before each test run
        await pool.query("delete from greeting_t");
    });

    it('should pass the db test', async function(){
        
        // the Factory Function is called CategoryService
        // let categoryService = CategoryService(pool);
        let greetings = Greet(pool);
        await greetings.insertNames('sasa');

     //  let greetCounter = await greetings.insertNames();
        assert.equal(1, await greetings.greetCounter());
       // console.log("await greetings.insertNames('sasa')");
    });

    after(function(){
        pool.end();
    })
});
