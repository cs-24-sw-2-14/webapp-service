<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';
	import type { ChangeEventHandler } from 'svelte/elements';

	export let title;
	export let placeholder;
	export let dialog: HTMLDialogElement;
	export let closable = true;
	export let contentChanged: ChangeEventHandler<HTMLTextAreaElement>;

	let contentField = '';
</script>

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
			<textarea
				id="content"
				bind:value={contentField}
				on:change={contentChanged}
				{placeholder}
				class="mt-1 p-2 border rounded w-full placeholder-zinc-300 bg-zinc-500 border-none focus:outline-none focus:ring-0 focus:border-none text-zinc-300"
			/>
		</div>
	</div>
	<!-- ************************************************** -->
</Modal>
