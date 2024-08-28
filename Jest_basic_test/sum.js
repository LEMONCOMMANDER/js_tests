function sum(a, b) {
    return a + b;
}
module.exports = sum;

// note from studies - 
//export, module.exports, and exports (which is a shorthand of the previous) are different methods of exporting data from a file.
//export uses import {}, where the items you want to import are inside the {}. The full syntax is:
// import (<items>) from './<FILEPATH>'

//module.exports is a different style that is more commonly seen in node.js. You will see this with a new assignment and 
//'require()' as a keyword on inport. The argument is the file path:
// const variable = require('<./FILEPATH>');


//calculator
//function add(a, b) {
//     return a + b;
// }

// function subtract(a, b) {
//   return a - b;
// }

// module.exports = {
//   add,
//   subtract
// };

//on a new file, you will see:
// const calculator = require('./calculator'); - which grants "access" to the add and subtract functions