import {describe, test, expect } from 'vitest';
import { checkHexa } from './ts/checkHexa';

describe("Example File", () => {
    test("Sample test", () => {
        expect(1 + 3).equal(4);
    });
});

describe("Thorbjørn", () => {
    test("Valid UID input? (checkHexa)", () => {
        expect(checkHexa("13FD3D")).equal(true);
        expect(checkHexa("1287.zsA3d")).equal(false);
        expect(checkHexa("13fd3d")).equal(false);
        expect(checkHexa("8A2c47")).equal(false);
        expect(checkHexa("13fd3d")).equal(false);
        expect(checkHexa("lfj123tbc236sgsd74")).equal(false);
    });
});