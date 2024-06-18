<script lang="ts">
	import { toggleGrid, drawColor } from '$lib/stores/stateStore';

	import MenuButton from './Navbar/MenuButton.svelte';
	import PanTool from '$lib/components/Tools/PanTool.svelte';
	import MoveTool from '$lib/components/Tools/MoveTool.svelte';
	import DrawTool from '$lib/components/Tools/DrawTool.svelte';
	import UndoRedoTool from '$lib/components/Tools/UndoRedoTool.svelte';
	import EraseTool from '$lib/components/Tools/EraseTool.svelte';
	import Icons from '$lib/icons/MenuIcons.json';

	function handleGridToggle() {
		$toggleGrid = !$toggleGrid;
	}

	import { boardId } from '$lib/stores/stateStore';
	let uiColor = `#${$boardId}`;
</script>

<!-- Menu bar at the center bottom -->
<div
	class="fixed bottom-0 z-10 flex items-center gap-2 p-2 mb-4 transform -translate-x-1/2 rounded-lg left-1/2"
	style="background-color: {uiColor}"
>
	<input type="color" id="hs-color-input" class="mx-2" bind:value={$drawColor} />

	<!-- Button for drawing -->
	<DrawTool />

	<!-- Button for erasing -->
	<EraseTool />

	<!-- Button for panning around -->
	<PanTool />

	<!-- Button for moving elements -->
	<MoveTool />
	<!-- SPACE -->
	<div class="border-white border-r-[1.5px] h-6 mx-2"></div>

	<UndoRedoTool />

	<!-- SPACE -->
	<div class="border-white border-r-[1.5px] h-6 mx-2"></div>

	<!-- Button for inserting image -->
	<MenuButton icon={Icons.image}></MenuButton>

	<!-- Button for inserting text -->
	<MenuButton icon={Icons.text}></MenuButton>

	<!-- Button for inserting shapes -->
	<MenuButton icon={Icons.shape}></MenuButton>

	<!-- Button for inserting shapes -->
	<MenuButton
		icon={$toggleGrid ? Icons.grid : Icons.grid_no_dot}
		isActive={$toggleGrid}
		on:click={handleGridToggle}
	></MenuButton>
</div>

<style>
	input[type='color'] {
		-webkit-appearance: none;
		appearance: none;
		border: 1px solid white;
		border-radius: 50%;
		background: transparent;
		width: 32px;
		height: 32px;
		cursor: pointer;
	}

	/* Specific styles for WebKit/Blink browsers like Chrome/Safari */
	input[type='color']::-webkit-color-swatch-wrapper {
		padding: 0;
		border-radius: 50%;
	}

	input[type='color']::-webkit-color-swatch {
		border: none;
		border-radius: 50%;
	}
</style>
