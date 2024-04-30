<script lang="ts">
	import MenuButton from '$lib/components/Navbar/MenuButton.svelte';
	import Icons from '$lib/icons/MenuIcons.json';
	import {
		toolState,
		ToolState,
		canvasView,
		canvasMousePosition,
		canvasMouseDown
	} from '$lib/stores/stateStore';
	import type { CanvasMousePosition } from '$lib/stores/stateStore';
	let startX: number, startY: number;

	canvasMouseDown.subscribe(startDrag);
	canvasMousePosition.subscribe(doDrag);

	function startDrag(isDown: boolean) {
		if ($toolState !== ToolState.pan) return;
		if (isDown) {
			startX = $canvasMousePosition.x;
			startY = $canvasMousePosition.y;
		}
	}

	function doDrag(pos: CanvasMousePosition) {
		if (!$canvasMouseDown || $toolState !== ToolState.pan) return;
		$canvasView = {
			...$canvasView,
			x: $canvasView.x - (pos.x - startX) / ($canvasView.scale / 100),
			y: $canvasView.y - (pos.y - startY) / ($canvasView.scale / 100)
		};
		startX = pos.x;
		startY = pos.y;
	}
</script>

<MenuButton
	isActive={$toolState === ToolState.pan}
	icon={Icons.pan}
	on:click={() => {
		$toolState = ToolState.pan;
	}}
></MenuButton>
