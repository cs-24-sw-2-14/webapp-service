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
	import { svgs } from '$lib/stores/svgStore';

	let startX: number, startY: number;
	let currentIndex: number | null = null;

	canvasMouseDown.subscribe(startMove);
	canvasMousePosition.subscribe(doMove);

	function startMove(isDown: boolean) {
		if ($toolState !== ToolState.move) return;
		if (!isDown) return;
		startX = $canvasMousePosition.x;
		startY = $canvasMousePosition.y;
		currentIndex = $drawingsUnderCursor[0].index;
	}

	function doMove(pos: CanvasMousePosition) {
		if (!$canvasMouseDown || $toolState !== ToolState.move || currentIndex === null) return;
		$svgs[currentIndex].placement = {
			x: $svgs[currentIndex].placement.x + (pos.x - startX) / ($canvasView.scale / 100),
			y: $svgs[currentIndex].placement.y + (pos.y - startY) / ($canvasView.scale / 100)
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
