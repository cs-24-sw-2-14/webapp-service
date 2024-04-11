<script lang="ts">
	import { onlineUsers } from '$lib/stores/stateStore';
	import type { User } from '$lib/stores/stateStore';
	import { color } from '../color';

	onlineUsers.update((current: User[]) => {
		return [
			{ name: 'Elma Vukicevic', color: color.red, border: 'border-blue-800' },
			{ name: 'Amalie Jensen', color: color.red, border: 'border-red-800' },
			{ name: 'Cecilie Lassen', color: color.red, border: 'border-green-800' },
			{ name: 'Kresten Sckerl', color: color.red, border: 'border-orange-800' },
			{ name: 'Mads Fagerlund', color: color.red, border: 'border-purple-800' },
			{ name: 'Marc Nygaard', color: color.red, border: 'border-pink-800' },
			{ name: 'Thorbjørn Larsen', color: color.red, border: 'border-yellow-800' }
		];
	});

	// Function to split fullname and combine the first two letter of first and last name
	function getInitials(name: string) {
		return name
			.split(' ')
			.map((n) => n[0])
			.join('');
	}
</script>

<!-- Display all online users -->
<div class="relative h-10">
	{#each $onlineUsers as user, i (user.name)}
		<div 
			class={`w-10 h-10 rounded-full text-white text-center text-sm font-mono leading-[38px] absolute border-2 ${user.border} ring-gray-800 ring-2 bg-[${user.color}]-500`}
			style="left: {i * 8}px; transform: translateX({-i * 100}%);"
		>
			{getInitials(user.name)}
		</div>
	{/each}
</div>
