<script lang="ts">
	import UserModal from './UserModal.svelte';
	import { currentPage, username, boardId, color } from '$lib/stores/stateStore';
	import { otherUsers, connectToBoardSocket, connectToInitSocket } from '$lib/stores/socketioStore';
	import { Page, type Color } from '$lib/types';
	import { onMount } from 'svelte';
	let dialog: HTMLDialogElement;

	onMount(() => {
		connectToInitSocket($boardId, () => {
			console.log('connected to init socket');
		});
	});

	function handleSubmit(username: string, color: Color) {
		connectToBoardSocket(username, color, $boardId, () => {
			$username = username;
			$color = color;
			$currentPage = Page.CanvasPage;
		});
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
		otherUsers={$otherUsers}
		boardId={$boardId}
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
