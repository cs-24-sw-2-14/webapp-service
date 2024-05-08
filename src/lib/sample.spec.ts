import {describe, test, expect } from 'vitest';
import { checkHexadecimal } from './ts/checkHexadecimal';
import { getInitials } from './ts/getInitials';

describe("Example File", () => {
    test("Sample test", () => {
        expect(1 + 3).equal(4);
    });
});



describe("Extract initials (getInitials)", () => {
    test("Correct splitting", () => {
        expect(getInitials("Rosa Parks")).equal("RP");
        expect(getInitials("Rosa Parks")).not.equal("R P");
        expect(getInitials("Rosa Parks")).not.equal("Ro");
        expect(getInitials("Rosa Parks")).not.equal("RoP");
        expect(getInitials("Rosa Parks")).not.equal("RPa");
        expect(getInitials("Rosa Parks")).not.equal("R");
        expect(getInitials("Rosa Parks")).not.equal("P");
        expect(getInitials("Rosa Parks")).not.equal("PR");
    })
    test("Correct casing", () => {
        expect(getInitials("Bob Ross")).equal("BR");
        expect(getInitials("Bob Ross")).not.equal("br");
        expect(getInitials("bob ross")).equal("br");
        expect(getInitials("bob ross")).not.equal("BR");
    })
});


describe("URL validation (checkHexa)", () => {
    test("Upper-case validation", () => {
        expect(checkHexadecimal("ABCDEF")).equal(true);
        expect(checkHexadecimal("abcdef")).equal(false);
        expect(checkHexadecimal("ABCDEf")).equal(false);
    });
    test("Char validation", () => {
        expect(checkHexadecimal("123456")).equal(true);
        expect(checkHexadecimal("12345Q")).equal(false);
        expect(checkHexadecimal("12345#")).equal(false);
        expect(checkHexadecimal("12345.")).equal(false);
    });
});