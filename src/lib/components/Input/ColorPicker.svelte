<script lang="ts">
	import { user, onlineUsers } from '$lib/stores/stateStore';
	import { colors } from '$lib/color';
	import type { User, Color } from '$lib/types';

	enum DisabledBy {
		CurrentUser,
		OtherUser,
		NotDisabled
	}

	/* Checks if a color is chosen and returns true or false so the color-button gets disabled */
	function colorChosen(color: Color, user: User, onlineUsers: User[]) {
		if (user?.color?.name === color.name) {
			return DisabledBy.CurrentUser;
		}

		for (let i = 0; i < onlineUsers.length; i++) {
			const onlineUser = onlineUsers[i];
			if (onlineUser?.color?.name === color.name) {
				return DisabledBy.OtherUser;
			}
		}
		return DisabledBy.NotDisabled;
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
							disabled={colorChosen(color, $user, $onlineUsers) !== DisabledBy.NotDisabled}
							class:disabled-by-user={colorChosen(color, $user, $onlineUsers) ===
								DisabledBy.CurrentUser}
							class:disabled-by-other-user={colorChosen(color, $user, $onlineUsers) ===
								DisabledBy.OtherUser}
							on:click={() => {
								$user = { ...$user, color: color };
							}}
						>
						</button>
					</td>
				{/each}
			</tr>
		{/each}
	</table>
</div>

<style>
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
		border-width: 0.15em;
	}

	/* Apply thicker border on hover for enabled buttons */
	button:not(:disabled):hover {
		border-width: 0.3em; /* Increase border thickness on hover */
	}

	.disabled-by-user {
		border-width: 0.5em; /* Set border width to 2px for buttons disabled by other users */
	}

	/* Color-button when disabled style*/
	.disabled-by-other-user::after {
		content: '✕'; /* Add 'X' as button-content */
		position: absolute;
		font-weight: 900;
		top: 45%; /* Align to the center vertically - usually 50% but the X is not full height and so needs to be raised a bit*/
		transform: translate(-50%, -50%); /* Center the content */
		font-size: 370%; /* Increase font size */
		z-index: 1; /* Ensure X appears above button */
		pointer-events: none;
		color: #27272a; /* Set color to dark grey */
	}
</style>
