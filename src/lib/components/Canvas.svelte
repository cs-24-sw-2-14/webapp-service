<script lang="ts">
	import {
		toolState,
		canvasView,
		touchEvents,
		mouseEvents,
		drawingsUnderCursor,
		cursorPosition,
		toggleGrid,
		user
	} from '$lib/stores/stateStore';
	import { ToolState } from '$lib/types';
	import { onMount } from 'svelte';
	import { svgs } from '$lib/stores/svgStore.js';
	import type { ViewportCoordinates } from '$lib/types';
	import MouseCursors from './MouseCursors.svelte';
	import { viewportToCanvasCoordinatesFromCanvasView } from '$lib/utils';

	onMount(() => {
		resizeCanvas();
	});

	// TODO: Thorbjørn, fix zoom
	function resizeCanvas() {
		$canvasView.size = {
			width: window.innerWidth,
			height: window.innerHeight
		};
	}

	cursorPosition.subscribe(removeElements);

	// TODO: Get SVG elements under cursor by bounding box instead, Mads.
	function removeElements(pos: ViewportCoordinates) {
		if (!$drawingsUnderCursor) return;
		$drawingsUnderCursor.filter((drawing) => {
			const node = drawing.eventTarget as HTMLElement;
			const svgRect = node.getBoundingClientRect();
			if (
				pos.x < svgRect.left ||
				pos.x > svgRect.right ||
				pos.y < svgRect.top ||
				pos.y > svgRect.bottom
			) {
				return false;
			}
			return true;
		});
	}

	cursorPosition.subscribe(() => {
		$user.position = viewportToCanvasCoordinatesFromCanvasView($cursorPosition, $canvasView);
	});
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<svg
	class:draw={$toolState === ToolState.draw}
	class:draggable={$toolState === ToolState.pan}
	role="application"
	aria-label="Interactive infinite whiteboard with draggable grid"
	xmlns="http://www.w3.org/2000/svg"
	width="100%"
	height="100%"
	viewBox={`
  ${$canvasView.position.x - $canvasView.size.width / ((2 * $canvasView.scale) / 100)}
  ${$canvasView.position.y - $canvasView.size.height / ((2 * $canvasView.scale) / 100)}
  ${$canvasView.size.width / ($canvasView.scale / 100)}
  ${$canvasView.size.height / ($canvasView.scale / 100)}
`}
	on:mousedown={mouseEvents.down}
	on:mousemove={mouseEvents.move}
	on:mouseup={mouseEvents.up}
	on:mouseleave={mouseEvents.up}
	on:touchstart={touchEvents.start}
	on:touchmove={touchEvents.move}
	on:touchend={touchEvents.end}
	on:touchcancel={touchEvents.end}
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
	{#if $toggleGrid}
		<rect
			x={$canvasView.position.x - $canvasView.size.width / ((2 * $canvasView.scale) / 100)}
			y={$canvasView.position.y - $canvasView.size.height / ((2 * $canvasView.scale) / 100)}
			width="100%"
			height="100%"
			fill="url(#pattern-circles)"
		/>
	{/if}

	<!-- Render the Drawings -->
	{#each $svgs as svg}
		<!-- svelte-ignore a11y-mouse-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<g
			transform={`translate(${svg.placement.x}, ${svg.placement.y})`}
			on:mouseover={(event) => {
				if (!event.target) return;
				$drawingsUnderCursor.push({
					commandId: svg.commandId,
					eventTarget: event.target
				});
			}}
		>
			{@html svg.svg}
		</g>
	{/each}

	<!-- Mouse Cursor (local and remote) -->
	<MouseCursors></MouseCursors>
</svg>

<style>
	.draggable {
		cursor: grab;
	}
	.draggable:active {
		cursor: grabbing;
	}

	.draw {
		cursor: none;
	}

	svg {
		overscroll-behavior: none;
		touch-action: pan-down;
	}
</style>
