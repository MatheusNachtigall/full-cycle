const { Soma, SomaX, SomaXX, SomaXXX, SomaXXXX } = require('./math')

test("Add 1+2 = 3", () => {
    expect(Soma(1,2)).toBe(3);
})

test("Add 1+2+1 = 4", () => {
    expect(SomaX(1,2)).toBe(4);
})

test("Add 1+2+1+1 = 5", () => {
    expect(SomaXX(1,2)).toBe(5);
})

test("Add 1+2+1+1+1 = 6", () => {
    expect(SomaXXX(1,2)).toBe(6);
})

test("Add 1+2+1+1+1+1 = 7", () => {
    expect(SomaXXXX(1,2)).toBe(7);
})
