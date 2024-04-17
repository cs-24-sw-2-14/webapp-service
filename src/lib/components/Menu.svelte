<script lang="ts">
	import { toolState, ToolState } from '$lib/stores/stateStore';
	// import type { ToolState } from '$lib/stores/stateStore';

	import MenuButton from './MenuButton.svelte';
	import Pan from '$lib/components/tools/Pan.svelte';
	import Draw from '$lib/components/tools/Draw.svelte';
	import Icons from '$lib/icons/MenuIcons.json';

	function handleClickErase() {
		$toolState = ToolState.erase;
	}

	function handleClickMove() {
		$toolState = ToolState.move;
	}
</script>

<!-- Menu bar at the center bottom -->
<div
	class="fixed bottom-0 left-1/2 mb-4 rounded-lg bg-zinc-800 z-10 transform -translate-x-1/2 flex items-center gap-2 p-2"
>
	<!-- Button for drawing -->
	<Draw />

	<!-- Button for erasing -->
	<MenuButton isActive={$toolState === ToolState.pan} icon={Icons.erase} on:click={handleClickErase}
	></MenuButton>

	<!-- Button for panning around -->
	<Pan />

	<!-- Button for moving elements -->
	<MenuButton isActive={$toolState === ToolState.move} icon={Icons.move} on:click={handleClickMove}
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
