<script lang="ts">
	import MenuButton from './Navbar/MenuButton.svelte';
	import Icons from '$lib/icons/MenuIcons.json';
	import { canvasView } from '$lib/stores/stateStore';

	import { boardId } from '$lib/stores/stateStore';
	let uiColor = `#${$boardId}`;
</script>

<div
	class="fixed top-0 left-0 m-4 mt-20 h-[56px] rounded-lg z-10 flex items-center justify-center gap-2 p-2 text-white font-mono font-semibold"
	style="background-color: {uiColor}"
>
	<MenuButton
		icon={Icons.origo}
		on:click={() => {
			$canvasView.position.x = 0;
			$canvasView.position.y = 0;
		}}
	></MenuButton>

	<div class="px-2 m-1 font-mono text-sm select-none">
		<p>x: {Math.floor($canvasView.position.x)}</p>
		<p>y: {Math.floor($canvasView.position.y * -1)}</p>
	</div>
</div>
