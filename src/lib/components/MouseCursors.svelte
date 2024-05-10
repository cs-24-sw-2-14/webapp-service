<script lang="ts">
	import { colorMap } from '$lib/color';
	import { afterUpdate } from 'svelte';
	import { ToolState, type CanvasCoordinates } from '$lib/types';
	import { toolState, user, otherUsers } from '$lib/stores/stateStore';
	import { translateCoordinates } from '$lib/utils';

	const cursorOffset: CanvasCoordinates = {
		x: -10.5,
		y: -11
	};

	let rectElements: any[] = [];
	let textElements: any[] = [];
	$: adjustedCursorPosition = translateCoordinates($user.position, cursorOffset);

	// Function to dynamically adjust the width of the name label to accommodate the length of the name
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
{#if $toolState === ToolState.draw}
	<g transform={`translate(${adjustedCursorPosition.x}, ${adjustedCursorPosition.y})`}>
		<circle cx="10" cy="10" r="3" fill={$user.drawColor} />
	</g>
{/if}

<!-- REMOTE CURSORS (OTHER USERS) -->
{#each $otherUsers as user, index}
	<g
		transform={`translate(${user.position.x - cursorOffset.x}, ${user.position.y - cursorOffset.y})`}
	>
		<!-- Remote cursor dot -->
		<circle cx="10" cy="10" r="3" fill={user.drawColor} />

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
