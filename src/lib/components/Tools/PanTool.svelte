<script lang="ts">
	import MenuButton from '$lib/components/Navbar/MenuButton.svelte';
	import Icons from '$lib/icons/MenuIcons.json';
	import { chosenTool, canvasView, <canvasCursorPosition, cursorDown } from '$lib/stores/stateStore';
	import { type CanvasCoordinateSet, ToolState } from '$lib/types';
  let isDragging = false;
  let startPosition: CanvasCoordinateSet

	cursorDown.subscribe(startDrag);
	canvasCursorPosition.subscribe(doDrag);

	function startDrag() {
		if ($chosenTool !== ToolState.pan || !$cursorDown) return;
    startPosition = $canvasCursorPosition
    isDragging = true;
	}

	function doDrag() {
		if (!$cursorDown || $chosenTool !== ToolState.pan) {
      isDragging = false;
      return;
    } 

		$canvasView = {
			...$canvasView,
			position: {
				x: $canvasView.position.x - ($canvasCursorPosition.x - startPosition.x),
				y: $canvasView.position.y - ($canvasCursorPosition.y - startPosition.y)
			}
		};

    startPosition = $canvasCursorPosition
	}



</script>

<MenuButton
	isActive={$chosenTool === ToolState.pan}
	icon={Icons.pan}
	on:click={() => {
		$chosenTool = ToolState.pan;
	}}
></MenuButton>
