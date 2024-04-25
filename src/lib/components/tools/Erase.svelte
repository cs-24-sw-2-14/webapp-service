<script lang="ts">
	import MenuButton from '../MenuButton.svelte';
	import Icons from '$lib/icons/MenuIcons.json';
	import {
		toolState,
		ToolState,
		canvasMousePosition,
		canvasMouseDown,
		canvasView,
		drawingsUnderCursor
	} from '$lib/stores/stateStore';
	import type { CanvasMousePosition } from '$lib/stores/stateStore';
	import type { PathCoordinate } from '$lib/stores/svgStore';
	import { drawings, type PlacementCoordinate, CoordinateType } from '$lib/stores/svgStore';

	const THRESHOLDDISTANCE = 10;

	canvasMousePosition.subscribe(doErase);

	// Function to calculate distance between two coordinates
	function calculateDistance(coord1: PlacementCoordinate, coord2: PathCoordinate): number {
		return Math.sqrt(Math.pow(coord1.x - coord2.x, 2) + Math.pow(coord1.y - coord2.y, 2));
	}

	function getCursorFromThreshold(threshold: number) {
		return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30"><circle cx="${threshold}" cy="${threshold}" r="${threshold}" /></svg>`;
	}

	function removeCoordinatesFromDrawingPath(
		drawPath: PathCoordinate[],
		eraseCoord: PlacementCoordinate,
		thresholdDistance: number
	) {
		let resultingDrawPath = drawPath.filter((drawCoord, index, array) => {
			const distance = calculateDistance(eraseCoord, drawCoord);
			if (distance <= thresholdDistance) {
				// Change the next coordinate to a moveto type, so no line is drawn, if there is a next element
				if (index + 1 <= array.length - 1) {
					array[index + 1].type = CoordinateType.moveto;
				}
				// Remove the element from the array
				return false;
			}
			// Keep the element in the array
			return true;
		});
		// console.log(resultingDrawPath);

		if (resultingDrawPath[0]) {
			resultingDrawPath[0].type = CoordinateType.moveto;
		}
		return resultingDrawPath;
	}

	$: {
		if ($toolState === ToolState.erase) {
			$canvasView.cursor = getCursorFromThreshold(THRESHOLDDISTANCE);
		}
	}

	function mouseToSvgCoordinates(pos: CanvasMousePosition) {
		const tx = (pos.x - $canvasView.width / 2) / ($canvasView.scale / 100) + $canvasView.x;
		const ty = (pos.y - $canvasView.height / 2) / ($canvasView.scale / 100) + $canvasView.y;
		return { x: tx, y: ty };
	}

	function doErase(pos: CanvasMousePosition) {
		if (!$canvasMouseDown || $toolState !== ToolState.erase || $drawingsUnderCursor.length === 0)
			return;
		// Set cursor
		const { x, y } = mouseToSvgCoordinates(pos);
		$drawingsUnderCursor.forEach((drawing) => {
			$drawings[drawing.index].path = removeCoordinatesFromDrawingPath(
				$drawings[drawing.index].path,
				{ x: x, y: y },
				THRESHOLDDISTANCE
			);
		});
	}
</script>

<MenuButton
	isActive={$toolState === ToolState.erase}
	icon={Icons.erase}
	on:click={() => {
		$toolState = ToolState.erase;
	}}
></MenuButton>
