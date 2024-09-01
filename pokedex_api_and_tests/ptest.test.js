// // const pokedex = require('./pokedex.mjs');
// import pokedex from './pokedex.mjs';


//GPT ---------------------------------------------------------------------------------------------------------------------------------------------------------- DYANAMIC IMPORT
// Option 3: Use Dynamic import()
// If you prefer to stick with CommonJS in your test file but want to import an ES module, you can use the dynamic import() function, which is asynchronous:

// test('should do something', async () => {
//     const { myFunction } = await import('./myModule.mjs');
//     expect(myFunction()).toBe(someValue);
// });

//NOTE AS OF 8/30/24 - THE POKEAPI HOUSES 1025 options. 

const random_number = math.ceil(math.random() * 1025); //number between 1-1025
const yes_no = math.floor(math.random() * 2); //0 or 1

//status options:
//statuses1: ["name_ok", "abilities_ok", "forms_ok", "moves_ok", "stats_ok", "types_ok"]
//statuses2: ["real_user", "u_in"]
//Statuses3: ["boot_exit", "choice_exit", "catch_exit"]
//Statuses4: ["catch_continue", "new_p_continue", "same_p_continue"]
//Statuses5: ["catch_error","user_input_error"]

async function test1(Q1, Q2, Q3, Q4, Q5 = undefined) {
    Test("pokedex function with given give_input", async () => {
        //where myFunction = pokdex(u_in = undefined); -->  we will provide the u_in
        const myFunction = await import('./pokedex.mjs'); //dynamic import
        expect(myFunction(Q1, Q2, Q3, Q4)).toBe(Q5); //type will be a dictionary/object of arrays (return statement from pokedex) 
    });
};

// ------------------------------------- STATIC TESTS ------------------------------------- \\

test1(124, "moves", "no", "no") {
    Q5 = {
        statuses1: ['moves_ok'],
        statuses2: ['real_user'],
        statuses3: ['choice_exit'],
        statuses4: [],
        statuses5: []
    }
};


// SETUPT;
// bascially we should provide all the required info in test1() - the user_inputs should be a list of everything needed to run test 1. 
//  this means:
//      1. first question requires a pokemon ID between 1-1025
//      2. the second question requires a check on what data to look for in the pokemon
//      3. the 3rd Q asks if you want to keep looking at that pokemon's info
//      4. the 4th Q asks if you want to look at a different pokemon's info
//      5. A status should also be added on any exit or error

// Static tests should all be pre configued, where all of these are decided on test_1 arguments
// random tests can use the random numbers assigned in the const statements - this will look like:

//      async function test2(Q1, Q2, Q3, Q4) {
//          Q1 = random assignment 
//          Q2 = random assignment ...
//          rest of test code()...
//      };


// all tests should not look at output, but should look at output status - so the pokedex function will need to be configured to assign a value to a variable called 
//  status on success of an operation. This will be evaluated in the .toBe() section ==> xxx.toBe(<status_value>)
