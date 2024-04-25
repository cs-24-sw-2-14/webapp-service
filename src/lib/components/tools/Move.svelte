<script lang="ts">
	import ToolbarButton from '../ToolbarButton.svelte';
	import Icons from '$lib/icons/MenuIcons.json';
	import {
		toolState,
		ToolState,
		canvasMousePosition,
		canvasMouseDown,
		canvasView,
		currentSvgElementIndex
	} from '$lib/stores/stateStore';
	import type { CanvasMousePosition } from '$lib/stores/stateStore';
	import { svgs } from '$lib/stores/svgStore';

	let startX: number, startY: number;
	let currentIndex = 0;

	canvasMouseDown.subscribe(startMove);
	canvasMousePosition.subscribe(doMove);

	function startMove(isDown: boolean) {
		if ($toolState !== ToolState.move) return;
		if (!isDown) return;
		if ($currentSvgElementIndex === null) return;
		startX = $canvasMousePosition.x;
		startY = $canvasMousePosition.y;
		currentIndex = $currentSvgElementIndex;
	}

	function doMove(pos: CanvasMousePosition) {
		if (!$canvasMouseDown || $toolState !== ToolState.move) return;
		$svgs[currentIndex] = {
			...$svgs[currentIndex],
			x: $svgs[currentIndex].x + (pos.x - startX) / ($canvasView.scale / 100),
			y: $svgs[currentIndex].y + (pos.y - startY) / ($canvasView.scale / 100)
		};
		startX = pos.x;
		startY = pos.y;
	}
</script>

<ToolbarButton
	isActive={$toolState === ToolState.move}
	icon={Icons.move}
	on:click={() => {
		$toolState = ToolState.move;
	}}
></ToolbarButton>
