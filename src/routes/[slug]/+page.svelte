<script lang="ts">
	import CanvasV2 from '$lib/components/CanvasV2.svelte';
	import UI from '$lib/components/UI.svelte';

	import { serverId } from '$lib/stores/stateStore';
	export let data;

	serverId.set(data.props.slug);
</script>

<CanvasV2></CanvasV2>
<UI></UI>
