<script lang="ts">
	import {
		toolState,
		ToolState,
		canvasView,
		mouseEvents,
		currentSvgElementIndex,
		canvasMousePosition,
		type CanvasMousePosition
	} from '$lib/stores/stateStore';
	import { onMount } from 'svelte';
	import { drawings } from '$lib/stores/svgStore.js';

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

	let lastSvgElement: EventTarget;

	$: {
		console.log($currentSvgElementIndex);
	}

	canvasMousePosition.subscribe(check);

	function drawBoundingBox(svgRect) {
		const boundingBox = document.createElement('div');
		boundingBox.style.position = 'absolute';
		boundingBox.style.left = `${svgRect.left}px`;
		boundingBox.style.top = `${svgRect.top}px`;
		boundingBox.style.width = `${svgRect.width}px`;
		boundingBox.style.height = `${svgRect.height}px`;
		boundingBox.style.border = '1px solid red';
		document.body.appendChild(boundingBox);
	}

	function check(pos: CanvasMousePosition) {
		if (!lastSvgElement) return;
		const node = lastSvgElement as HTMLElement;
		const svgRect = node.getBoundingClientRect();
		// drawBoundingBox(svgRect);
		console.log(pos, svgRect);
		if (
			pos.x < svgRect.left ||
			pos.x > svgRect.right ||
			pos.y < svgRect.top ||
			pos.y > svgRect.bottom
		) {
			$currentSvgElementIndex = null;
		}
	}
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-mouse-events-have-key-events -->
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
	{#each $drawings as drawing, index}
		<!-- svelte-ignore a11y-mouse-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<g
			transform={`translate(${svgObj.x}, ${svgObj.y})`}
			on:mouseover={(event) => {
				if (!event.target) return;
				lastSvgElement = event.target;
				$currentSvgElementIndex = index;
			}}
		>
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
