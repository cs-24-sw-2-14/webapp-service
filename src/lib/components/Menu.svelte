<script lang="ts">
	import { toolState, activateTool } from '$lib/stores/stateStore';

	import MenuButton from './MenuButton.svelte';
	import Icons from '$lib/icons/MenuIcons.json';

	function handleClickPencil() {
		activateTool('pencil');
	}

	function handleClickErase() {
		activateTool('erase');
	}

	function handleClickPan() {
		activateTool('pan');
	}

	function handleClickMove() {
		activateTool('move');
	}
</script>

<!-- Menu bar at the center bottom -->
<div
	class="fixed bottom-0 left-1/2 mb-4 rounded-lg bg-zinc-800 z-10 transform -translate-x-1/2 flex items-center gap-2 p-2"
>
	<!-- Button for drawing -->
	<MenuButton isActive={$toolState['pencil']} icon={Icons.pencil} on:click={handleClickPencil}
	></MenuButton>

	<!-- Button for erasing -->
	<MenuButton isActive={$toolState['erase']} icon={Icons.erase} on:click={handleClickErase}
	></MenuButton>

	<!-- Button for panning around -->
	<MenuButton isActive={$toolState['pan']} icon={Icons.pan} on:click={handleClickPan}></MenuButton>

	<!-- Button for moving elements -->
	<MenuButton isActive={$toolState['move']} icon={Icons.move} on:click={handleClickMove}
	></MenuButton>

	<!-- SPACE -->
	<div class="border-white border-r-[1.5px] h-6 mx-2"></div>

	<!-- Button for undo -->
	<MenuButton icon={Icons.undo}></MenuButton>

	<!-- Button for redo -->
	<MenuButton icon={Icons.redo}></MenuButton>

	<!-- SPACE -->
	<div class="border-white border-r-[1.5px] h-6 mx-2"></div>

	<!-- Button for inserting image -->
	<MenuButton icon={Icons.image}></MenuButton>

	<!-- Button for inserting text -->
	<MenuButton icon={Icons.text}></MenuButton>

	<!-- Button for inserting shapes -->
	<MenuButton icon={Icons.shape}></MenuButton>
</div>
