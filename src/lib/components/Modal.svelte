<script lang="ts">
	export let closable = true;
	export let dialog: HTMLDialogElement;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:click|self={() => {
		if (!closable) return;
		dialog.close();
	}}
	class="bg-zinc-800"
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		{#if closable}
			<button
				class="w-8 h-8 font-semibold text-white absolute top-4 right-5 hover:bg-red-600"
				on:click={() => {
					dialog.close();
				}}
				style="margin-top: -0.5rem; margin-right: -0.5rem;">X</button
			>
		{/if}
		<slot name="header" />
		<slot />
	</div>
</dialog>

<style>
	dialog {
		max-width: 32em;
		border-radius: 0.4em;
		border: none;
		padding: 0;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.5);
	}
	dialog > div {
		padding: 2em;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
