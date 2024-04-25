<script lang="ts">
	import { toolState, ToolState } from '$lib/stores/stateStore';

	import ToolbarButton from './ToolbarButton.svelte';
	import Pan from '$lib/components/tools/Pan.svelte';
	import Move from '$lib/components/tools/Move.svelte';
	import Draw from '$lib/components/tools/Draw.svelte';
	import Icons from '$lib/icons/MenuIcons.json';

	function handleClickErase() {
		$toolState = ToolState.erase;
	}
</script>

<!-- Toolbar at the center bottom -->
<div
	class="fixed bottom-0 left-1/2 mb-4 rounded-lg bg-zinc-800 z-10 transform -translate-x-1/2 flex items-center gap-2 p-2"
>
	<!-- Button for drawing -->
	<Draw />

	<!-- Button for erasing -->
	<ToolbarButton
		isActive={$toolState === ToolState.erase}
		icon={Icons.erase}
		on:click={handleClickErase}
	></ToolbarButton>

	<!-- Button for panning around -->
	<Pan />

	<!-- Button for moving elements -->
	<Move />
	<!-- SPACE -->
	<div class="border-white border-r-[1.5px] h-6 mx-2"></div>

	<!-- Button for undo -->
	<ToolbarButton icon={Icons.undo}></ToolbarButton>

	<!-- Button for redo -->
	<ToolbarButton icon={Icons.redo}></ToolbarButton>

	<!-- SPACE -->
	<div class="border-white border-r-[1.5px] h-6 mx-2"></div>

	<!-- Button for inserting image -->
	<ToolbarButton icon={Icons.image}></ToolbarButton>

	<!-- Button for inserting text -->
	<ToolbarButton icon={Icons.text}></ToolbarButton>

	<!-- Button for inserting shapes -->
	<ToolbarButton icon={Icons.shape}></ToolbarButton>
</div>
