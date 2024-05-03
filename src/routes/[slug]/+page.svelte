<script lang="ts">
	import Canvas from '$lib/components/Canvas.svelte';
	import UI from '$lib/components/UI.svelte';
	import InfoPicker from  '$lib/components/CustomizationForm.svelte';

	import { serverId, currentPage, Page } from '$lib/stores/stateStore';
	export let data;

	serverId.set(data.slug);
</script>


{#if $currentPage === Page.CanvasPage}
<Canvas/>
<UI/>
{:else}
<InfoPicker/>
{/if}