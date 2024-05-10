<script lang="ts">
	import { user, otherUsers, currentPage, Page } from '$lib/stores/stateStore';
	import ColorPicker from './Input/ColorPicker.svelte';
	import Modal from './Modal.svelte';
	import { writable } from 'svelte/store';

	export let title;
	export let placeholder;
	export let submitButtonName;
	export let handleSubmit;
	export let dialog: HTMLDialogElement;
	export let closable = true;

	const usernameIsValid = writable(false);
	let usernameField = '';

	function handleUsernameFieldChange() {
		// if username does not exist in otherUsers, set usernameIsValid to true
		usernameIsValid.set($otherUsers.find((user) => user.name === usernameField) === undefined);
	}
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
				on:change={handleUsernameFieldChange}
				{placeholder}
				class="mt-1 p-2 border rounded w-full placeholder-zinc-300 bg-zinc-500 border-none focus:outline-none focus:ring-0 focus:border-none text-zinc-300"
			/>
		</div>

		<!-- Color Picker -->
		<ColorPicker></ColorPicker>

		<button
			class="mt-4 px-4 py-2 bg-yellow-500 rounded shadow hover:bg-yellow-600 disabled:bg-yellow-600 w-full"
			disabled={$user.color === null || usernameField === '' || !$usernameIsValid}
			on:click={() => {
				handleSubmit(usernameField);
			}}
		>
			{submitButtonName}
		</button>
	</div>
	<!-- ************************************************** -->
</Modal>
