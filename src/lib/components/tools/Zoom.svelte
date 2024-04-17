<script lang="ts">
	import MenuButton from '$lib/components/MenuButton.svelte';
	import Icons from '$lib/icons/MenuIcons.json';
	import { canvasView } from '$lib/stores/stateStore';

	// Function to increment zoom level
	function zoomIn() {
		if ($canvasView.scale >= 200) return;
		$canvasView = { ...$canvasView, scale: $canvasView.scale + 25 };
	}

	// Function to decrement zoom level
	function zoomOut() {
		if ($canvasView.scale <= 25) return;
		$canvasView = { ...$canvasView, scale: $canvasView.scale - 25 };
	}
</script>

<div
	class="fixed bottom-0 left-0 m-4 h-[56px] rounded-lg bg-zinc-800 z-10 flex items-center justify-center gap-2 p-2 text-white font-mono font-semibold"
>
	<MenuButton icon={Icons.zoom_out} on:click={zoomOut}></MenuButton>
	<p class="mx-2">{$canvasView.scale}%</p>
	<MenuButton icon={Icons.zoom_in} on:click={zoomIn}></MenuButton>
</div>
