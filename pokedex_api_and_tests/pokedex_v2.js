const { ask, ask2, ask3, ask4 } = require('./prompts.js'); //prompts.js is commonjs
//-------------------------------------------------------------------------------------------------------------------------- NOTES
//  see pokedex_notes.txt --- 
//      note 1 for Promise object info and the Dealy function
//      note 2 for timeout details
//      note 3 for promise.race
//-------------------------------------------------------------------------------------------------------------------------- NOTES


//-------------------------------------------------------------------------------------------------------------------------- VARIABLES
const text_spacer = console.log('');
const data_list = ['name', 'abilities', 'forms', 'moves', 'stats', 'types']; //options
const userOrTest = [];
const optionType = [];
const exitType = [];
const continueType = [];
const errorType = [];
const confirmType = [];
let info = [];
//-------------------------------------------------------------------------------------------------------------------------- DEFINE FUNCTIONS
//------------------------------------------------------------ DELAY
function delay(ms, shouldReject = false) {
    let timeout = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldReject) {
                reject(new Error("timeout_error"));
            } else {
                resolve();
            }
        }, ms);
    }); // SEE NOTE 1
    return timeout;
}

//------------------------------------------------------------ NOISE
function noise() {
    let number = Math.floor(Math.random() * 3);
    let noise_number = (number === 0) ? "BEEP" : (number === 1) ? "BOOP" : "BOP";
    //we use floor becuase this number selects from an array - where indexing starts at 0. options here for example are 0,1,2
    return noise_number;
};
//------------------------------------------------------------ EXIT
async function exit(retVal) {
    console.log("shutting down...")
    await delay(1000);
    console.log('.');
    await delay(1000);
    console.log('.');
    console.log("BEEP BOOP");
    console.log("UNTIL NEXT TIME");
    text_spacer;
    // console.log('TESTING-- RETURN IS:');
    // console.log(await retVal); //finishes console.log before return
    return retVal;
};
//------------------------------------------------------------ CALL PROMPT
async function call_prompt(input_id) {
    let id;
    //evaluates if input_id has a "truthy" value, which will be the case if function input is given. 
    if (input_id) {
        id = input_id.toLowerCase();
        return id;
    } else {
        //this code comes from GPT -- see NOTE 2
        try {
            id = await Promise.race([ //uses Promise.race to see if ask() or delay() resolves first. REQUIRES A REJECT from setTimeout()
                ask(),
                delay(6000, true)
            ]);
            clearTimeout(timeout); // if input happens, cancel the timout -> "timeout" returned from delay
            id = id.toLowerCase();
        } catch (error) { //takes in a value called "error" - it could be anything but it takes an Error object from the try block, so "error" is functionally best
            if (error.message === "timeout_error") {
                console.log("timeout exit");
                exitType.push("timeout_exit");
                return exit({ confirmType, userOrTest, optionType, exitType, continueType, errorType }); //return statuses 
            }
        }
        return id;
    }
};
//------------------------------------------------------------ API FETCH
async function fetch_Pokemon(id) {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + id);
    return response.json();
}
//------------------------------------------------------------ USER_QUERY
async function user_query(dataOption) {
    // SHOW OPTIONS TO USER
    console.log("you can choose one of the following on your selection:");
    console.log('name');
    console.log('abilities');
    console.log('forms');
    console.log('moves');
    console.log('stats');
    console.log('types');
    console.log('exit');
    text_spacer;

    if (dataOption) {
        userOrTest.push("test");
        dataOption = dataOption.toLowerCase();
        return dataOption;
    } else {
        try {
            dataOption = await Promise.race([
                await ask2(),
                delay(6000, true)
            ]);
            clearTimeout(timeout);
        } catch (error) {
            if (dataOption === "timeout_error") {
                exitType.push("timeout_exit");
                return exit({ confirmType, userOrTest, optionType, exitType, continueType, errorType });
            }
        }
        return dataOption;
    }
};
//------------------------------------------------------------ ASK CONTINUE QUESTIONS
async function new_pokemon(YorN2) {
    if (YorN2) {
        YorN2 = YorN2.toLowerCase();
        if (YorN2 === "yes") {
            continueType.push("new_p_continue")
            call_prompt();
        } else {
            exitType.push("choice_exit");
            return exit({ confirmType, userOrTest, optionType, exitType, continueType, errorType });
        }
    } else {
        try {
            YorN2 = await Promise.race([
                await ask4(),
                delay(6000, true)
            ]);
            clearTimeout(timeout);
            YorN2 = YorN2.toLowerCase();
            if (YorN2 === "yes") {
                continueType.push("new_p_continue")
                call_prompt();
            } else {
                exitType.push("choice_exit");
                return exit({ confirmType, userOrTest, optionType, exitType, continueType, errorType });
            }
        } catch (error) {
            if (error.message === "timeout_error") {
                exitType.push("timeout_exit");
                return exit({ confirmType, userOrTest, optionType, exitType, continueType, errorType });
            }
        }
    }
};

async function same_Pokemon(YorN1, YorN2) {//will call new_pokemon() as needed.
    if (YorN1) {
        YorN1 = YorN1.toLowerCase();
        if (YorN1 === "yes") {
            continueType.push("same_p_continue")
            user_query();
        } else {
            new_pokemon(YorN2);
        }
    } else {
        try {
            YorN2 = await Promise.race([
                ask3(),
                delay(6000, true)
            ]);
            clearTimeout(timeout);
            YorN1 = YorN1.toLowerCase();
            if (YorN1 === "yes") {
                continueType.push("same_p_continue")
                user_query();
            } else {
                exitType.push("choice_exit");
                return exit({ confirmType, userOrTest, optionType, exitType, continueType, errorType });
            }
        } catch (error) {
            if (error.message === "timeout_error") {
                exitType.push("timeout_exit")
                return exit({ confirmType, userOrTest, optionType, exitType, continueType, errorType });
            }
        }
    }
};
//------------------------------------------------------------ SHOW_RESULTS
async function show_results(data, request, YorN1, YorN2) {
    if (data_list.includes(request)) { //IF input is in data list
        //------------------- FLAVOR TEXT
        console.log("Very well - just 2 seconds... ");
        await delay(1000); //1000ms = 1 seconds
        console.log('.');
        await delay(1000);
        console.log('.');
        noise_number = noise();
        console.log(noise_number); //returned from noise()
        //------------------- FUNCTIONAL PART  
        if (request === 'exit') {
            exitType.push("choice_exit");
            console.log("understood...");
            return exit({ confirmType, userOrTest, optionType, exitType, continueType, errorType });
        }
        if (request === 'name') {
            confirmType.push("name_ok");
            console.log("Pokemon name:");
            console.log(data.name)
            text_spacer;
            same_Pokemon(YorN1, YorN2);
        } else { //always give the name and some other data.
            console.log("Pokemon name:");
            console.log(data.name);
            let i = 0;
            if (request === "abilities") {
                for (; i < data.abilities.length; i++) { //for (i;  i < da....)
                    //JSON(OBJECT).array[index].object_name.value      ---- sytnax form -----
                    info.push(data.abilities[i].ability.name);
                }
                console.log(info);
                text_spacer;
                confirmType.push("abilities_ok");
                same_Pokemon(YorN1, YorN2);
            } else if (request === "forms") {
                for (; i < data.forms.length; i++) {
                    info.push(data.forms[i].name);
                }
                console.log(info);
                text_spacer;
                confirmType.push("forms_ok");
                same_Pokemon(YorN1, YorN2);
            } else if (request === "moves") {
                for (; i < data.moves.length; i++) {
                    info.push(data.moves[i].move.name);
                }
                console.log(info);
                text_spacer;
                confirmType.push("moves_ok");
                same_Pokemon(YorN1, YorN2);
            } else if (request === "stats") {
                for (; i < data.stats.length; i++) {
                    //splice operates on arrays so the stats endpoint must be a list of stat info - this pulls specific parts (stat name and base stat) and puts them together
                    info.splice(i, 0, data.stats[i].stat.name + ": " + data.stats[i].base_stat); //splice for practice - position in array (start), deletecount, item (to add)
                }
                console.log(info);
                text_spacer;
                confirmType.push("stats_ok");
                same_Pokemon(YorN1, YorN2);
            } else if (request === "types") {
                for (; i < data.types.length; i++) {
                    // another method of manipulating array format
                    if (i != data.types.length - 1) {
                        info.push(data.types[i].type.name);
                        text_spacer;
                    } else {
                        info.push(data.types[i].type.name);
                    }
                    console.log(info);
                    text_spacer;
                    confirmType.push("types_ok");
                    same_Pokemon(YorN1, YorN2);
                }
            }
        }
    } else {
        errorType.push("user_input_error");
        console.log("Sorry - I couldn't find anything on your input:");
        console.log(dataOption);
        text_spacer;
        console.log("Please try again");
        user_query(); // recursive call with no argument, in tests WILL exit on timeout. If I feed it request, it will cause a loop
    }
};

//-------------------------------------------------------------------------------------------------------------------------- PROGRAM
async function pokedex(input_id, dataOption, YorN1, YorN2) {
    // input_id: number between 1-1025
    // dataOption: anything in data_list
    // YorN: "yes" or "no"
    //-----------------------------------
    id = await call_prompt(input_id); //what pokemon do you want to see?
    let data;
    try {
        data = await fetch_Pokemon(id); //send to pokeAPI from id
    } catch (error) {
        //------------ FLAVOR TEXT AND ERROR REPORT
        errorType.push("catch_exit");
        text_spacer;
        console.log("ERROR: it seems THAT wasn't a pokemon in my database!");
        console.log('BUT I CAN STILL HELP. FIRST SEE THE ERROR BELOW');
        text_spacer;
        console.log('------------- ERROR IS:');
        console.log(error);
        text_spacer;
        console.log("now...");
        //------------- FUNTION PART
        // next_pokemon() function but updating statuses for catch... so just reusing code -
        if (YorN2) {
            YorN2 = YorN2.toLowerCase();
            if (YorN2 === "yes") {
                continueType.push("catch_continue") //SWITCH TO CATCH
                call_prompt();
            } else {
                exitType.push("catch_exit"); //SWITCH TO CATCH
                return exit({ confirmType, userOrTest, optionType, exitType, continueType, errorType });
            }
        } else {
            try {
                YorN2 = await Promise.race([
                    ask4(),
                    delay(6000, true)
                ]);
                clearTimeout(timeout);
                YorN2 = YorN2.toLowerCase();
                if (YorN2 === "yes") {
                    continueType.push("catch_continue") //SWITCH TO CATCH
                    call_prompt();
                } else {
                    exitType.push("catch_exit"); //SWITCH TO CATCH
                    return exit({ confirmType, userOrTest, optionType, exitType, continueType, errorType });
                }
            } catch (error) {
                if (error.message === "timeout_error") {
                    exitType.push("timeout_exit");
                    exitType.push("catch_exit"); //ADDED CATCH EXIT
                    return exit({ confirmType, userOrTest, optionType, exitType, continueType, errorType });
                }
            }
        }
    }
    try {
        let request = await user_query(dataOption); //select info you want to see
        await show_results(data, request, YorN1, YorN2); //shows user results and asks for next steps?
    } catch (error) {
        console.log('test error for 2nd try-catch');
        console.log(error);
    }
};

pokedex();

