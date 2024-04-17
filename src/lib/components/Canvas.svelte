<script lang="ts">
	import { toolState, ToolState, canvasView, mouseEvents } from '$lib/stores/stateStore';
	import { onMount } from 'svelte';
	import { svgs } from '$lib/stores/svgStore.js';

	onMount(() => {
		resizeCanvas();
	});

	function resizeCanvas() {
		$canvasView = {
			...$canvasView,
			width: window.innerWidth,
			height: window.innerHeight
		};
	}
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<svg
	class:draggable={$toolState === ToolState.pan}
	role="application"
	aria-label="Interactive infinite whiteboard with draggable grid"
	xmlns="http://www.w3.org/2000/svg"
	width="100%"
	height="100%"
	viewBox={`
  ${$canvasView.x - $canvasView.width / ((2 * $canvasView.scale) / 100)} 
  ${$canvasView.y - $canvasView.height / ((2 * $canvasView.scale) / 100)} 
  ${$canvasView.width / ($canvasView.scale / 100)} 
  ${$canvasView.height / ($canvasView.scale / 100)}
`}
	on:mousedown={mouseEvents.down}
	on:mousemove={mouseEvents.move}
	on:mouseup={mouseEvents.up}
	on:mouseleave={mouseEvents.up}
	on:resize={resizeCanvas}
>
	<!-- Define the pattern for the dotted background -->
	<pattern
		id="pattern-circles"
		x="0"
		y="0"
		width="50"
		height="50"
		patternUnits="userSpaceOnUse"
		patternContentUnits="userSpaceOnUse"
	>
		<circle cx="10" cy="10" r="1.5" fill="#8c8c8c" />
	</pattern>

	<!-- Render background pattern -->
	<rect
		x={$canvasView.x - $canvasView.width / ((2 * $canvasView.scale) / 100)}
		y={$canvasView.y - $canvasView.height / ((2 * $canvasView.scale) / 100)}
		width="100%"
		height="100%"
		fill="url(#pattern-circles)"
	/>

	<!-- Render the SVGs -->
	{#each $svgs as svgObj}
		<g transform={`translate(${svgObj.x}, ${svgObj.y})`}>
			{@html svgObj.svg}
		</g>
	{/each}
</svg>

<style>
	.draggable {
		cursor: grab;
	}
	.draggable:active {
		cursor: grabbing;
	}
</style>
