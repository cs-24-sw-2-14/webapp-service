<script lang="ts">
	import Canvas from '$lib/components/Canvas.svelte';
	import UI from '$lib/components/UI.svelte';
	import Websocket from '$lib/components/websocket.svelte';
	import { boardId, socket } from '$lib/stores/stateStore';
	import io from 'socket.io-client';
	export let data;
	boardId.set(data.slug);
	const ENDPOINT = 'ws://localhost:6123' + '/' + $boardId;
	socket.set(io(ENDPOINT));
</script>

<Canvas></Canvas>
<UI></UI>
<Websocket />
