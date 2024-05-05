<script lang="ts">
	import MenuButton from '$lib/components/Navbar/MenuButton.svelte';
	import Icons from '$lib/icons/MenuIcons.json';
	import {
		toolState,
		canvasCursorPosition,
		canvasTouched,
		canvasView,
		currentSvgElementIndex
	} from '$lib/stores/stateStore';
	import { type CanvasMousePosition, ToolState } from '$lib/types';
	import { svgs } from '$lib/stores/svgStore';

	let startX: number, startY: number;
	let currentIndex = 0;

	canvasTouched.subscribe(startMove);
	canvasCursorPosition.subscribe(doMove);

	function startMove(isDown: boolean) {
		if ($toolState !== ToolState.move) return;
		if (!isDown) return;
		startX = $canvasCursorPosition.x;
		startY = $canvasCursorPosition.y;
		currentIndex = $currentSvgElementIndex;
	}

	function doMove(pos: CanvasMousePosition) {
		if (!$canvasTouched || $toolState !== ToolState.move) return;
		$svgs[currentIndex] = {
			...$svgs[currentIndex],
			x: $svgs[currentIndex].x + (pos.x - startX) / ($canvasView.scale / 100),
			y: $svgs[currentIndex].y + (pos.y - startY) / ($canvasView.scale / 100)
		};
		startX = pos.x;
		startY = pos.y;
	}
</script>

<MenuButton
	isActive={$toolState === ToolState.move}
	icon={Icons.move}
	on:click={() => {
		$toolState = ToolState.move;
	}}
></MenuButton>
