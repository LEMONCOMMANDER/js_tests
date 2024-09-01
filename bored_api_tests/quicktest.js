function match() {
    let a = 1;
    let b = 1;
    if (a === b) {
        console.log('console log: ok');
        return "ok";
    } else {
        //console.log('console log: not ok');
        return 'not ok';
    }
};

//match();
console.log(match());

//  run this in terminal by typing: node quicktest.js

//match(); exectues the function - the returned value is not displayed in terminal but would be used in the greater context
// of the code base

//console.log(match()); places the whole execution into the terminal to see its output. 

//try commenting the concole.log, the return, the match(); execution an dthe final conosle.log(match) to see how it works
//in terminal