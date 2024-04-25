<script lang="ts">
	import ToolbarButton from '$lib/components/ToolbarButton.svelte';
	import Icons from '$lib/icons/MenuIcons.json';
	import { canvasView } from '$lib/stores/stateStore';

	const MAX_ZOOM = 200;
	const MIN_ZOOM = 25;

	// Function to increment zoom level
	function zoomIn() {
		if ($canvasView.scale >= MAX_ZOOM) return;
		$canvasView = { ...$canvasView, scale: $canvasView.scale + 25 };
	}

	// Function to decrement zoom level
	function zoomOut() {
		if ($canvasView.scale <= MIN_ZOOM) return;
		$canvasView = { ...$canvasView, scale: $canvasView.scale - 25 };
	}
</script>

<div
	class="fixed bottom-0 left-0 m-4 h-[56px] rounded-lg bg-zinc-800 z-10 flex items-center justify-center gap-2 p-2 text-white font-mono font-semibold"
>
	<ToolbarButton icon={Icons.zoom_out} on:click={zoomOut}></ToolbarButton>
	<p class="mx-2">{$canvasView.scale}%</p>
	<ToolbarButton icon={Icons.zoom_in} on:click={zoomIn}></ToolbarButton>
</div>
