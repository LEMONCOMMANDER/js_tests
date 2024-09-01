import fetch from 'node-fetch'; //ES
import { ask, ask2, ask3, ask4 } from './prompts.js'; //prompts.js is commonjs

async function inputTimeOut(ms) {
    return new Promise(resolve) => {
        let timeout = setTimeout(() => {
            console.log('testing timeout');
        }, 3000);
    }
};

async function test() {
    let q = await setTimeout(ask(), 3000); //what data would you like to see
    if (q) { }
};


//from gpt
async function test() {
    try {
        let q = await askWithTimeout(5000); // Wait for user input with a 5-second timeout
        if (q) {
            console.log("User input received:", q);
        } else {
            console.log("No input provided.");
        }
    } catch (error) {
        console.error("Error:", error.message); // Handle the rejection from the timeout
    }
}

async function askWithTimeout(ms) {
    return new Promise((resolve, reject) => {
        let timeoutId = setTimeout(() => {
            reject(new Error("No input received within the time limit."));
        }, ms);

        (async () => {
            try {
                let input = await ask(); // Await the user input
                clearTimeout(timeoutId); // Clear the timeout if input is received
                if (input) {
                    resolve(input);
                } else {
                    reject(new Error("No input provided."));
                }
            } catch (error) {
                reject(error); // Handle any errors that occur in ask()
            }
        })();
    });
}

// Example ask function (simulated for the sake of completeness)
async function ask() {
    // Simulate user input after a delay (replace with actual user input logic)
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Some user input"); // Replace this with actual user input capture
        }, 3000); // Simulate user input after 3 seconds
    });
}

test();
