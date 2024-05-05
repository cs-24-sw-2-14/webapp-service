<script lang="ts">
	import MenuButton from '$lib/components/Navbar/MenuButton.svelte';
	import Icons from '$lib/icons/MenuIcons.json';
	import {
		toolState,
		canvasMousePosition,
		canvasMouseDown,
	} from '$lib/stores/stateStore';
	import { type ViewCoordinate, ToolState } from '$lib/types';
	import type { Svg } from '$lib/stores/svgStore';
	import { svgs } from '$lib/stores/svgStore';
	import { mouseToSvgCoordinates } from '$lib/logic';

	let pathString = '';
	let currentIndex: number | null = null;

	canvasMouseDown.subscribe(startDraw);
	canvasMousePosition.subscribe(doDraw);
	canvasMouseDown.subscribe(stopDraw);

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

	function doDraw(pos: ViewCoordinate) {
		if (!$canvasMouseDown || $toolState !== ToolState.draw) return;
		const { x, y } = mouseToSvgCoordinates(pos);
		pathString += `L${x},${y}`;
	}

	function stopDraw(mouseDown: boolean) {
		if (!mouseDown) {
			currentIndex = null;
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
