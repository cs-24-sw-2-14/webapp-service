<script lang="ts">
	import Canvas from '$lib/components/Canvas.svelte';
	import UI from '$lib/components/UI.svelte';
	import Websocket from '$lib/components/Websocket.svelte';
	import InitializationPage from '$lib/components/InitializationPage.svelte';
	import { boardId, socket, currentPage } from '$lib/stores/stateStore';
	import io from 'socket.io-client';

	import {
		PUBLIC_SOCKET_API_PROTOCOL,
		PUBLIC_SOCKET_API_HOSTNAME,
		PUBLIC_SOCKET_API_PORT
	} from '$env/static/public';
	import { Page } from '$lib/types';

	export let data;
	boardId.set(data.slug);

	const SOCKET_ENDPOINT: string = `${PUBLIC_SOCKET_API_PROTOCOL}://${PUBLIC_SOCKET_API_HOSTNAME}:${PUBLIC_SOCKET_API_PORT}/${$boardId}`;
	// TODO: Mads, fix socket types
	socket.set(io(SOCKET_ENDPOINT));
</script>

{#if $currentPage === Page.CanvasPage}
	<Canvas />
	<UI />
{:else}
	<InitializationPage />
{/if}
<Websocket />
