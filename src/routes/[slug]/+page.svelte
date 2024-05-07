<script lang="ts">
	import Canvas from '$lib/components/Canvas.svelte';
	import UI from '$lib/components/UI.svelte';
	import Websocket from '$lib/components/websocket.svelte';
	import InfoPicker from '$lib/components/CustomizationForm.svelte';
	import { boardId, socket, currentPage, Page } from '$lib/stores/stateStore';
	import io from 'socket.io-client';

	export let data;
	boardId.set(data.slug);
	const ENDPOINT = 'ws://localhost:6123' + '/' + $boardId;
	socket.set(io(ENDPOINT));
</script>

{#if $currentPage === Page.CanvasPage}
	<Canvas />
	<UI />
{:else}
	<InfoPicker />
{/if}
<Websocket />
