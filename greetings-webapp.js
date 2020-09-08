module.exports = function Greet(name) {
    var namesList = {};

    function setNames(name) {
        if (name) {
            if (namesList[name] === undefined) {
                namesList[name] = 0;
            }
            namesList[name]++

        }
    }



    function greetLang(selectedLang, nameEntered) {
        if (selectedLang === "English") {
            return "Hello, " + nameEntered + "!";
        }
        else if (selectedLang === "Afrikaans") {
            return "Hallo, " + nameEntered + "!";
        }
        else if (selectedLang === "IsiXhosa") {
            return "Molo, " + nameEntered + "!";
        }

        // namesList.push({
        //     type: selectedLang, nameEntered,
        //     //nameNum,

        // });

    }

    function getNames() {
        console.log(namesList)
        return namesList;
    }

    function greetCounter() {
        var names = Object.keys(namesList)
        return names.length;
    }

    function greeted() {
        return namesList;
    }

    // function actionsFor(type) {
    //     return namesList.filter((action) => action.type === type);
    // }

    function errorMessage(selectedLang, nameEntered) {
        var message = "";
        if (!selectedLang) {
            message = "Oops! You forgot to select a language. Please select language...!"
        }
        if (!nameEntered) {
            message = "Please enter name!"
        }
        if (!selectedLang && !nameEntered) {
            message = "Please enter name and select a language!"
        }
        return message;
    }

    return {
        setNames,
        greetLang,
        getNames,
        greetCounter,
        errorMessage,
        greeted
        // actionsFor
    }
}
