<script lang="ts">
	import MenuButton from '$lib/components/Navbar/MenuButton.svelte';
	import Icons from '$lib/icons/MenuIcons.json';
	import {
		toolState,
		canvasView,
		cursorPosition,
		canvasTouched
	} from '$lib/stores/stateStore';
	import { type ViewportCoordinates, ToolState } from '$lib/types';
	let startX: number, startY: number;

	canvasTouched.subscribe(startDrag);
	cursorPosition.subscribe(doDrag);

	function startDrag(isDown: boolean) {
		if ($toolState !== ToolState.pan) return;
		if (isDown) {
			startX = $cursorPosition.x;
			startY = $cursorPosition.y;
		}
	}

	function doDrag(pos: ViewportCoordinates) {
		if (!$canvasTouched || $toolState !== ToolState.pan) return;
		$canvasView = {
			...$canvasView,
			position: {
				x: $canvasView.position.x - (pos.x - startX) / ($canvasView.scale / 100),
				y: $canvasView.position.y - (pos.y - startY) / ($canvasView.scale / 100)
			}
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
