<script lang="ts">
	import { colorMap } from '$lib/color';
	import { canvasView } from '$lib/stores/stateStore';
	import { getInitials } from '$lib/utils';
	import { type OtherUser } from '$lib/types';

	export let otherUsers: OtherUser[];
</script>

<!-- Display all online users -->
<div class="relative h-10">
	{#each otherUsers as user, i (user.name)}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		{#if user.isOnline}
			<div
				on:click={() => {
					$canvasView.position = user.position;
				}}
				class={`w-10 h-10 cursor-pointer select-none rounded-full  text-white text-center text-sm font-mono leading-[2.7em] absolute ring-gray-800 ring-2`}
				style={`left: ${i * 0.7}em; transform: translateX(${-i * 100}%); background-color: ${colorMap.get(user.color)?.primary}; border-color: ${colorMap.get(user.color)?.secondary}; border-width: 0.2em`}
			>
				{getInitials(user.name)}
			</div>
		{/if}
	{/each}
</div>
