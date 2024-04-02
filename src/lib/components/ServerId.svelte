<script lang="ts">
	import MenuButton from './MenuButton.svelte';
	import Icons from '$lib/icons/MenuIcons.json';
	import { serverId } from '$lib/stores/stateStore';
	import { fade } from 'svelte/transition';
	import { quadOut } from 'svelte/easing';

	let isClicked = false;

	function copyUrl() {
		let url: string = window.location.href;

		navigator.clipboard.writeText(url);

		isClicked = true;

		setTimeout(() => {
			isClicked = false;
		}, 1000);
	}
</script>

<!-- Simple box where the user can se the server ID -->
{#if isClicked}
	<div
		transition:fade={{ delay: 250, duration: 400, easing: quadOut }}
		class="fixed top-0 right-0 flex items-center h-8 px-6 py-8 m-4 font-bold bg-green-500 rounded-md mt-36"
	>
		URL copied!
	</div>
{/if}

<div
	class="fixed top-0 right-0 m-4 mt-20 h-[56px] rounded-lg bg-zinc-800 z-10 flex items-center justify-center gap-2 p-2 text-white font-mono font-semibold"
>
	<MenuButton icon={Icons.copy} on:click={copyUrl}></MenuButton>
	<p class="pr-2 mx-2 font-mono">{$serverId}</p>
</div>
