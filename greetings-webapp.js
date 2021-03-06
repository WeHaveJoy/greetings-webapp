module.exports = function greet(pool) {

    async function checkNames(name) {
        var checkName = await pool.query('select name from greeting_t where name= $1', [name])

        return checkName;
    }

    async function insertNames(myNames) {
        var insert = await pool.query('insert into greeting_t(name, counter) values($1, $2)', [myNames, 1]);
        return insert.row;
    }

    async function updateCounter(name) {
        var counterUpdate = await pool.query('update greeting_t set counter=counter+1 where name=$1', [name]).toUppercase;
        return counterUpdate;
    }


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
        return name.rows;
    }




    async function deletingData() {
        await pool.query('delete from greeting_t');
    }

    async function greetCounter() {
        var name = await pool.query('SELECT * FROM greeting_t')
        return name.rowCount;
    }

    async function counterForOne(count) {
        var name = await pool.query('SELECT counter FROM greeting_t where name=$1', [count]);
        return name.rows[0];
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
        insertNames,
        updateCounter,
        deletingData,
        counterForOne
    }
}
