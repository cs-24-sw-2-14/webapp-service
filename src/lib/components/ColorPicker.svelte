<script lang="ts">
	import { user, onlineUsers } from '$lib/stores/stateStore';
	import { colors } from '../color';
	import type { User, Color } from '$lib/stores/stateStore';

	/* Checks if a color is chosen and returns true or false so the color-button gets disabled */
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

	/* Changes the users color to the color they picked */
	function colorClicked(color: Color) {
		user.update((current: User) => {
			current.color = color;
			return {
				...current
			};
		});
	}
</script>

<!-- Table of all the colors -->
<div class="container">
	<table>
		{#each [0, 1, 2] as row}
			<tr>
				{#each colors.slice(row * 5, row * 5 + 5) as color}
					<td>
						<button
							style={`background-color: ${color.bg}; border-color: ${color.border};`}
							class={`border-2 hover:border-4`}
							disabled={colorChosen(color, $user, $onlineUsers)}
							on:click={() => {
								colorClicked(color);
							}}>
						</button>
					</td>
				{/each}
			</tr>
		{/each}
	</table>
</div>

<style>
	.color {
		background-color: #ef4444;
	}

	/* Container-div for the table to center it */
	.container {
		display: flex;
		justify-content: center; /* Center horizontally */
		align-items: center; /* Center vertically */
	}

	/* Color-Button styles */
	button {
		border-radius: 50%;
		width: 2.5em;
		height: 2.5em;
		vertical-align: middle; /* Align vertically */
		position: relative; 
		overflow: hidden; /* Allow content to overflow */
		margin: 0.5em; /* Add margin around the button */
	}

	/* Color-button when disabled style*/
	button:disabled::after {
		content: '✕'; /* Add 'X' as button-content */
		position: absolute;
		top: 45%; /* Align to the center vertically - usually 50% but the X is not full height and so needs to be raised a bit*/
		transform: translate(-50%, -50%); /* Center the content */
		font-size: 300%; /* Increase font size */
		z-index: 1; /* Ensure X appears above button */
		color: #27272a; /* Set color to dark grey */
	}
</style>
