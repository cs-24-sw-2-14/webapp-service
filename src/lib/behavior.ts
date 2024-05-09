import type { Coordinate, GlobalCoordinate, LocalCoordinate, Rectangle, ScaleFactor } from '$lib/types';

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

export function localToGlobalCoordinates(coordinates: LocalCoordinate, viewRect: Rectangle, viewPos: GlobalCoordinate, viewScale: ScaleFactor): GlobalCoordinate {
	let coords = coordinates;

	coords = centerCoordinatesInRect(coords, viewRect);

	coords = scaleCoordinates(coords, viewScale);

	coords = translateCoordinates(coords, viewPos);

	return coords;
}

function centerCoordinatesInRect(coordinates: Coordinate, rect: Rectangle){
	return translateCoordinates(coordinates, {
		x: rect.width / 2,
		y: rect.height / 2
	});
}

function translateCoordinates(coordinates: Coordinate, offset: Coordinate): Coordinate {
	return {
		x: coordinates.x - offset.x,
		y: coordinates.y - offset.y
	}
}

function scaleCoordinates(coordinates: Coordinate, scale: ScaleFactor): Coordinate {
	return {
		x: coordinates.x * scale,
		y: coordinates.y * scale
	}
}
