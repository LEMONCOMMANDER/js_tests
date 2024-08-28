const sum = require('./sum');
//imports the "sum" function from the file sum.js
const subtract = require('./subtract');

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});

test('adds 5 + 10 to equal 15', () => {
    expect(sum(5, 10)).toBe(15);
});

test("subtract 4 from 3 to equal -1", () => {
    expect(subtract(3, 4)).toBe(-1);
});

test("subtract -8 from 10 to equal 18", () => {
    expect(subtract(10, -8)).toBe(18);
});