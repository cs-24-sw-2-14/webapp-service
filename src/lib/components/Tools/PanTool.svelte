<script lang="ts">
	import MenuButton from '$lib/components/Navbar/MenuButton.svelte';
	import Icons from '$lib/icons/MenuIcons.json';
	import { chosenTool, canvasView, cursorPosition, cursorDown } from '$lib/stores/stateStore';
	import { type ViewportCoordinateSet, ToolState } from '$lib/types';
	let startX: number, startY: number;

	cursorDown.subscribe(startDrag);
	cursorPosition.subscribe(doDrag);

	function startDrag(isDown: boolean) {
		if ($chosenTool !== ToolState.pan) return;
		if (isDown) {
			startX = $cursorPosition.x;
			startY = $cursorPosition.y;
		}
	}

	function doDrag(pos: ViewportCoordinateSet) {
		if (!$cursorDown || $chosenTool !== ToolState.pan) return;
		$canvasView = {
			...$canvasView,
			position: {
				// TODO: reimplment PanTool
				x: $canvasView.position.x - (pos.x - startX) / ($canvasView.scale / 100),
				y: $canvasView.position.y - (pos.y - startY) / ($canvasView.scale / 100)
			}
		};
		startX = pos.x;
		startY = pos.y;
	}
</script>

<MenuButton
	isActive={$chosenTool === ToolState.pan}
	icon={Icons.pan}
	on:click={() => {
		$chosenTool = ToolState.pan;
	}}
></MenuButton>
