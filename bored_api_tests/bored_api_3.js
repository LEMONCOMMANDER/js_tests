//This is my 3rd project - in this one, I will use what I've learned so far and try and write a basic test from scratch//
const axios = require('axios');
const fetch = require('node-fetch');

async function checkapi() {
    let status;
    try {
        //let ask = await axios.get("https://bored-api.appbrewery.com/random");
        let ask = await fetch('https://bored-api.appbrewery.com/random');
        let response = await ask.json();
        if (response.type === 'education') {
            status = "type is: " + `${response.type}` + " and the activity is:  " + `${response.activity}`;
            console.log(status);
        } else if (response.type === "recreational") {
            //console.log("type is: " + `${response.type}` + " and the activity is:  " + `${response.activity}`);
            status = "type is: " + `${response.type}` + " and the activity is:  " + `${response.activity}`;
            console.log(status);
        } else if (response.type === "social") {
            status = "type is: " + `${response.type}` + " and the activity is:  " + `${response.activity}`;
            console.log(status);
        } else if (response.type === "charity") {
            status = "type is: " + `${response.type}` + " and the activity is:  " + `${response.activity}`;
            console.log(status);
        } else if (response.type === "cooking") {
            status = "type is: " + `${response.type}` + " and the activity is:  " + `${response.activity}`;
            console.log(status);
        } else if (response.type === "relaxation") {
            status = "type is: " + `${response.type}` + " and the activity is:  " + `${response.activity}`;
            console.log(status);
        } else if (response.type === "busywork") {
            status = "type is: " + `${response.type}` + " and the activity is:  " + `${response.activity}`;
            console.log(status);
        }

        return { status };

    } catch (error) {
        console.error(error);
    }

};

checkapi();
//module.exports = checkapi;