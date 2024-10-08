import fetch from 'node-fetch'; //ES
import { ask, ask2, ask3, ask4 } from './prompts.js'; //prompts.js is commonjs

//bored api was giving too many issues, switching to another database. The one I found was pokemon themed so I had no choice...

async function pokedex(u_in = undefined) {
    // ---------------------------------------------------------------------------------------------------------- SETUP 

    const statuses1 = []; //for result inputs 
    const statuses2 = []; //for user statuses
    const statuses3 = []; //for exit statuses
    const statuses4 = []; //continue statuses
    const statuses5 = []; //error statuses

    // see for JS array functions:
    //https://www.geeksforgeeks.org/how-to-append-an-element-in-an-array-in-javascript/#:~:text=JavaScript%20push()%20Method%20will,your%20simplest%20and%20quickest%20option.
    let info = [];
    //assigned in returned_info();

    function delay(ms) {
        //https://www.geeksforgeeks.org/how-to-delay-a-javascript-function-call-using-javascript/
        //PROMISES: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
        //      specifically promoise.resolve()
        //I think this syntax below sets the resolve such like: promise.resolve() => ... see PROMISE.txt
        return new Promise(resolve => setTimeout(resolve, ms));

    }



    function noise() {
        //we use floor becuase this number selects from an array - where indexing starts at 0. options here for example are 0,1,2
        return Math.floor(Math.random() * 3);
    };

    async function exit() {
        const exit_message = "UNTIL NEXT TIME";
        console.log("understood - shutting down...")
        await delay(1000);
        console.log('.');
        await delay(1000);
        console.log('.');
        console.log("BEEP BOOP");
        console.log(exit_message);
        console.log('');
        console.log('TESTING-- RETURN IS:');
        console.log({ statuses1, statuses2, statuses3, statuses4, statuses5 });
        return { statuses1, statuses2, statuses3, statuses4, statuses5 };
    };

    // ---------------------------------------------------------------------------------------------------------- SETUP 
    // ---------------------------------------------------------------------------------------------------------- FUNCTION START... --------------------------------------
    info = []; //Clears anything in info - handels recursive calls 
    console.log('');
    let id = await ask2(); //asks which pokemon to view 
    id = await id.toLowerCase();
    if (id === 'exit') { //quits on 'exit' ------------------------------------------------------------------------------ STARTUP EXIT
        statuses3.push("boot_exit");
        exit();
        return { statuses1, statuses2, statuses3, statuses4, statuses5 };
    }
    let u_input; // assigned later
    let data_list = ['name', 'abilities', 'forms', 'moves', 'stats', 'types']; //options
    try {
        // IF ID is false, goes to catch -
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + id);
        const data = await response.json();
        const pokemon_name = data.name;

        user_query(); //start program

        async function user_query() {
            info = []; //clears array on recursion 
            // ---------------------------------------------------------------------------------------------------------- SHOW OPTIONS TO USER
            console.log("you can choose one of the following on your selection:");
            console.log('name');
            console.log('abilities');
            console.log('forms');
            console.log('moves');
            console.log('stats');
            console.log('types');
            console.log('exit');
            console.log(''); //spacer

            // ---------------------------------------------------------------------------------------------------------- ASK FOR USER INPUT OR ACCEPT TESTING DATA

            //if no input is given on the function call, it will ask the user
            if (u_in === undefined) {
                u_input = await ask(); //input from the find_pk function (this one)
                u_input = await u_input.toLowerCase();
                // FOR JEST TESTING --
                console.log("U_input:");
                console.log(u_input);
                statuses2.push("real_user");
                // FOR JEST TESTING --
            } else { //takes the input of the function for testing purposes in JEST
                u_input = u_in;
                statuses2.push("u_in");
            }

            // ---------------------------------------------------------------------------------------------------------- EXIT PROGRAM

            if (u_input === 'exit') {
                statuses3.push("choice_exit");
                exit();
                return { statuses1, statuses2, statuses3, statuses4, statuses5 };
            }

            // ---------------------------------------------------------------------------------------------------------- RUN ACCEPTABLE QUERY

            if (u_input === 'name') {

            }

            //INSIDE USER_QUERY FUNCTION 
            async function next() {
                let next_q = await ask3();
                next_q = await next_q.toLowerCase();
                if (next_q === 'yes') {
                    statuses4.push("same_p_continue");
                    console.log('');
                    user_query();
                } else {
                    next_q = await ask4();
                    next_q = await next_q.toLowerCase();
                    if (next_q === 'yes') {
                        statuses4.push("new_p_continue");
                        console.log('');
                        console.log('GREAT!');
                        pokedex();
                    } else {//quits on 'exit' ------------------------------------------------------------------------------ QUERY COMPLETE, USER EXIT
                        statuses3.push('choice_exit');
                        exit();
                        return { statuses1, statuses2, statuses3, statuses4, statuses5 };
                    }
                }
            };


            // if (Uinput.toLowerCase() in data_list) -- this syntax doesn't work in javascript - use .includes 
            // furthermore, there is no NOT - use ! instead. like: 
            //                          if (!(data_list.includes(Uinput.toLowerCase())))
            if (data_list.includes(u_input)) {
                console.log("Very well - just 2 seconds... ");
                await delay(1000); //1000ms = 1 seconds
                console.log('.');
                await delay(1000);
                console.log('.');
                //console.log(data.u_input); ---->> this is not the right way to access the json file - instead its
                //      data[u_ipnut]

                let noise_number = (noise() === 0) ? "BEEP" : (noise() === 1) ? "BOOP" : "BOP";
                // had to look up ternary syntax for JS in GPT...  condition (noise() = sound) IF(?) output is 0 -> beep : IF(?) output is 1 --> boop : ELSE bop

                console.log(noise_number);
                console.log('');

                // ---------------------------------------------------------------------------------------------------------- RETURN INFORMATION | FILTER ON OPTIONS

                returned_info(); // should really be called after the function but...
                function returned_info() {
                    if (u_input === 'name') {
                        statuses1.push("name_ok");
                        console.log("Pokemon name:");
                        console.log(pokemon_name);
                        console.log('');
                        next();
                    } else {
                        console.log("Pokemon name:");
                        console.log(pokemon_name);
                        // console.log('');
                        // console.log("uinput: " + u_input);
                        let i = 0;
                        if (u_input === "abilities") {
                            //on for loops in JS - SYNTAX
                            // if (init; run condition; increment) {code}
                            //because I initialized i outside of the loop - I still need to include the init section ((; condition...)
                            //                                                                                         ^
                            //therefore,this will not work:  for (i < data.stuff; i++;)
                            for (; i < data.abilities.length; i++) {

                                //JSON(OBJECT).array[index].object_name.value      ---- sytnax form -----
                                info.push(data.abilities[i].ability.name);
                                // index increates each run --> i++

                            }
                            console.log(info);
                            console.log('');
                            statuses1.push("abilities_ok");
                            next();//asks user to continue or quits - returns info
                        } else if (u_input === "forms") {
                            for (; i < data.forms.length; i++) {
                                info.push(data.forms[i].name);
                            }
                            console.log(info);
                            console.log('');
                            statuses1.push("forms_ok");
                            next();
                        } else if (u_input === "moves") {
                            for (; i < data.moves.length; i++) {
                                info.push(data.moves[i].move.name);
                            }
                            console.log(info);
                            console.log('');
                            statuses1.push("moves_ok");
                            next();
                        } else if (u_input === "stats") {
                            for (; i < data.stats.length; i++) {
                                info.splice(i, 0, data.stats[i].stat.name + ": " + data.stats[i].base_stat); //splice for practice - position in array (start), deletecount, item (to add)
                            }
                            console.log(info);
                            console.log('');
                            statuses1.push("stats_ok");
                            next();
                        } else if (u_input === "types") {
                            for (; i < data.types.length; i++) {
                                // another method of manipulating array format
                                if (i != data.types.length - 1) {
                                    info.push(data.types[i].type.name);
                                    info.push(", ");
                                } else {
                                    info.push(data.types[i].type.name);
                                }
                                console.log(info);
                                console.log('');
                                statuses1.push("types_ok");
                                next();
                            }
                        }
                    }

                    return { statuses1, statuses2, statuses3, statuses4, statuses5 }; //also like KEY: VALUE shorthand - where key and value are = if no key is specified 
                };

                // ---------------------------------------------------------------------------------------------------------- BREAK ON FALSE QUERY

            } else {
                statuses5.push("user_input_error");
                console.log("Sorry - I couldn't find anything on your input:");
                console.log(u_input);
                console.log('');
                console.log("Please try again");
                user_query(); // recursive call 
            }
        };

        // ---------------------------------------------------------------------------------------------------------- SHOW OPTIONS TO USER


        // ---------------------------------------------------------------------------------------------------------- ERROR CATCH
    } catch (error) {
        statuses5.push("catch_exit");
        console.log('');
        console.log("ERROR: it seems THAT wasn't a pokemon in my database!");
        console.log('BUT I CAN STILL HELP. FIRST SEE THE ERROR BELOW');
        console.log('');
        console.log('------------- ERROR IS:');
        console.log(error);
        console.log('');
        let next_q = await ask4();
        next_q = await next_q.toLowerCase();
        if (next_q === 'yes') {
            statuses4.push("catch_continue");
            console.log('');
            pokedex();
            return info; //does this return do anything if pokedex is called?
        } else { //quits on 'exit' ------------------------------------------------------------------------------ QUERY COMPLETE, USER EXIT
            statuses3.push("catch_exit");
            exit();
            return { statuses1, statuses2, statuses3, statuses4, statuses5 };
        }
    }

    return { statuses1, statuses2, statuses3, statuses4, statuses5 };
};

export default pokedex; //for use in jest testing

pokedex(); //for executing the function directly in node.

