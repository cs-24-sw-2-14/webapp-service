<script lang="ts">
	import { type User } from '$lib/types';
	import { getInitials } from '$lib/ts/getInitials';

	export let users: User[];
</script>

<!-- Display all online users -->
<div class="relative h-10">
	{#each users as user, i (user.name)}
		<div
			class={`w-10 h-10 rounded-full text-white text-center text-sm font-mono leading-[2.7em] absolute ring-gray-800 ring-2`}
			style={`left: ${i * 0.7}em; transform: translateX(${-i * 100}%); background-color: ${user.color.bg}; border-color: ${user.color.border}; border-width: 0.2em`}
		>
			{getInitials(user.name)}
		</div>
	{/each}
</div>
