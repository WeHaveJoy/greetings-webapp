module.exports = function Greet(pool) {

    async function checkNames(name) {
        var checkName = await pool.query('select name from greeting_t where name= $1', [name])
        // console.log(checkName);

        return checkName;
    }

    async function insertNames(myNames) {
        var insert = await pool.query('insert into greeting_t(name, counter) values($1, $2)', [myNames, 1]);
        //console.log(insert.rows);
        return insert.row;
    }

    async function updateCounter(name) {
        var counterUpdate = await pool.query('update greeting_t set counter=counter+1 where name=$1', [name])
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
        var name = await pool.query('select name from greeting_t')
        //  console.log(name.rows);
        return name.rows;
    }

    // function greetCounter() {
    //     var names = Object.keys(namesList)
    //     return names.length;
    // }


    async function deletingData() {
        await pool.query('delete from greeting_t');
    }

    async function greetCounter() {
        var name = await pool.query('SELECT * FROM greeting_t')
        // console.log(name.rowCount);
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
        updateCounter,
        deletingData
    }
}
