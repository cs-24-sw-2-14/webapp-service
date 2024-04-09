<script lang="ts">
import {onlineUsers} from "$lib/stores/stateStore";
import type { OnlineUser } from "$lib/stores/stateStore";

	onlineUsers.update((current: OnlineUser[])=> {
		return [
		{ name: 'Elma Vukicevic', color: 'bg-blue-500', border: 'border-blue-800' },
		{ name: 'Amalie Jensen', color: 'bg-red-500', border: 'border-red-800' },
		{ name: 'Cecilie Lassen', color: 'bg-green-500', border: 'border-green-800' },
		{ name: 'Kresten Sckerl', color: 'bg-orange-500', border: 'border-orange-800' },
		{ name: 'Mads Fagerlund', color: 'bg-purple-500', border: 'border-purple-800' },
		{ name: 'Marc Nygaard', color: 'bg-pink-500', border: 'border-pink-800' },
		{ name: 'Thorbjørn Larsen', color: 'bg-yellow-500', border: 'border-yellow-800' }
	];
	})





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
			class={`w-10 h-10 rounded-full text-white text-center text-sm font-mono leading-[38px] absolute ${user.color} border-2 ${user.border} ring-gray-800 ring-2`}
			style="left: {i * 8}px; transform: translateX({-i * 100}%);"
		>
			{getInitials(user.name)}
		</div>
	{/each}
</div>
