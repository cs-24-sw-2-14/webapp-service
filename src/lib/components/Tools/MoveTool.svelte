<script lang="ts">
	import MenuButton from '$lib/components/Navbar/MenuButton.svelte';
	import Icons from '$lib/icons/MenuIcons.json';
	import {
		toolState,
		cursorPosition,
		canvasTouched,
		canvasView,
		drawingsUnderCursor
	} from '$lib/stores/stateStore';
	import { type ViewportCoordinates, ToolState } from '$lib/types';
	import { svgs } from '$lib/stores/svgStore';

	let startX: number, startY: number;
	let currentIndex: number | null = null;

	canvasTouched.subscribe(startMove);
	cursorPosition.subscribe(doMove);

	function startMove(isDown: boolean) {
		if ($toolState !== ToolState.move) return;
		if (!isDown) return;
		startX = $cursorPosition.x;
		startY = $cursorPosition.y;
		currentIndex = $drawingsUnderCursor[0].index;
	}

	function doMove(pos: ViewportCoordinates) {
		if (!$canvasTouched || $toolState !== ToolState.move || currentIndex === null) return;
		$svgs[currentIndex].placement = { // TODO: Reimplement move-tool for the 21st century, great again.
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
