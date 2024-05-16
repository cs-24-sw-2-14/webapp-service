<script lang="ts">
	import UserModal from './UserModal.svelte';
	import { currentPage, username, boardId, color } from '$lib/stores/stateStore';
	import {
		boardSocket,
		connectToBoardSocket,
		connectToInitSocket,
		initSocket
	} from '$lib/stores/socketioStore';
	import { onMount } from 'svelte';
	import { Page, type Color, type Username } from '$lib/types';
	let dialog: HTMLDialogElement;

	onMount(() => {
		connectToInitSocket($boardId!, function onSuccess() {
			console.log('connected to initsocket!');
		});
	});

	function handleSubmit(username: Username, color: Color) {
		connectToBoardSocket(username, color, $boardId!, function onSuccess() {
			$initSocket?.disconnect();
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
		boardId={$boardId}
		colorPicked={$color}
		fieldDefaultValue={$username ?? ''}
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
