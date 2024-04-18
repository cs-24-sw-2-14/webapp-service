<script lang="ts">
	import Canvas from '$lib/components/Canvas.svelte';
	import UI from '$lib/components/UI.svelte';

	import { serverId } from '$lib/stores/stateStore';
	export let data;

	serverId.set(data.slug);
</script>

<Canvas></Canvas>
<UI></UI>
