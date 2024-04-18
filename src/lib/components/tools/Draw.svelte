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
	import type { Svg } from '$lib/stores/svgStore';
	import { svgs } from '$lib/stores/svgStore';

	let pathString = '';
	let currentIndex: number | null = null;

	canvasMouseDown.subscribe(startDraw);
	canvasMousePosition.subscribe(doDraw);
	canvasMouseDown.subscribe(stopDraw);

	function mouseToSvgCoordinates(pos: CanvasMousePosition) {
		const tx = (pos.x - $canvasView.width / 2) / ($canvasView.scale / 100) + $canvasView.x;
		const ty = (pos.y - $canvasView.height / 2) / ($canvasView.scale / 100) + $canvasView.y;
		return { x: tx, y: ty };
	}

	function startDraw(mouseDown: boolean) {
		if (!mouseDown || $toolState !== ToolState.draw) return;
		const new_svg_element: Svg = {
			svg: ``,
			x: 0,
			y: 0
		};
		currentIndex = $svgs.length;
		const { x, y } = mouseToSvgCoordinates($canvasMousePosition);
		pathString = `M${x},${y}`;
		$svgs = [...$svgs, new_svg_element];
	}

	function doDraw(pos: CanvasMousePosition) {
		if (!$canvasMouseDown || $toolState !== ToolState.draw) return;
		const { x, y } = mouseToSvgCoordinates(pos);
		pathString += `L${x},${y}`;
	}

	function stopDraw(mouseDown: boolean) {
		if (!mouseDown) {
			currentIndex = null;
			pathString = '';
		}
	}

	$: {
		if (currentIndex) {
			$svgs[currentIndex].svg =
				`<path d="${pathString}" stroke="black" fill="transparent" stroke-width="5"/>`;
		}
	}
</script>

<MenuButton
	isActive={$toolState === ToolState.draw}
	icon={Icons.pencil}
	on:click={() => {
		$toolState = ToolState.draw;
	}}
></MenuButton>
