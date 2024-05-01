<script lang="ts">
	import Canvas from '$lib/components/Canvas.svelte';
	import UI from '$lib/components/UI.svelte';
	import Websocket from '$lib/websocket.svelte';
	import { boardId } from '$lib/stores/stateStore';
	export let data;

	boardId.set(data.slug);
</script>

<Canvas></Canvas>
<UI></UI>
<Websocket />
