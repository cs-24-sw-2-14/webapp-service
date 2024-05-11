<script lang="ts">
	import { user, otherUsers } from '$lib/stores/stateStore';
	import { colorMap } from '$lib/color';
	import { type User, Color } from '$lib/types';

	enum DisabledBy {
		CurrentUser,
		OtherUser,
		NotDisabled
	}

	/* Checks if a color is chosen and returns true or false so the color-button gets disabled */
	function isColorChosen(color: Color, user: User, otherUsers: User[]) {
		if (user.color === color) {
			return DisabledBy.CurrentUser;
		}

		for (let i = 0; i < otherUsers.length; i++) {
			const onlineUser = otherUsers[i];
			if (onlineUser?.color === color) {
				return DisabledBy.OtherUser;
			}
		}
		return DisabledBy.NotDisabled;
	}
</script>

<!-- Grid of all the colors -->
<div class=" grid grid-cols-5 gap-3 place-content-center p-5">
	{#each colorMap as color}
		<div class="justify-center">
			<button
				style={`background-color: ${color[1].primary}; border-color: ${color[1].secondary};`}
				disabled={isColorChosen(color[0], $user, $otherUsers) !== DisabledBy.NotDisabled}
				class:disabled-by-user={isColorChosen(color[0], $user, $otherUsers) ===
					DisabledBy.CurrentUser}
				class:disabled-by-other-user={isColorChosen(color[0], $user, $otherUsers) ===
					DisabledBy.OtherUser}
				on:click={() => {
					$user = { ...$user, color: color[0] };
				}}
			>
			</button>
		</div>
	{/each}
</div>

<style>
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
		transform: translate(-50%, -52%); /* Center the content */
		font-size: 370%; /* Increase font size */
		z-index: 1; /* Ensure X appears above button */
		pointer-events: none;
		color: #27272a; /* Set color to dark grey */
	}
</style>
