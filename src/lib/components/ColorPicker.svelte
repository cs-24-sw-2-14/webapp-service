<script lang="ts">
	import { user, onlineUsers } from '$lib/stores/stateStore';
	import { colors } from '../color';
	import type { User, Color } from '$lib/stores/stateStore';

	function colorChosen(color: Color, user: User, onlineUsers: User[]) {
		if (user && user.color && user.color.name === color.name) {
			return true;
		}

		for (let i = 0; i < onlineUsers.length; i++) {
			const onlineUser = onlineUsers[i];
			if (onlineUser && onlineUser.color && onlineUser.color.name === color.name) {
				return true;
			}
		}
		return false;
	}

	function colorClicked(color: Color) {
		user.update((current: User) => {
			current.color = color;
			return {
				...current
			};
		});
	}
</script>

<div class="container">
	<table>
		{#each [0, 1, 2] as row}
			<tr>
				{#each colors.slice(row * 5, row * 5 + 5) as color}
					<td
						><button
							class={`bg-${color.bg} border-${color.border} border-2 hover:border-4`}
							disabled={colorChosen(color, $user, $onlineUsers)}
							on:click={() => {
								colorClicked(color);
							}}
						></button></td
					>
				{/each}
			</tr>
		{/each}
	</table>
</div>

<style>
	/* Centering styles */
	.container {
		display: flex;
		justify-content: center; /* Center horizontally */
		align-items: center; /* Center vertically */
	}

	/* Button styles */
	button {
		border-radius: 50%;
		width: 2.5em;
		height: 2.5em;
		vertical-align: middle; /* Align vertically */
		position: relative; /* Set position to relative */
		overflow: hidden; /* Allow content to overflow */
        margin: 0.5em; /* Add margin around the button */

	}

	button:disabled::after {
		content: '✕'; /* Add 'X' content */
		position: absolute; /* Set position to absolute */
		top: 45%; /* Align to the center vertically */
		left: 50%; /* Align to the center horizontally */
		transform: translate(-50%, -50%); /* Center the content */
		font-size: 300%; /* Increase font size */
		z-index: 1; /* Ensure X appears above button */
		color: #27272a; /* Set color to grey */

	}
</style>
