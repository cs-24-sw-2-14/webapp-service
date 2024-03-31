<script lang="ts">
	interface OnlineUser {
		name: string;
		color: string;
		border: string;
	}
	export let users: OnlineUser[] = [];

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
	{#each users as user, i (user.name)}
		<div
			class={`w-10 h-10 rounded-full text-white text-center text-sm font-mono leading-[38px] absolute ${user.color} border-2 ${user.border} ring-gray-800 ring-2`}
			style="left: {i * 8}px; transform: translateX({-i * 100}%);"
		>
			{getInitials(user.name)}
		</div>
	{/each}
</div>
