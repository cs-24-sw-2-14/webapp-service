import type {
	CoordinateSet,
	CanvasCoordinateSet,
	ViewportCoordinateSet,
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
	coordinates: ViewportCoordinateSet,
	canvasView: CanvasView
) {
	return viewportToCanvasCoordinates(
		coordinates,
		canvasView.size,
		canvasView.position,
		100 / canvasView.scale
	);
}

export function viewportToCanvasCoordinates(
	coordinates: ViewportCoordinateSet,
	viewRect: Rectangle,
	viewPos: CanvasCoordinateSet,
	viewScale: ScaleFactor
): CanvasCoordinateSet {
	let coords = coordinates;
	coords = centerCoordinatesInRect(coords, viewRect);
	coords = scaleCoordinates(coords, viewScale);
	coords = translateCoordinates(coords, viewPos);
	return coords;
}

export function centerCoordinatesInRect(coordinates: CoordinateSet, rect: Rectangle) {
	const offset: CoordinateSet = {
		x: rect.width / 2,
		y: rect.height / 2
	};

	const negativeOffset = scaleCoordinates(offset, -1);

	return translateCoordinates(coordinates, negativeOffset);
}

export function translateCoordinates(coordinates: CoordinateSet, offset: CoordinateSet): CoordinateSet {
	return {
		x: coordinates.x + offset.x,
		y: coordinates.y + offset.y
	};
}

export function scaleCoordinates(coordinates: CoordinateSet, scale: ScaleFactor): CoordinateSet {
	return {
		x: coordinates.x * scale,
		y: coordinates.y * scale
	};
}

function isCoordinateInBoundingBox(
	coordinate: CanvasCoordinateSet,
	boundingBox: BoundingBox,
	offset: CanvasCoordinateSet
) {
	return (
		coordinate.x >= boundingBox.position.x + offset.x &&
		coordinate.x <= boundingBox.position.x + offset.x + boundingBox.width &&
		coordinate.y >= boundingBox.position.y + offset.y &&
		coordinate.y <= boundingBox.position.y + offset.y + boundingBox.width
	);
}

export function getCommandIdsUnderCursor(cursorPosition: CanvasCoordinateSet, svgs: Svg[]) {
	const commandIdsUnderCursor: CommandId[] = [];
	svgs.forEach((svg) => {
		if (!svg.boundingBox) return;
		if (isCoordinateInBoundingBox(cursorPosition, svg.boundingBox, svg.position)) {
			commandIdsUnderCursor.push(svg.commandId);
		}
	});
	return commandIdsUnderCursor;
}
