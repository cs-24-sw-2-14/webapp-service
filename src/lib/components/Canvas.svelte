<script lang="ts">
	import {
		chosenTool,
		canvasView,
		cursorEvents,
		toggleGrid,
		username,
		color,
		canvasCursorPosition
	} from '$lib/stores/stateStore';
	import { ToolState, type CommandId } from '$lib/types';
	import { onMount } from 'svelte';
	import { svgs, boardSocket } from '$lib/stores/socketioStore';
	import MouseCursors from './MouseCursors.svelte';

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

	function setBoundingBox(element: SVGGraphicsElement, commandId: CommandId) {
		const bbox = element.getBBox();
		if (!$svgs.has(commandId)) return;
		const oldSvg = $svgs.get(commandId)!;
		$svgs.set(commandId, {
			...oldSvg,
			boundingBox: {
				placement: { x: bbox.x, y: bbox.y },
				width: bbox.width,
				height: bbox.height
			}
		});
	}

	$: {
		$boardSocket.emit('userChange', {
			username: $username,
			color: $color,
			position: $canvasCursorPosition
		});
	}
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<svg
	class:draw={$chosenTool === ToolState.draw}
	class:draggable={$chosenTool === ToolState.pan}
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
	on:mousedown={cursorEvents.down}
	on:mousemove={cursorEvents.move}
	on:mouseup={cursorEvents.up}
	on:mouseleave={cursorEvents.up}
	on:touchstart={cursorEvents.down}
	on:touchmove={cursorEvents.move}
	on:touchend={cursorEvents.up}
	on:touchcancel={cursorEvents.up}
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
	{#each $svgs as [commandId, svg]}
		{#key svg.svgString}
			{#if svg.display}
				<g
					transform={`translate(${svg.placement.x}, ${svg.placement.y})`}
					use:setBoundingBox={commandId}
				>
					{@html svg.svgString}
				</g>
			{/if}
		{/key}
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
