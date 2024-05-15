<script lang="ts">
	import UserModal from './UserModal.svelte';
	import {
		currentPage,
		username,
		boardId,
		color,
		canvasCursorPosition
	} from '$lib/stores/stateStore';
	import { otherUsers, socket, initSocket } from '$lib/stores/socketioStore';
	import { Page, type Color } from '$lib/types';
	import { io, Socket } from 'socket.io-client';
	import { onMount } from 'svelte';
	import type {
		ServerToClientEvents,
		ClientToServerEvents,
		InitServerToClientEvents
	} from '$lib/socketioInterface';
	import {
		PUBLIC_SOCKET_API_PROTOCOL,
		PUBLIC_SOCKET_API_HOSTNAME,
		PUBLIC_SOCKET_API_PORT
	} from '$env/static/public';

	const BOARD_SOCKET_ENDPOINT: string = `${PUBLIC_SOCKET_API_PROTOCOL}://${PUBLIC_SOCKET_API_HOSTNAME}:${PUBLIC_SOCKET_API_PORT}/${$boardId}`;
	const INIT_SOCKET_ENDPOINT: string = `${PUBLIC_SOCKET_API_PROTOCOL}://${PUBLIC_SOCKET_API_HOSTNAME}:${PUBLIC_SOCKET_API_PORT}/${$boardId}_init`;

	onMount(() => {
		const newSocket: Socket<InitServerToClientEvents> = io(INIT_SOCKET_ENDPOINT);
		newSocket.on('connect_error', (err) => {
			console.error(err.message);
		});

		newSocket.on('connect', () => {
			initSocket.set(newSocket);
			console.log('connected to init socket');
		});
	});

	let dialog: HTMLDialogElement;

	function handleSubmit(username: string, color: Color) {
		$username = username;
		$color = color;
		$initSocket.disconnect();

		const newSocket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
			BOARD_SOCKET_ENDPOINT,
			{
				auth: {
					username: username,
					color: color
				}
			}
		);

		newSocket.on('connect_error', (err) => {
			console.error(err.message);
		});

		newSocket.on('connect', () => {
			socket.set(newSocket);
			console.log('connected to board socket');

			$socket.emit('userChange', {
				username: $username,
				color: $color,
				position: $canvasCursorPosition
			});

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
