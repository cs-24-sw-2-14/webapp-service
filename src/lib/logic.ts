import type { ViewCoordinate, Coordinate, Rectangle, ScaleFactor, SvgCoordinate } from '$lib/types';
import { canvasView } from '$lib/stores/stateStore';

export function checkHexadecimal(input: string) {
    for (let i = 0; i < input.length; i++) {
        let charCode = input.charCodeAt(i);

        //check if char is between 0 and 9 or A and F
        if (!(charCode >= 48 && charCode <= 57) && !(charCode >= 65 && charCode <= 70)) {
            return false;
        }
    }

    return true;
}

export function mouseToSvgCoordinates(coordinate: ViewCoordinate): SvgCoordinate {
    const canvasRect: Rectangle = {
        width: $canvasView.width,
        height: $canvasView.height,
    }

    const canvasScaleFactor = 100 / $canvasView.scale;

    return viewCoordinatesToSvgCoordinates(
      coordinate,
      canvasRect,
      $canvasView.position,
      canvasScaleFactor
    );
}

function viewCoordinatesToSvgCoordinates(coordinate: ViewCoordinate, viewRect: Rectangle, viewPos: SvgCoordinate, viewScale: ScaleFactor): SvgCoordinate {
    let coords = coordinate;

    // Translate coordinates to center
    coords = centerCoordinatesInRect(coords, viewRect);

    // Scale translated coordinates
    coords = scaleCoordinates(coords, viewScale);

    // Offset coordinates to view position
    coords = translateCoordinates(coords, viewPos);

    return coords;
}

/**
 * Centers coordinates in a rect.
 * @param coordinates
 * @param rect
 */
function centerCoordinatesInRect(coordinates: Coordinate, rect: Rectangle){
    return translateCoordinates(coordinates, {
        x: rect.width / 2,
        y: rect.height / 2,
    });
}

/**
 * Translate coordinates by a coordinate.
 * @param coordinates
 * @param offset
 */
function translateCoordinates(coordinates: Coordinate, offset: Coordinate): Coordinate {
    return {
        x: coordinates.x - offset.x,
        y: coordinates.y - offset.y,
    }
}

/**
 * Scales coordinates by a scale factor.
 * @param coordinates
 * @param scale
 */
function scaleCoordinates(coordinates: Coordinate, scale: ScaleFactor): Coordinate {
    return {
        x: coordinates.x * scale,
        y: coordinates.y * scale,
    }
}
