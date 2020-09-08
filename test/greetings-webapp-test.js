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

        greetings.setNames(name);
        assert.deepEqual(name, greetings.getNames());
    })

    it("should be able to choose a language", function () {
        let greetings = Greet();

        greetings.greetLang(language, nameEntered.value);

        assert.equal(language, nameEntered, greetings.greetLang());
    })

    it("should be able to show error message", function () {
        let greetings = Greet();


        greetings.errorMessage("Please enter name and select a language!");
        assert.equal("Please enter name and select a language!", greetings.errorMessage());
    })

    it("should be able to count names", function () {
        let greetings = Greet();
        
        greetings.setNames("IsiXhosa", "Sino");
        greetings.setNames("English", "Zizo");
        greetings.setNames("Afrikaans", "Sibo");

        assert.equal(3, greetings.greetCounter());
    })
})
