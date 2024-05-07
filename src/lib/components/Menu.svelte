<script lang="ts">
	import { toolState, toggleGrid } from '$lib/stores/stateStore';
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
