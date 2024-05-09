import type { Coordinates, CanvasCoordinates, ViewportCoordinates, Rectangle, ScaleFactor } from '$lib/types';

export function checkHexadecimal(input: string) {
	for (let i = 0; i < input.length; i++) {
		const charCode = input.charCodeAt(i);

		//check if char is between 0 and 9 or A and F
		if (!(charCode >= 48 && charCode <= 57) && !(charCode >= 65 && charCode <= 70)) {
			return false;
		}
	}

	return true;
}

export function getInitials(name: string) {
	return name
		.split(' ')
		.map((n) => n[0])
		.join('');
}

export function viewportToCanvasCoordinates(coordinates: ViewportCoordinates, viewRect: Rectangle, viewPos: CanvasCoordinates, viewScale: ScaleFactor): CanvasCoordinates {
	let coords = coordinates;

	coords = centerCoordinatesInRect(coords, viewRect);

	coords = scaleCoordinates(coords, viewScale);

	coords = translateCoordinates(coords, viewPos);

	return coords;
}

function centerCoordinatesInRect(coordinates: Coordinates, rect: Rectangle){
	const offset: Coordinates = {
		x: rect.width / 2,
		y: rect.height / 2
	}

	const negativeOffset = scaleCoordinates(offset, -1);

	return translateCoordinates(coordinates, negativeOffset);
}

function translateCoordinates(coordinates: Coordinates, offset: Coordinates): Coordinates {
	return {
		x: coordinates.x + offset.x,
		y: coordinates.y + offset.y
	}
}

function scaleCoordinates(coordinates: Coordinates, scale: ScaleFactor): Coordinates {
	return {
		x: coordinates.x * scale,
		y: coordinates.y * scale
	}
}
