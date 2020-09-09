let assert = require("assert");
let Greet = require("../greetings-webapp");

describe("Greet factory function", function () {
    it("should be able to set names", function () {
        let greetings = Greet();
        var theNames = greetings.greetLang("IsiXhosa", "Sino")

        
        assert.equal(theNames, 'Molo, Sino!' );

    })

    it("should be able to get names", function () {
        let greetings = Greet();
        var names = greetings.greetLang("Afrikaans", "Sino")

        
        assert.equal(names, 'Hallo, Sino!' );
    })

    it("should be able to choose a language", function () {
        let greetings = Greet();
        var selectedLang = greetings.greetLang("English", "Bongi")

       // greetings.greetLang(language, nameEntered.value);

        assert.equal(selectedLang, "Hello, Bongi!");
    })

    it("should be able to show error message", function () {
        let greetings = Greet();
        var message =  greetings.errorMessage("Please enter name!");

        
        assert.equal(message, "Please enter name!");
    })

    it("should be able to count names", function () {
        let greetings = Greet();
        
        greetings.setNames("IsiXhosa", "Sino");
        greetings.setNames("English", "Zizo");
        greetings.setNames("Afrikaans", "Sibo");

        assert.equal(3, greetings.greetCounter());
    })
})
