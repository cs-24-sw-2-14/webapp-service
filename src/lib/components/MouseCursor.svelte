<script lang="ts">
	import { colorToHex, hexToColor } from '$lib/color';
	import { afterUpdate } from 'svelte';
	import { type CanvasMousePosition, type Cursors, UserColor, ToolState } from '$lib/types';
	import { canvasView, toolState, user } from '$lib/stores/stateStore';
	import { canvasMousePosition } from '$lib/stores/stateStore';

	import { cursors, chosenColor } from '$lib/stores/stateStore';

	let cursor: any;
	let rectElements = [];
	let textElements = [];
	$: cursor = globalCoordinates($canvasMousePosition);
	$: $cursors.localCursor.name = $user.name;
	$: $cursors.localCursor.color = hexToColor($user.color.border);

	let localUserColor: string;
	$: localUserColor = colorToHex(UserColor[$cursors.localCursor.color]).secondary;

	// Update cursors store to include the new local cursor properties
	$: if ($canvasMousePosition) {
		const newLocalCursor = {
			...$cursors.localCursor,
			posX: cursor.x,
			posY: cursor.y,
			color: UserColor[$user.color.name]
		};
		cursors.update((current) => ({ ...current, localCursor: newLocalCursor }));
	}

	// Function to get the position of the cursor in tge "global" coordinate system
	function globalCoordinates(pos: CanvasMousePosition) {
		const tx =
			(pos.x - $canvasView.width / 2) / ($canvasView.scale / 100) + $canvasView.position.x - 10.5;
		const ty =
			(pos.y - $canvasView.height / 2) / ($canvasView.scale / 100) + $canvasView.position.y - 11;
		return { x: tx, y: ty };
	}

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
	<g transform={`translate(${$cursors.localCursor.posX}, ${$cursors.localCursor.posY})`}>
		<circle cx="10" cy="10" r="3" fill={localUserColor} /><text>{$cursors.localCursor.name}</text>
	</g>
{/if}

<!-- REMOTE CURSORS (OTHER USERS) -->
{#each $cursors.remoteCursors as remoteCursor, index}
	<g transform={`translate(${remoteCursor.posX}, ${remoteCursor.posY})`}>
		<!-- Remote cursor dot -->
		<circle cx="10" cy="10" r="3" fill={colorToHex(remoteCursor.color).secondary} />

		<!-- Remote name label -->
		<svg width="200" height="100" xmlns="http://www.w3.org/2000/svg">
			<rect bind:this={rectElements[index]} fill={colorToHex(remoteCursor.color).secondary} />
			<text
				class="select-none"
				bind:this={textElements[index]}
				x="25"
				y="45"
				font-family="Arial"
				font-size="20"
				fill={colorToHex(remoteCursor.color).primary}
			>
				{remoteCursor.name}
			</text>
		</svg>
	</g>
{/each}
