import type {
	Coordinates,
	CanvasCoordinate,
	ViewportCoordinates,
	Rectangle,
	ScaleFactor,
	CanvasView,
	BoundingBox,
	Svg,
	CommandId
} from '$lib/types';

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

export function viewportToCanvasCoordinatesFromCanvasView(
	coordinates: ViewportCoordinates,
	canvasView: CanvasView
) {
	return viewportToCanvasCoordinates(
		coordinates,
		canvasView.size,
		canvasView.position,
		100 / canvasView.scale
	);
}

function viewportToCanvasCoordinates(
	coordinates: ViewportCoordinates,
	viewRect: Rectangle,
	viewPos: CanvasCoordinate,
	viewScale: ScaleFactor
): CanvasCoordinate {
	let coords = coordinates;
	coords = centerCoordinatesInRect(coords, viewRect);
	coords = scaleCoordinates(coords, viewScale);
	coords = translateCoordinates(coords, viewPos);
	return coords;
}

function centerCoordinatesInRect(coordinates: Coordinates, rect: Rectangle) {
	const offset: Coordinates = {
		x: rect.width / 2,
		y: rect.height / 2
	};

	const negativeOffset = scaleCoordinates(offset, -1);

	return translateCoordinates(coordinates, negativeOffset);
}

export function translateCoordinates(coordinates: Coordinates, offset: Coordinates): Coordinates {
	return {
		x: coordinates.x + offset.x,
		y: coordinates.y + offset.y
	};
}

function scaleCoordinates(coordinates: Coordinates, scale: ScaleFactor): Coordinates {
	return {
		x: coordinates.x * scale,
		y: coordinates.y * scale
	};
}

function isCoordinateInBoundingBox(
	coordinate: CanvasCoordinate,
	boundingBox: BoundingBox,
	offset: CanvasCoordinate
) {
	return (
		coordinate.x >= boundingBox.placement.x + offset.x &&
		coordinate.x <= boundingBox.placement.x + offset.x + boundingBox.width &&
		coordinate.y >= boundingBox.placement.y + offset.y &&
		coordinate.y <= boundingBox.placement.y + offset.y + boundingBox.width
	);
}

export function getCommandIdsUnderCursor(cursorPosition: CanvasCoordinate, svgs: Svg[]) {
	const commandIdsUnderCursor: CommandId[] = [];
	svgs.forEach((svg) => {
		if (!svg.boundingBox) return;
		if (isCoordinateInBoundingBox(cursorPosition, svg.boundingBox, svg.offset)) {
			commandIdsUnderCursor.push(svg.commandId);
		}
	});
	return commandIdsUnderCursor;
}
