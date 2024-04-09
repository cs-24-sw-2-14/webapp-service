<script lang="ts">
	import CanvasV3 from '$lib/components/CanvasV3.svelte';
	import UI from '$lib/components/UI.svelte';

	import { serverId } from '$lib/stores/stateStore';
	export let data;

	serverId.set(data.slug);
</script>

<CanvasV3></CanvasV3>
<UI></UI>
