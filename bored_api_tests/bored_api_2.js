// async function somethings() {
//     let check;
//     try {
//         await fetch("https://bored-api.appbrewery.com/random")
//             .then((response) => response.json())
//             .then((json) => console.log(json));
//         //check = console.log('completed the fetch')
//         check = "completed the fetch"
//     } catch (error) {
//         console.error('did not work');
//     }
//     let check2 = 'did not complete the fetch'
//     console.log(check);
//     console.log(check2);
// };

// somethings();

// gpt suggestions to move away from .then - how to use await better:

async function somethings() {
    let check;
    let errorm;
    try {
        const response = await fetch("https://bored-api.appbrewery.com/random"); // Await the fetch response
        console.log(response);
        const json = await response.json(); // Await the parsing of the JSON data
        console.log(json); // Log the parsed JSON
        check = "completed the fetch";
    } catch (error) {
        errorm = 'did not work';
        console.error(errorm, error); // Log any error that occurs during fetch
    }
    let check2 = 'did not complete the fetch';
    console.log(check); // This will log "completed the fetch" if successful, otherwise undefined
    console.log(check2); // This will always log 'did not complete the fetch'

    return { check, check2, errorm }; // gpt pointer - tests need returned values! ****s
}


//somethings();
module.exports = somethings;

// the key components here are that a const variable called response is defined as the fetch request 
// similarly, the json formatting is done as another seperate variable 

// from gpt:

// Using await with fetch:
// The await keyword pauses the execution of the async function until the Promise returned by fetch resolves.
// This allows you to store the result directly in the response variable.

// Parsing JSON with await:
// Similarly, await response.json() pauses the function until the JSON is fully parsed and then stores the
// parsed data in the json variable.
//-----