const multiply = require('./multiply');

// testing a second .test file while running npm test 

test('multiply 5 and 3 to equal 15', () => {
    expect(multiply(5, 3)).toBe(15);
});

test('random message', () => {
    expect(multiply(2, 4)).toBe(8);
});