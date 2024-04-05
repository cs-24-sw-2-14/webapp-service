<script lang="ts">
	import { toolState, canvasView } from '$lib/stores/stateStore';
	import { onMount } from 'svelte';
	import { svgs } from '$lib/stores/svgStore.js';
	import type { CanvasView } from '$lib/stores/stateStore';

	let isDragging: boolean = false;
	let startX: number, startY: number;

	onMount(() => {
		canvasView.update((current: CanvasView) => {
			return {
				...current,
				width: window.innerWidth,
				height: window.innerHeight
			};
		});
	});

	function handleMouseDown(event: MouseEvent) {
		if ($toolState.pan) {
			startDrag(event);
		}
	}

	function handleMouseMove(event: MouseEvent) {
		if ($toolState.pan) {
			doDrag(event);
		}
	}

	function handleMouseUp(event: MouseEvent) {
		if ($toolState.pan) {
			stopDrag();
		}
	}

	function handleMouseLeave(event: MouseEvent) {
		if ($toolState.pan) {
			stopDrag();
		}
	}

	function startDrag(event: MouseEvent) {
		isDragging = true;
		startX = event.clientX;
		startY = event.clientY;
	}

	function doDrag(event: MouseEvent) {
		if (!isDragging) return;

		canvasView.update((current: CanvasView) => {
			return {
				...current,
				x: $canvasView.x - (event.clientX - startX) / ($canvasView.scale / 100),
				y: $canvasView.y - (event.clientY - startY) / ($canvasView.scale / 100)
			};
		});

		startX = event.clientX;
		startY = event.clientY;
	}

	function stopDrag() {
		isDragging = false;
	}
</script>

<!-- transform={`scale(${})`} -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<svg
	class:draggable={$toolState.pan}
	role="application"
	aria-label="Interactive infinite whiteboard with draggable grid"
	xmlns="http://www.w3.org/2000/svg"
	width="100%"
	height="100%"
	viewBox={`${$canvasView.x - $canvasView.width / ((2 * $canvasView.scale) / 100)} ${$canvasView.y - $canvasView.height / ((2 * $canvasView.scale) / 100)} ${$canvasView.width / ($canvasView.scale / 100)} ${$canvasView.height / ($canvasView.scale / 100)}`}
	on:mousedown={handleMouseDown}
	on:mousemove={handleMouseMove}
	on:mouseup={handleMouseUp}
	on:mouseleave={handleMouseLeave}
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
		<circle cx="10" cy="10" r="1.5" fill="#000" />
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
	{#each $svgs as svgObj (svgObj.id)}
		<g transform={`translate(${svgObj.x}, ${svgObj.y})`}>
			{@html svgObj.svg}
		</g>
	{/each}
</svg>/style>

<style>
	.draggable {
		cursor: grab;
	}
	.draggable:active {
		cursor: grabbing;
	}
</style>
