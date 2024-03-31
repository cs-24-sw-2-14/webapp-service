<script lang="ts">
	import { toolState } from '$lib/stores/stateStore';

	import { onMount } from 'svelte';
	import { svgs } from '$lib/stores/svgStore.js';

	let viewBox = {
		x: 0,
		y: 0,
		width: 500, // Default values, will be replaced on mount
		height: 500 // Default values, will be replaced on mount
	};
	let isDragging: boolean = false;
	let startX: number, startY: number;
	let gridSize: number = 50; // The spacing between the dots
	let dotsX: number, dotsY: number; // Variables to hold the number of dots

	onMount(() => {
		viewBox.width = window.innerWidth;
		viewBox.height = window.innerHeight;
		// Recalculate the number of dots based on the window size
		dotsX = Math.ceil(viewBox.width / gridSize) + 1;
		dotsY = Math.ceil(viewBox.height / gridSize) + 1;
	});

	// Function to get the initial dot position adjusted for the current viewBox offset
	function getAdjustedPosition(pos: number, offset: number, size: number) {
		return Math.floor(offset / size) * size + pos * size - (offset % size);
	}

	function startDrag(event: MouseEvent) {
		let pan = $toolState.pan;

		if (pan) {
			// Only pan if the pan-button is anabled
			isDragging = true;
			startX = event.clientX;
			startY = event.clientY;
		}
	}

	function doDrag(event: MouseEvent) {
		if (!isDragging) return;

		// Assuming the viewBox dimensions are set to match the actual pixel dimensions
		// We do not need to calculate a ratio for the dx and dy, they should be 1:1
		const dx = event.clientX - startX;
		const dy = event.clientY - startY;

		// Update the viewBox coordinates directly with the delta values
		viewBox.x -= dx / 2; // Half the speed so the board moves with the cursor
		viewBox.y -= dy / 2; // Half the speed so the board moves with the cursor

		// Update each SVG's position
		svgs.update((currentSvgs) => {
			return currentSvgs.map((svg) => ({
				...svg,
				x: svg.x + dx / 2, // Half the speed so the SVG moves with the background
				y: svg.y + dy / 2 // Half the speed so the SVG moves with the background
			}));
		});

		// Update the startX and startY to the current cursor position for the next movement
		startX = event.clientX;
		startY = event.clientY;
	}

	function stopDrag() {
		isDragging = false;
	}
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<svg
	class:draggable={$toolState.pan}
	role="application"
	aria-label="Interactive infinite whiteboard with draggable grid"
	xmlns="http://www.w3.org/2000/svg"
	width="100%"
	height="100%"
	viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
	on:mousedown={startDrag}
	on:mousemove={doDrag}
	on:mouseup={stopDrag}
	on:mouseleave={stopDrag}
>
	<!-- Render the grid of dots -->
	{#if dotsX && dotsY}
		{#each Array(dotsY) as _, rowIndex}
			{#each Array(dotsX) as _, colIndex}
				<circle
					cx={getAdjustedPosition(colIndex, viewBox.x, gridSize)}
					cy={getAdjustedPosition(rowIndex, viewBox.y, gridSize)}
					r="1.25"
					fill="black"
				/>
			{/each}
		{/each}
	{/if}

	<!-- Render the SVGs -->
	{#each $svgs as svgObj (svgObj.id)}
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
