<script lang="ts">

	import { toolState, chosenColor, toggleGrid } from '$lib/stores/stateStore';
	import { ToolState } from '$lib/types';

	import MenuButton from './Navbar/MenuButton.svelte';
	import Pan from '$lib/components/Tools/Pan.svelte';
	import Move from '$lib/components/Tools/Move.svelte';
	import Draw from '$lib/components/Tools/Draw.svelte';
	import UndoRedo from '$lib/components/Tools/UndoRedo.svelte';
	import Erase from '$lib/components/Tools/Erase.svelte';
	import Icons from '$lib/icons/MenuIcons.json';

	function handleGridToggle() {
		$toggleGrid = !$toggleGrid;
	}
</script>

<!-- Menu bar at the center bottom -->
<div
	class="fixed bottom-0 z-10 flex items-center gap-2 p-2 mb-4 transform -translate-x-1/2 rounded-lg left-1/2 bg-zinc-800"
>
	<input type="color" id="hs-color-input" class="mx-2" bind:value={$chosenColor} />

	<!-- Button for drawing -->
	<Draw />

	<!-- Button for erasing -->
	<Erase />

	<!-- Button for panning around -->
	<Pan />

	<!-- Button for moving elements -->
	<Move />
	<!-- SPACE -->
	<div class="border-white border-r-[1.5px] h-6 mx-2"></div>

	<UndoRedo />

	<!-- SPACE -->
	<div class="border-white border-r-[1.5px] h-6 mx-2"></div>

	<!-- Button for inserting image -->
	<MenuButton icon={Icons.image}></MenuButton>

	<!-- Button for inserting text -->
	<MenuButton icon={Icons.text}></MenuButton>

	<!-- Button for inserting shapes -->
	<MenuButton icon={Icons.shape}></MenuButton>

	<!-- Button for inserting shapes -->
	<MenuButton icon={Icons.grid} isActive={$toggleGrid} on:click={handleGridToggle}></MenuButton>
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
