<script lang="ts">
	import MenuButton from './MenuButton.svelte';
	import Icons from '$lib/icons/MenuIcons.json';
	import { serverId } from '$lib/stores/stateStore';
</script>

<!-- Simple box where the user can se the server ID -->
<!-- TODO: Copy the url, when user clicks -->
<div
	class="fixed top-0 right-0 m-4 mt-20 h-[56px] rounded-lg bg-zinc-800 z-10 flex items-center justify-center gap-2 p-2 text-white font-mono font-semibold"
>
	<MenuButton icon={Icons.copy}></MenuButton>
	<p class="mx-2 pr-2">{$serverId}</p>
</div>
