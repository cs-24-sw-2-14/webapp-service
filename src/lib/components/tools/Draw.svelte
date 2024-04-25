<script lang="ts">
	import MenuButton from '../MenuButton.svelte';
	import Icons from '$lib/icons/MenuIcons.json';
	import {
		toolState,
		ToolState,
		canvasMousePosition,
		canvasMouseDown,
		canvasView
	} from '$lib/stores/stateStore';
	import type { CanvasMousePosition } from '$lib/stores/stateStore';
	import type { Drawing } from '$lib/stores/svgStore';
	import { drawings, CoordinateType } from '$lib/stores/svgStore';

	let currentIndex: number | null = null;

	canvasMouseDown.subscribe(startDraw);
	canvasMousePosition.subscribe(doDraw);
	canvasMouseDown.subscribe(stopDraw);

	function mouseToSvgCoordinates(pos: CanvasMousePosition) {
		const tx = (pos.x - $canvasView.width / 2) / ($canvasView.scale / 100) + $canvasView.x;
		const ty = (pos.y - $canvasView.height / 2) / ($canvasView.scale / 100) + $canvasView.y;
		return { x: tx, y: ty };
	}

	function startDraw() {
		if (!$canvasMouseDown || $toolState !== ToolState.draw) return;
		const { x, y } = mouseToSvgCoordinates($canvasMousePosition);
		const new_drawing: Drawing = {
			path: [
				{
					type: CoordinateType.moveto,
					x: x,
					y: y
				}
			],
			stroke: 'black',
			fill: 'transparent',
			strokeWidth: 7,
			placement: { x: 0, y: 0 }
		};
		currentIndex = $drawings.length;
		$drawings = [...$drawings, new_drawing];
	}

	function doDraw() {
		if (!$canvasMouseDown || $toolState !== ToolState.draw || currentIndex === null) return;
		const { x, y } = mouseToSvgCoordinates($canvasMousePosition);
		$drawings[currentIndex].path = [
			...$drawings[currentIndex].path,
			{
				type: CoordinateType.lineto,
				x: x,
				y: y
			}
		];
	}

	function stopDraw() {
		if ($canvasMouseDown || $toolState !== ToolState.draw) return;
		currentIndex = null;
	}
</script>

<MenuButton
	isActive={$toolState === ToolState.draw}
	icon={Icons.pencil}
	on:click={() => {
		$toolState = ToolState.draw;
	}}
></MenuButton>
