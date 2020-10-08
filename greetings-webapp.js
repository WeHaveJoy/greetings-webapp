module.exports = function Greet(pool) {

    function checkNames(name) {
        var checkName = pool.query('select name from greeting_t where name= $1', [name])
        return checkName;
    }

    async function insertNames(myNames) {
        await pool.query('insert into greeting_t(name, counter) values($1, $2)', [myNames, 1]);
    }

    function updateCounter(name) {
        var counterUpdate = pool.query('update greeting_t set counter=counter+1 where name=$1', [name])
        return counterUpdate;
    }

    // function getNameCount(name) {
    //     return namesList[name];
    // }

    async function greetLang(selectedLang, nameEntered) {
        var names = await checkNames(nameEntered)
        if (names.rowCount > 0) {
            await updateCounter(nameEntered);
        } else {
            await insertNames(nameEntered);
        }


        if (selectedLang === "English") {
            return "Hello, " + nameEntered + "!";
        }
        else if (selectedLang === "Afrikaans") {
            return "Hallo, " + nameEntered + "!";
        }
        else if (selectedLang === "IsiXhosa") {
            return "Molo, " + nameEntered + "!";
        }
    }

    async function getNames() {
        var name = pool.query('select name from greeting_t')
        return name;
    }

    // function greetCounter() {
    //     var names = Object.keys(namesList)
    //     return names.length;
    // }

    function greetCounter() {
        var name = pool.query('SELECT * FROM greeting_t')
        return name.rowCount;
    }

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
        checkNames,
        greetLang,
        getNames,
         greetCounter,
        errorMessage,
        // greeted,
        // getNameCount,
        insertNames,
        updateCounter
    }
}
