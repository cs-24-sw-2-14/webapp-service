<script lang="ts">
	import { colorMap } from '$lib/color';
	import { Color } from '$lib/types';
	import { otherUsers } from '$lib/stores/socketioStore';
	export let colorPicked: Color | null = null;

	function isDisabledByOtherUser(color: Color): boolean {
		for (const [_, user] of $otherUsers) {
			if (user.color === color) {
				return true;
			}
			if (colorPicked === user.color) {
				colorPicked = null;
			}
		}
		return false;
	}
</script>

<div class="grid grid-cols-5 gap-3 place-content-center p-5">
	{#each colorMap as [colorName, color]}
		{#key $otherUsers}
			<div class="justify-center">
				<button
					style={`background-color: ${color.primary}; border-color: ${color.secondary}; ${colorPicked === colorName ? 'border-width: 0.45em;' : ''}`}
					disabled={isDisabledByOtherUser(colorName)}
					on:click={() => {
						colorPicked = colorName;
					}}
				>
				</button>
			</div>
		{/key}
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

	/* Color-button when disabled style*/
	button:disabled::after {
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
