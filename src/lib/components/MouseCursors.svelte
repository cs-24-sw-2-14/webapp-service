<script lang="ts">
	import { colorMap } from '$lib/color';
	import { afterUpdate } from 'svelte';
	import { ToolState, type CanvasCoordinateSet } from '$lib/types';
	import { chosenTool, canvasCursorPosition, drawColor } from '$lib/stores/stateStore';
	import { otherUsers } from '$lib/stores/socketioStore';
	import { translateCoordinates } from '$lib/utils';

	const cursorOffset: CanvasCoordinateSet = {
		x: -10.5,
		y: -11
	};

	let rectElements: any[] = [];
	let textElements: any[] = [];
	$: adjustedCursorPosition = translateCoordinates($canvasCursorPosition, cursorOffset);

	/**
	 * Function to dynamically adjust the width of the name label to accommodate the length of the name
	 */
	function adjustBackground() {
		rectElements.forEach((rect, index) => {
			if (rect && textElements[index]) {
				const bbox = textElements[index].getBBox();
				rect.x.baseVal.value = bbox.x - 7.5; // Provide some padding
				rect.y.baseVal.value = bbox.y - 5;
				rect.width.baseVal.value = bbox.width + 15;
				rect.height.baseVal.value = bbox.height + 10;
			}
		});
	}

	afterUpdate(adjustBackground);
</script>

<!-- LOCAL CURSOR (DOSENT HAVE NAME LABEL) -->
{#if $chosenTool === ToolState.draw}
	<g transform={`translate(${adjustedCursorPosition.x}, ${adjustedCursorPosition.y})`}>
		<circle cx="10" cy="10" r="3" fill={$drawColor} />
	</g>
{/if}

<!-- REMOTE CURSORS (OTHER USERS) -->
{#each $otherUsers as [_, user], index}
	<g transform={`translate(${user.position.x}, ${user.position.y})`}>
		<!-- Remote cursor dot -->
		<circle cx="10" cy="10" r="3" fill={colorMap.get(user.color)?.primary} />

		<!-- Remote name label -->
		<rect bind:this={rectElements[index]} fill={colorMap.get(user.color)?.primary} />
		<text
			class="select-none"
			bind:this={textElements[index]}
			x="25"
			y="45"
			font-family="Arial"
			font-size="20"
			fill={colorMap.get(user.color)?.secondary}
		>
			{user.name}
		</text>
	</g>
{/each}
