<script lang="ts">
	import Canvas from '$lib/components/Canvas.svelte';
	import UI from '$lib/components/UI.svelte';
	import Websocket from '$lib/components/websocket.svelte';
	import InfoPicker from '$lib/components/CustomizationForm.svelte';
	import { boardId, socket, currentPage, Page } from '$lib/stores/stateStore';
	import io from 'socket.io-client';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	let hostname = writable('');
	onMount(() => {
		hostname.set('http://' + window.location.hostname + ':5123');
	});

	export let data;
	boardId.set(data.slug);

	const ENDPOINT: string = 'ws://' + $hostname + ':5123' + '/' + $boardId;
	socket.set(io(ENDPOINT));
</script>

{#if $currentPage === Page.CanvasPage}
	<Canvas />
	<UI />
{:else}
	<InfoPicker />
{/if}
<Websocket />
