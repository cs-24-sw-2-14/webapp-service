import { describe, test, expect } from 'vitest';
import {
    checkHexadecimal,
    getInitials,
    centerCoordinatesInRect,
    translateCoordinates,
    scaleCoordinates,
    viewportToCanvasCoordinates
} from '$lib/utils';

describe("Example File", () => {
    test("Sample test", () => {
        expect(1 + 3).equal(4);
    });
});

describe("Extract initials (getInitials)", () => {
    test.each([  
        ["Rosa Parks", "RP"],
        ["Rosa", "R"],

    ])("Correct splitting", (input, expectedResult) => {
        expect(getInitials(input)).toStrictEqual(expectedResult);
    });

    test.each([  
        ["Rosa Parks", "R P"],
        ["Rosa Parks", "Ro"],
        ["Rosa Parks", "RoP"],
        ["Rosa Parks", "RPa"],
        ["Rosa Parks", "R"],
        ["Rosa Parks", "P"],
        ["Rosa Parks", "PR"],

    ])("Inorrect splitting", (input, expectedResult) => {
        expect(getInitials(input)).not.equal(expectedResult);
    });

    test.each([  
        ["Bob Ross", "BR"],
        ["bob ross", "br"],
        ["bobRoss", "b"],
        ["Bob_Ross", "B"],

    ])("Correct casing", (input, expectedResult) => {
        expect(getInitials(input)).toStrictEqual(expectedResult);
    });

    test.each([  
        ["Bob Ross", "br"],
        ["bob ross", "BR"],
        ["Bob ross", "BR"],

    ])("Inorrect casing", (input, expectedResult) => {
        expect(getInitials(input)).not.equal(expectedResult);
    });

    test.each([  
        [":) (:", ":("],
        ["1234", "1"],
        ["12 34", "13"],
        ["` ~ _ § £ ¤ ´ ¨ ", "`~_§£¤´¨"],
        ["$ @ # & | ", "$@#&|"],
        ["! : ; ' . , ?", "!:;'.,?"],
        ["( ) { } [ ]", "(){}[]"],
        [" ^ + - / * % = < > ", "^+-/*%=<>", ],

    ])("Not Letters", (input, expectedResult) => {
        expect(getInitials(input)).toStrictEqual(expectedResult);
    });
});

describe("URL validation (checkHexa)", () => {
    test.each([
        ["ABCDEF", true],
        ["abcdef", false],
        ["ABCDEf", false],

    ])("Upper-case validation", (input, expectedResult) => {
        expect(checkHexadecimal(input)).toStrictEqual(expectedResult);
    });

    test.each([
        ["123456", true],
        ["12345Q", false],
        ["12345#", false],
        ["12345.", false],

    ])("Char validation", (input, expectedResult) => {
        expect(checkHexadecimal(input)).toStrictEqual(expectedResult);
    });

});


describe("Viewport to Canvas Coordinates", () => {
    test.each([
        [2/1, 4-2, 2, 2, 1, 1, 1, 2, 2],
        [0.5*4, 1+1, 2, 2, 1, 1, 1, 2, 2],
        
        [2, 2, 2/1, 4-2, 1, 1, 1, 2, 2],
        [2, 2, 0.5*4, 1+1, 1, 1, 1, 2, 2],
        
        [3, 3, 2, 2, 2/1, 4-2, 1, 4, 4],
        [3, 3, 2, 2, 0.5*4, 1+1, 1, 4, 4],

        [3, 3, 2, 2, 3+2/-2, 3+2/-2, 1, 4, 4],
        [4, 5, 2, 6, 2, 2, 4, (4-2/2)*4+2, (5-6/2)*4+2],

    ])("Numbers as calculations", (coord1, coord2, width, height, canvasCoord1, canvasCoord2, scale, expectedCoord1, expectedCoord2) => {
        expect(viewportToCanvasCoordinates({x: coord1, y: coord2}, {width, height}, {x: canvasCoord1, y: canvasCoord2}, scale)).toStrictEqual({ x: expectedCoord1, y: expectedCoord2 });
    });

    test.each([
        [NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN],
        [NaN, NaN, NaN, NaN, NaN, NaN, 2, NaN, NaN],
        [NaN, NaN, NaN, NaN, 1, 1, NaN, NaN, NaN],
        [NaN, NaN, 2, 2, NaN, NaN, NaN, NaN, NaN],
        [1, 1, NaN, NaN, NaN, NaN, NaN, NaN, NaN],
       
    ])("Not a Number", (coord1, coord2, width, height, canvasCoord1, canvasCoord2, scale, expectedCoord1, expectedCoord2) => {
        expect(viewportToCanvasCoordinates({x: coord1, y: coord2}, {width, height}, {x: canvasCoord1, y: canvasCoord2}, scale)).toStrictEqual({ x: expectedCoord1, y: expectedCoord2 });
    });

    test.each([
        [2,2,2,2,1,1,1,2,2],
        [1,1,0,0,0,0,1,1,1],
        [0,0,2,2,2,2,1,1,1],
        [0,0,0,0,1,1,0,1,1],
        [1,1,0,0,0,0,3,3,3],
        [2,1,2,0,1,0,1,2,1],
        [10000000010,10000000010,20,20,5000000000,5000000000,2,25000000000,25000000000],

        [4, 4, 1080, 1920, 0, 0, 4, -2144, -3824],
        [1, 1, 1366, 768, 0, 0, 1, -682, -383],
        [-10, -10, 1600, 1900, 0, 0, 10, -8100, -9600],

    ])("Positive integers", (coord1, coord2, width, height, canvasCoord1, canvasCoord2, scale, expectedCoord1, expectedCoord2) => {
        expect(viewportToCanvasCoordinates({x: coord1, y: coord2}, {width, height}, {x: canvasCoord1, y: canvasCoord2}, scale)).toStrictEqual({ x: expectedCoord1, y: expectedCoord2 });
    });

    test.each([
        [-1,-1,0,0,0,0,1,-1,-1],
        [-1,-1,0,0,0,0,-1,1,1],
        [-1,-1,2,2,0,0,1,-2,-2],
        [-1,-1,0,0,-1,-1,1,-2,-2],

        [1,-1,0,0,0,0,1,1,-1],
        [-1,1,0,0,0,0,1,-1,1],

    ])("Negative integers", (coord1, coord2, width, height, canvasCoord1, canvasCoord2, scale, expectedCoord1, expectedCoord2) => {
        expect(viewportToCanvasCoordinates({x: coord1, y: coord2}, {width, height}, {x: canvasCoord1, y: canvasCoord2}, scale)).toStrictEqual({ x: expectedCoord1, y: expectedCoord2 });
    });
})


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
