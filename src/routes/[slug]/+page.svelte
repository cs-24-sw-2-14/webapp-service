<script lang="ts">
	import Canvas from '$lib/components/Canvas.svelte';
	import UI from '$lib/components/UI.svelte';
	import Websocket from '$lib/components/websocket.svelte';
	import InfoPicker from '$lib/components/CustomizationForm.svelte';
	import { boardId, socket, currentPage, Page } from '$lib/stores/stateStore';
	import io from 'socket.io-client';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	const { SOCKET_API_PROTOCOL, SOCKET_API_HOSTNAME, SOCKET_API_PORT } = process.env;

	let hostname = writable('');
	onMount(() => {
		hostname.set('http://' + window.location.hostname + ':5123');
	});

	export let data;
	boardId.set(data.slug);

	const SOCKET_ENDPOINT: string = `${SOCKET_API_PROTOCOL}://${SOCKET_API_HOSTNAME}:${SOCKET_API_PORT}/${$boardId}`;
	socket.set(io(SOCKET_ENDPOINT));
</script>

{#if $currentPage === Page.CanvasPage}
	<Canvas />
	<UI />
{:else}
	<InfoPicker />
{/if}
<Websocket />
