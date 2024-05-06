import {describe, test, expect } from 'vitest';
import { checkHexa } from './ts/checkHexa';
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
        expect(checkHexa("ABCDEF")).equal(true);
        expect(checkHexa("abcdef")).equal(false);
        expect(checkHexa("ABCDEf")).equal(false);
    });
    test("Char validation", () => {
        expect(checkHexa("123456")).equal(true);
        expect(checkHexa("12345Q")).equal(false);
        expect(checkHexa("12345#")).equal(false);
        expect(checkHexa("12345.")).equal(false);
    });
});