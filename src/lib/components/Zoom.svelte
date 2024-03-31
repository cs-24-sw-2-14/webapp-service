<script lang="ts">
	import MenuButton from './MenuButton.svelte';
	import Icons from '$lib/icons/MenuIcons.json';
	import { zoomLevel } from '$lib/stores/stateStore';

	// Function to increment zoom level
	function zoomIn() {
		zoomLevel.update((level) => {
			if (level < 200) {
				return level + 25;
			}
			return 200;
		});
	}

	// Function to decrement zoom level
	function zoomOut() {
		zoomLevel.update((level) => {
			if (level > 25) {
				return level - 25;
			}
			return 25;
		});
	}
</script>

<div
	class="fixed bottom-0 left-0 m-4 h-[56px] rounded-lg bg-zinc-800 z-10 flex items-center justify-center gap-2 p-2 text-white font-mono font-semibold"
>
	<MenuButton icon={Icons.zoom_out} on:click={zoomOut}></MenuButton>
	<p class="mx-2">{$zoomLevel}%</p>
	<MenuButton icon={Icons.zoom_in} on:click={zoomIn}></MenuButton>
</div>
