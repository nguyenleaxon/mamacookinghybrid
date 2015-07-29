'use strict'

console.log("FOUND THE TEST");
describe('javascript', function() {
    console.log("TEST JS");
    it('should know 2 + 2 is 4', function() {
        expect(2 + 2).toEqual(4);
    });
});