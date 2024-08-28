const sum = require('./sum');
//imports the "sum" function from the file sum.js

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});

test('adds 5 + 10 to equal 15', () => {
    expect(sum(5, 10)).toBe(15);
});

test("subtract 4 from 3 to equal -1", () => {
    expect(subtract(4, 3)).toBe(-1);
});