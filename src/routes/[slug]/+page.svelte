<script lang="ts">
	import Canvas from '$lib/components/Canvas.svelte';
	import UI from '$lib/components/UI.svelte';
	import Websocket from '$lib/components/websocket.svelte';
	import InitilizationPage from '$lib/components/InitilizationPage.svelte';
	import { boardId, socket, currentPage, Page } from '$lib/stores/stateStore';
	import io from 'socket.io-client';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	import {
		PUBLIC_SOCKET_API_PROTOCOL,
		PUBLIC_SOCKET_API_HOSTNAME,
		PUBLIC_SOCKET_API_PORT
	} from '$env/static/public';

	let hostname = writable('');
	onMount(() => {
		hostname.set('http://' + window.location.hostname + ':5123');
	});

	export let data;
	boardId.set(data.slug);

	const SOCKET_ENDPOINT: string = `${PUBLIC_SOCKET_API_PROTOCOL}://${PUBLIC_SOCKET_API_HOSTNAME}:${PUBLIC_SOCKET_API_PORT}/${$boardId}`;

	socket.set(io(SOCKET_ENDPOINT));
</script>

{#if $currentPage === Page.CanvasPage}
	<Canvas />
	<UI />
{:else}
	<InitilizationPage />
{/if}
<Websocket />
