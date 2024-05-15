<script lang="ts">
	import UserModal from './UserModal.svelte';
	import { io, Socket } from 'socket.io-client';
	import {
		PUBLIC_SOCKET_API_PROTOCOL,
		PUBLIC_SOCKET_API_HOSTNAME,
		PUBLIC_SOCKET_API_PORT
	} from '$env/static/public';
	import type { ServerToClientEvents, ClientToServerEvents } from '$lib/socketioInterface';

	let dialog: HTMLDialogElement;
	const SOCKET_ENDPOINT: string = `${PUBLIC_SOCKET_API_PROTOCOL}://${PUBLIC_SOCKET_API_HOSTNAME}:${PUBLIC_SOCKET_API_PORT}/${$boardId}`;

	function handleSubmit(username: string) {
		$user.name = username;

		const newSocket: Socket<ServerToClientEvents, ClientToServerEvents> = io(SOCKET_ENDPOINT, {
			auth: {
				username: username
			}
		});

		newSocket.on('connect_error', (err) => {
			console.log(err.message);
		});

		newSocket.on('connect', () => {
			console.log('Connected!');
			socket.set(newSocket);
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
