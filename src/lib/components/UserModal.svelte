<script lang="ts">
	import ColorPicker from './Input/ColorPicker.svelte';
	import Modal from './Modal.svelte';
	import type { Color, Username } from '$lib/types';
	import { userExists, colorExists } from '$lib/http';

	export let dialog: HTMLDialogElement;
	export let title;
	export let placeholder;
	export let submitButtonName;
	export let handleSubmit: (username: Username, color: Color) => void;
	export let closable = true;
	export let boardId;
	export let fieldDefaultValue = '';

	let usernameField = fieldDefaultValue;
	export let colorPicked: Color | null = null;

	$: usernameIsValid = userExists(boardId, usernameField);
	$: colorIsValid = colorPicked !== null ? colorExists(boardId, colorPicked) : false;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<Modal bind:dialog {closable}>
	<div>
		<!-- Modal content... -->
		<h2 class="text-3xl font-semibold mb-4 text-zinc-300 text-center">
			{title}
		</h2>
	</div>

	<hr />

	<div class="w-full bg-zinc-700 flex my-5 rounded mx-auto"></div>

	<!-- User Information Section -->
	<div>
		<div>
			<input
				type="text"
				id="username"
				bind:value={usernameField}
				{placeholder}
				class="mt-1 p-2 border rounded w-full placeholder-zinc-300 bg-zinc-500 border-none focus:outline-none focus:ring-0 focus:border-none text-zinc-300"
			/>
		</div>

		<!-- Color Picker -->
		<ColorPicker bind:colorPicked></ColorPicker>

		<button
			class="mt-4 px-4 py-2 bg-yellow-500 rounded shadow hover:bg-yellow-600 disabled:bg-yellow-600 w-full"
			disabled={!usernameIsValid || !colorIsValid}
			on:click={() => {
				if (colorPicked === null) return;
				handleSubmit(usernameField, colorPicked);
			}}
		>
			{submitButtonName}
		</button>
	</div>
	<!-- ************************************************** -->
</Modal>
