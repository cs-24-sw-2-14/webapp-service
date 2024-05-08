<script lang="ts">
	import { colorToHex } from '$lib/color';
	import { canvasView } from '$lib/stores/stateStore';
	import { type User } from '$lib/types';

	// Function to split fullname and combine the first two letter of first and last name
	function getInitials(name: string) {
		return name
			.split(' ')
			.map((n) => n[0])
			.join('');
	}

	export let users: User[];
</script>

<!-- Display all online users -->
<div class="relative h-10">
	{#each users as user, i (user.name)}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			on:click={() => {
				$canvasView.position.x = user.posX;
				$canvasView.position.y = user.posY;
			}}
			class={`w-10 h-10 cursor-pointer select-none rounded-full  text-white text-center text-sm font-mono leading-[2.7em] absolute ring-gray-800 ring-2`}
			style={`left: ${i * 0.7}em; transform: translateX(${-i * 100}%); background-color: ${colorToHex(user.color).secondary}; border-color: ${colorToHex(user.color).primary}; border-width: 0.2em`}
		>
			{getInitials(user.name)}
		</div>
	{/each}
</div>
