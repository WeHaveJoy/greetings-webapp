module.exports = function Greet(name){
    var namesList = name || [];
    
        function setNames(name){
           if(name){
                if(!namesList.includes(name)){
                 namesList.push(name);
    
                }
            }
        }
    
        function greetLang(selectedLang, nameEntered){
            if(selectedLang === "English"){
               return "Hello, " + nameEntered + "!";
            }
            else if(selectedLang === "Afrikaans"){
                return "Hallo, " + nameEntered + "!";
            }
            else if(selectedLang === "IsiXhosa"){
                return "Molo, " + nameEntered + "!";
            }
            
        }
    
      function getNames(){
            return namesList;
        }
    
        function greetCounter(){
            return namesList.length;
        }
    
        function errorMessage(selectedLang, nameEntered){
            var message = "";
            if(!selectedLang){
              message = "Oops! You forgot to select a language. Please select language...!"
            }
            if(!nameEntered){
             message = "Please enter name!"
            }
            if(!selectedLang && !nameEntered){
              message = "Please enter name and select a language!"
            }
            return message;
        }    
    
    return{
        setNames,
        greetLang,
        getNames,
        greetCounter,
        errorMessage
    }
    }
    