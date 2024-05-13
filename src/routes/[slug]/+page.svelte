<script lang="ts">
	import Canvas from '$lib/components/Canvas.svelte';
	import UI from '$lib/components/UI.svelte';
	import InitializationPage from '$lib/components/InitializationPage.svelte';
	import { boardId, currentPage } from '$lib/stores/stateStore';

	import { Page } from '$lib/types';

	export let data;
	boardId.set(data.slug);
</script>

{#if $currentPage === Page.CanvasPage}
	<Canvas />
	<UI />
{:else}
	<InitializationPage />
{/if}
