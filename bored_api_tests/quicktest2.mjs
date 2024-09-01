//const fetch = require('node-fetch');
import fetch from 'node-fetch';

async function checkapi() {
    let status;
    try {
        let ask = await fetch('https://bored-api.appbrewery.com/random');
        console.log(ask);



        // let response = await ask.json();
        // console.log(response);
        // let textResponse = await ask.text();  // Get the raw response as text
        // console.log(textResponse);  // Log the raw 

        // try {
        //     let jsonResponse = JSON.parse(textResponse);
        //     console.log(jsonResponse);  // Log the JSON response if parsing is successful
        // } catch (jsonError) {
        //     console.error("Failed to parse JSON:", jsonError);
        // }

    } catch (error) {
        console.log('ERROR:');
        console.log(error);
    }
};

checkapi();