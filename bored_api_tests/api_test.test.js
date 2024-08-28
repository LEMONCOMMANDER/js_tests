const somethings = require("./bored_api_2");

// test('checking that "check" is executed', async () => {
//     await expect(check).toMatch(/completed the fetch/);
// });

// test('checking that "check2" is executed', async () => {
//     await expect(check2).toMatch(/did not complete the fetch/);
// });

// test('there are no errors', async () => {
//     await expect(errorm).not.toMatch(/did not work/);
// });

// FROM GPT:

// after adding a return statment in somethings();  running the function in the test becomes an option.
// access the variables from within result, which is defined as the function run  

test('checking that "check" is executed', async () => {
    const result = await somethings(); // Call the function and await the result
    expect(result.check).toMatch(/completed the fetch/);
});

test('checking that "check2" is executed', async () => {
    const result = await somethings(); // Call the function and await the result
    expect(result.check2).toMatch(/did not complete the fetch/);
});

// I am guessing that errorm will be null UNLESS there is an error and it runs. I assume the catch does not execute, 
// (like an else statement), unless the try section fails?

test('there are no errors', async () => {
    const result = await somethings(); // Call the function and await the result
    expect(result.errorm).toBeUndefined(); // No errors should have occurred
    // need to look up .toBeNull - this seems to cause issues. 
    // testing with undefined... this is successful - i defined errorm outside of the catch {} block making it undefined

    //there were issues where errorm was ONLY defined inside the catch {} block. So while errorm would be "null", it was
    //causing issues because it didn't exist. 
});