import { describe, test, expect } from 'vitest';
import { checkHexadecimal, getInitials, centerCoordinatesInRect, translateCoordinates, scaleCoordinates } from '$lib/utils';

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


describe("Center Coordinates In Rectangle", () => {
    test.each([
        [2/1, 4-2, 2, 2, 1, 1],
        [0.5*4, 1+1, 2, 2, 1, 1],
        
        [2, 2, 2/1, 4-2, 1, 1],
        [2, 2, 0.5*4, 1+1, 1, 1],
        
        [3, 3, 2, 2, 2/1, 4-2],
        [3, 3, 2, 2, 0.5*4, 1+1],

        [3, 3, 2, 2, 3+2/-2, 3+2/-2],

    ])("Numbers as calculations", (coord1, coord2, rectWidth, rectHeight, expectedCoord1, expectedCoord2) => {
        expect(centerCoordinatesInRect({ x: coord1, y: coord2 }, { width: rectWidth, height: rectHeight })).toStrictEqual({ x: expectedCoord1, y: expectedCoord2 });
    });
    
    test.each([
        [NaN, NaN, NaN, NaN, NaN, NaN],
        [NaN, NaN, 2, 2, NaN, NaN],
        [1, 1, NaN, NaN, NaN, NaN],
        [1, 1, 2, NaN, 0, NaN],
        [1, 1, NaN, 2, NaN, 0],
        [1, NaN, 2, 2, 0, NaN],
        [NaN, 1, 2, 2, NaN, 0,],

        [-NaN, -NaN, NaN, NaN, -NaN, -NaN],
        [-NaN, -NaN, NaN, NaN, NaN, NaN],
        [NaN, NaN, NaN, NaN, -NaN, -NaN],

    ])("Not a Number", (coord1, coord2, rectWidth, rectHeight, expectedCoord1, expectedCoord2) => {
        expect(centerCoordinatesInRect({ x: coord1, y: coord2 }, { width: rectWidth, height: rectHeight })).toStrictEqual({ x: expectedCoord1, y: expectedCoord2 });
    });

    test.each([
        [2, 2, 2, 2, 1, 1],
        [1, 1, 0, 0, 1, 1],
        [1, 2, 2, 2, 0, 1],
        [1, 2, 2, 4, 0, 0],
        [1000000, 1000000, 1000000, 1000000, 500000, 500000],

    ])("Positive integers", (coord1, coord2, rectWidth, rectHeight, expectedCoord1, expectedCoord2) => {
        expect(centerCoordinatesInRect({ x: coord1, y: coord2 }, { width: rectWidth, height: rectHeight })).toStrictEqual({ x: expectedCoord1, y: expectedCoord2 });
    });

    test.each([
        [1, 1, -2, -2, 2, 2],
        [2, 2, -2, -2, 3, 3],
        [1, 1, -2, -4, 2, 3],
        [1, 1, -4, -2, 3, 2],

        [2, 2, -2, -2, 3, 3],
        [1, 2, -2, -2, 2, 3],
        [2, 1, -2, -2, 3, 2],

        [-1, -1, -2, -2, 0, 0],
        [-2, -2, -2, -2, -1, -1],
        [-1, -1, -2, -4, 0, 1],
        [-1, -1, -4, -2, 1, 0],

        [-2, -2, -2, -2, -1, -1],
        [-1, -2, -2, -2, 0, -1],
        [-2, -1, -2, -2, -1, 0],

        [5000000, 5000000, -10000000, -10000000, 10000000, 10000000],

    ])("Negative integers", (coord1, coord2, rectWidth, rectHeight, expectedCoord1, expectedCoord2) => {
        expect(centerCoordinatesInRect({ x: coord1, y: coord2 }, { width: rectWidth, height: rectHeight })).toStrictEqual({ x: expectedCoord1, y: expectedCoord2 });
    });

    test.each([
        [1, 1, 1, 1, 0.5, 0.5],
        [1.5, 1.5, 2, 2, 0.5, 0.5],
        [1.3, 1.6, 2, 2, 0.3, 0.6],
        [1.1, 1, 2, 2, 0.1, 0],
        [1, 1.1, 2, 2, 0, 0.1],

        [1.25, 1.25, 2.5, 2.5, 0, 0],
        [2, 1.25, 2.5, 2.5, 0.75, 0],
        [1.25, 2, 2.5, 2.5, 0, 0.75],
        [2.25, 1.25, 4.5, 2.5, 0, 0],
        [1.25, 2.25, 2.5, 4.5, 0, 0],

        [1, 2, 1.5, 1.5, 0.25, 1.25],
        [1, 2, 1.5, 2.5, 0.25, 0.75],
        [1, 2, 2, 1.5, 0, 1.25],
        [2, 1, 1.5, 2, 1.25, 0],
        
        [1000000.8, 1000000.6, 1000000.4, 1000000.8, 500000.6, 500000.2],

    ])("Positive floats", (coord1, coord2, rectWidth, rectHeight, expectedCoord1, expectedCoord2) => {
        expect(centerCoordinatesInRect({ x: coord1, y: coord2 }, { width: rectWidth, height: rectHeight })).toStrictEqual({ x: expect.closeTo(expectedCoord1), y: expect.closeTo(expectedCoord2) });
    });

    test.each([
        [1.25, 1.25, -2.5, -2.5, 2.5, 2.5],
        [2, 1.25, -2.5, -2.5, 3.25, 2.5],
        [1.25, 2, -2.5, -2.5, 2.5, 3.25],
        [2.25, 1.25, -4.5, -2.5, 4.5, 2.5],
        [1.25, 2.25, -2.5, -4.5, 2.5, 4.5],

        [-1, -2, -1.5, -1.5, -0.25, -1.25],
        [-1, -2, -1.5, -2.5, -0.25, -0.75],
        [-1, -2, -2, -1.5, -0, -1.25],
        [-2, -1, -1.5, -2, -1.25, -0],
        
        [1000000.8, 1000000.6, -1000000.4, -1000000.8, 1500001, 1500001],

    ])("Negative floats", (coord1, coord2, rectWidth, rectHeight, expectedCoord1, expectedCoord2) => {
        expect(centerCoordinatesInRect({ x: coord1, y: coord2 }, { width: rectWidth, height: rectHeight })).toStrictEqual({ x: expect.closeTo(expectedCoord1), y: expect.closeTo(expectedCoord2) });
    });
});


describe("Translate Coordinates", () => {
    test.each([
        [2/1, 4-2, 2, 2, 4, 4],
        [0.5*4, 1+1, 2, 2, 4, 4],
        
        [2, 2, 2/1, 4-2, 4, 4],
        [2, 2, 0.5*4, 1+1, 4, 4],
        
        [0, 0, 2, 2, 2/1, 4-2],
        [0, 0, 2, 2, 0.5*4, 1+1],

        [3, 3, 2, 2, 3+2*-2/-2, 3+2*-2/-2],

    ])("Numbers as calculations", (coord1, coord2, offset1, offset2, coord1Offset, coord2Offset) => {
        expect(translateCoordinates({ x: coord1, y: coord2 }, { x: offset1, y: offset2 })).toStrictEqual({ x: coord1Offset, y: coord2Offset })
    });

    test.each([
        [NaN, NaN, NaN, NaN, NaN, NaN],
        [NaN, NaN, 2, 2, NaN, NaN],
        [1, 1, NaN, NaN, NaN, NaN],
        [1, 1, 2, NaN, 3, NaN],
        [1, 1, NaN, 2, NaN, 3],
        [1, NaN, 2, 2, 3, NaN],
        [NaN, 1, 2, 2, NaN, 3,],

        [-NaN, -NaN, NaN, NaN, -NaN, -NaN],
        [-NaN, -NaN, NaN, NaN, NaN, NaN],
        [NaN, NaN, NaN, NaN, -NaN, -NaN],

    ])("Not a Number", (coord1, coord2, offset1, offset2, coord1Offset, coord2Offset) => {
        expect(translateCoordinates({ x: coord1, y: coord2 }, { x: offset1, y: offset2 })).toStrictEqual({ x: coord1Offset, y: coord2Offset })
    });

    test.each([
        [1, 1, 1, 1, 2, 2],
        [1, 1, 0, 0, 1, 1],
        [1, 2, 1, 1, 2, 3],
        [1, 2, 1, 2, 2, 4],
        [9000000, 9000000, 1000000, 1000000, 10000000, 10000000],

    ])("Positive integers", (coord1, coord2, offset1, offset2, coord1Offset, coord2Offset) => {
        expect(translateCoordinates({ x: coord1, y: coord2 }, { x: offset1, y: offset2 })).toStrictEqual({ x: coord1Offset, y: coord2Offset })
    });

    test.each([
        [1, 1, -1, -1, 0, 0],
        [1, 1, -2, -2, -1, -1],
        [1, 1, -1, -2, 0, -1],
        [1, 1, -2, -1, -1, 0],

        [2, 2, -1, -1, 1, 1],
        [1, 2, -1, -1, 0, 1],
        [2, 1, -1, -1, 1, 0],

        [-1, -1, -1, -1, -2, -2],
        [-1, -1, -2, -2, -3, -3],
        [-1, -1, -1, -2, -2, -3],
        [-1, -1, -2, -1, -3, -2],

        [-2, -2, -1, -1, -3, -3],
        [-1, -2, -1, -1, -2, -3],
        [-2, -1, -1, -1, -3, -2],

        [10000000, 10000000, -1000000, -1000000, 9000000, 9000000],

    ])("Negative integers", (coord1, coord2, offset1, offset2, coord1Offset, coord2Offset) => {
        expect(translateCoordinates({ x: coord1, y: coord2 }, { x: offset1, y: offset2 })).toStrictEqual({ x: coord1Offset, y: coord2Offset })
    });

    test.each([
        [1.1, 1.1, 1, 1, 2.1, 2.1],
        [1.3, 1.6, 0, 0, 1.3, 1.6],
        [1.1, 1, 1, 1, 2.1, 2],
        [1, 1.1, 1, 1, 2, 2.1],

        [1, 2, 1.5, 1.5, 2.5, 3.5],
        [1.5, 2.8, 1.5, 2.5, 3, 5.3],
        [1.5, 2, 1.5, 1.5, 3, 3.5],
        [1, 2.8, 1.5, 1.5, 2.5, 4.3],

        [9000000.6, 9000000.6, 1000000.6, 1000000.6, 10000001.2, 10000001.2],

    ])("Positive floats", (coord1, coord2, offset1, offset2, coord1Offset, coord2Offset) => {
        expect(translateCoordinates({ x: coord1, y: coord2 }, { x: offset1, y: offset2 })).toStrictEqual({ x: coord1Offset, y: coord2Offset })
    });

    test.each([
        [1.1, 1.1, -1, -1, 0.1, 0.1],
        [1, 1, -2.5, -2.5, -1.5, -1.5],
        [1, 1.1, -1.1, -2, -0.1, -0.9],
        [1.5, 1, -2.5, -1, -1, 0],

        [-1.5, -1.5, -1, -1, -2.5, -2.5],
        [-1, -1, -2.5, -2.5, -3.5, -3.5],
        [-1, -1.5, -1.5, -2, -2.5, -3.5],
        [-1.5, -1, -2, -1.5, -3.5, -2.5],

        [10000001.2, 10000001.2, -9000000.6, -9000000.6, 1000000.6, 1000000.6],

    ])("Negative floats", (coord1, coord2, offset1, offset2, coord1Offset, coord2Offset) => {
        expect(translateCoordinates({ x: coord1, y: coord2 }, { x: offset1, y: offset2 })).toStrictEqual({ x: expect.closeTo(coord1Offset), y: expect.closeTo(coord2Offset) })
    });
});


describe("Scale Coordinates", () => {
    test.each([
        [2/1, 4-2, 2, 4, 4],
        [0.5*4, 1+1, 2, 4, 4],
        
        [2, 2, 4-2, 4, 4],
        [2, 2, 2/1, 4, 4],
        [2, 2, 0.5*4, 4, 4],
        [2, 2, 1+1, 4, 4],
        
        [3, 3, 2, 6/1, 8-2],
        [3, 3, 2, 0.5*12, 1+5],

        [3, 3, 2, 3/0.5, 3*2],

    ])("Numbers as calculations", (coord1, coord2, scale, coord1Scaled, coord2Scaled) => {
        expect(scaleCoordinates({ x: coord1, y: coord2 }, scale)).toStrictEqual({ x: coord1Scaled, y: coord2Scaled })
    });

    test.each([
        [NaN, NaN, NaN, NaN, NaN],
        [NaN, NaN, 2, NaN, NaN],
        [1, 1, NaN, NaN, NaN],
        [1, NaN, 2, 2, NaN],
        [NaN, 1, 2, NaN, 2,],

        [-NaN, -NaN, NaN, -NaN, -NaN],
        [-NaN, -NaN, NaN, NaN, NaN],
        [NaN, NaN, NaN, -NaN, -NaN],

    ])("Not a Number", (coord1, coord2, scale, coord1Scaled, coord2Scaled) => {
        expect(scaleCoordinates({ x: coord1, y: coord2 }, scale)).toStrictEqual({ x: coord1Scaled, y: coord2Scaled })
    });

    test.each([
        [1, 1, 2, 2, 2],
        [1, 1, 0, 0, 0],
        [1, 2, 1, 1, 2],
        [1, 2, 2, 2, 4],
        [10000, 10000, 200, 2000000, 2000000],

    ])("Positive integers", (coord1, coord2, scale, coord1Scaled, coord2Scaled) => {
        expect(scaleCoordinates({ x: coord1, y: coord2 }, scale)).toStrictEqual({ x: coord1Scaled, y: coord2Scaled })
    });

    test.each([
        [1, 1, -2, -2, -2],
        [1, -1, -2, -2, 2],
        [-1, -1, -2, 2, 2],
        [-1, 2, 1, -1, 2],
        [1, -2, 2, 2, -4],
        [-10000, -10000, 200, -2000000, -2000000],

    ])("Negative integers", (coord1, coord2, scale, coord1Scaled, coord2Scaled) => {
        expect(scaleCoordinates({ x: coord1, y: coord2 }, scale)).toStrictEqual({ x: coord1Scaled, y: coord2Scaled })
    });

    test.each([
        [1.1, 1.1, 2, 2.2, 2.2],
        [1.3, 1.6, 0, 0, 0],
        [1, 2, 1.5, 1.5, 3],
        [1.5, 2.8, 2, 3, 5.6],
        [10000.99, 10000.33, 20, 200019.8, 200006.6],

    ])("Positive floats", (coord1, coord2, scale, coord1Scaled, coord2Scaled) => {
        expect(scaleCoordinates({ x: coord1, y: coord2 }, scale)).toStrictEqual({ x: coord1Scaled, y: coord2Scaled })
    });

    test.each([
        [1.1, 1.1, -2, -2.2, -2.2],
        [1.1, -1.1, -2, -2.2, 2.2],
        [-1.1, -1.1, -2, 2.2, 2.2],
        [-1, 2, 1.5, -1.5, 3],
        [1.5, -2.8, 2, 3, -5.6],
        [-10000.99, -10000.33, 20, -200019.8, -200006.6],

    ])("Negative floats", (coord1, coord2, scale, coord1Scaled, coord2Scaled) => {
        expect(scaleCoordinates({ x: coord1, y: coord2 }, scale)).toStrictEqual({ x: coord1Scaled, y: coord2Scaled })
    });

});