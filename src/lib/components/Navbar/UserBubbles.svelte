<script lang="ts">
	import { colorMap } from '$lib/color';
	import { canvasView } from '$lib/stores/stateStore';
	import { getInitials } from '$lib/utils';
	import { otherUsers } from '$lib/stores/socketioStore';
</script>

<!-- Display all online users -->
<div class="relative h-10">
	{#each $otherUsers as [_, user], i}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			on:click={() => {
				$canvasView.position = user.position;
			}}
			class={`w-10 h-10 cursor-pointer select-none rounded-full  text-white text-center text-sm font-mono leading-[2.7em] absolute ring-gray-800 ring-2`}
			style={`left: ${i * 0.7}em; transform: translateX(${-i * 100}%); background-color: ${colorMap.get(user.color)?.primary}; border-color: ${colorMap.get(user.color)?.secondary}; border-width: 0.2em`}
		>
			{getInitials(user.name)}
		</div>
	{/each}
</div>
