const prompts = require('prompts');

async function ask() {
    const response = await prompts({ //the content of prompts is an object
        type: 'text',
        name: 'question',
        message: "what data would you like to see?"
    });

    //console.log(response.question);
    return response.question;
};

async function ask2() {
    const response = await prompts({
        type: 'text',
        name: 'poke_id',
        message: "what Pokemon are you interested in? | type 'exit' to quit..."
    })
    return response.poke_id;
};

async function ask3() {
    const response = await prompts({
        type: 'text',
        name: 'continue',
        message: "do you want to keep searching data on this Pokemon? - type 'yes' to continue"
    })
    return response.continue;
};

async function ask4() {
    const response = await prompts({
        type: 'text',
        name: 'continue',
        message: "do you want to keep searching for other Pokemon? - type 'yes' to continue"
    })
    return response.continue;
};


module.exports = {
    // shorthand for ask: ask or KEY: VALUE
    ask,
    ask2,
    ask3,
    ask4
};