<script lang="ts">
	import UserModal from './UserModal.svelte';
	import { currentPage, Page, user } from '$lib/stores/stateStore';

	let dialog: HTMLDialogElement;

	function handleSubmit(username: string) {
		$user.name = username;
		$currentPage = Page.CanvasPage;
	}
	$: if (dialog) dialog.showModal();
</script>

<main>
	<UserModal
		bind:dialog
		title="Pick Your Username and Color"
		placeholder="Username"
		submitButtonName="Continue"
		{handleSubmit}
		closable={false}
	/>
</main>

<style>
	main {
		display: flex; /* Establishes a flex container */
		/*flex-direction: column;*/
		justify-content: center; /* Centers children horizontally in the container */
		align-items: center; /* Centers children vertically in the container */
		min-height: 100vh; /* Ensures the <main> element covers the viewport height */
		background-image: radial-gradient(#b561ff 25%, #9ef2ff 100%);
		/*It makes the background have a radial gradient in the chosen colors*/
		cursor: default;
	}
</style>
