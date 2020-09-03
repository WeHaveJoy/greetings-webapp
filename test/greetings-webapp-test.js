let assert = require("assert");
let Greet = require("../greetings-webapp");

describe("Greet factory function", function () {
    it("should be able to set names", function () {
        let greetings = Greet();

        greetings.setNames("Zizipho");
        greetings.setNames("Phelokazi");
        greetings.setNames("Zandile");
        assert.equal("Zizipho,Phelokazi,Zandile", greetings.getNames());
    })

    it("should be able to get names", function () {
        let greetings = Greet();

        greetings.setNames("Lisa");
        assert.equal("Lisa", greetings.getNames());
    })

    it("should be able to choose a language", function () {
        let greetings = Greet();

        greetings.greetLang(selectedLang, nameEntered.value);

        assert.equal(selectedLang, nameEntered, greetings.greetLang());
    })

    it("should be able to show error message", function () {
        let greetings = Greet();


        greetings.errorMessage("Please enter name and select a language!");
        assert.equal("Please enter name and select a language!", greetings.errorMessage());
    })

    it("should be able to count names", function () {
        let greetings = Greet();

        greetings.greetCounter(0);
        assert.equal(0, greetings.greetCounter());
    })
})
