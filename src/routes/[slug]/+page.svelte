<script lang="ts">
	import Canvas from '$lib/components/Canvas.svelte';
	import UI from '$lib/components/UI.svelte';
	import Websocket from '$lib/components/websocket.svelte';
	import InfoPicker from '$lib/components/CustomizationForm.svelte';
	import { boardId, socket, currentPage, Page } from '$lib/stores/stateStore';
	import io from 'socket.io-client';

	import {
		PUBLIC_SOCKET_API_PROTOCOL,
		PUBLIC_SOCKET_API_HOSTNAME,
		PUBLIC_SOCKET_API_PORT
	} from '$env/static/public';

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
	<InfoPicker />
{/if}
<Websocket />
