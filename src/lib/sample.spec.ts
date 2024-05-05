import {describe, test, expect } from 'vitest';
import { checkHexadecimal } from './logic';

describe("Example File", () => {
    test("Sample test", () => {
        expect(1 + 3).equal(4);
    });
});

describe("Thorbjørn", () => {
    test("Valid UID input? (checkHexadecimal)", () => {
        expect(checkHexadecimal("13FD3D")).equal(true);
        expect(checkHexadecimal("1287.zsA3d")).equal(false);
        expect(checkHexadecimal("13fd3d")).equal(false);
        expect(checkHexadecimal("8A2c47")).equal(false);
        expect(checkHexadecimal("13fd3d")).equal(false);
        expect(checkHexadecimal("lfj123tbc236sgsd74")).equal(false);
    });
});