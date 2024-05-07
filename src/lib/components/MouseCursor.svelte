<script lang="ts">
	import { colorToHex } from '$lib/color';
	import { afterUpdate } from 'svelte';
	import { type CanvasMousePosition, UserColor, ToolState } from '$lib/types';
	import { canvasView, toolState, user } from '$lib/stores/stateStore';
	import { canvasMousePosition } from '$lib/stores/stateStore';

	import { cursors, onlineUsers } from '$lib/stores/stateStore';

	let cursor: any;
	let rectElements: any[] = [];
	let textElements: any[] = [];
	$: cursor = globalCoordinates($canvasMousePosition);
	// Updating the local user
	// Updating the local user
	$: console.log($user);

	//console.log(hexToColor('#ef4444'));
	//console.log(UserColor[hexToColor('#ef4444')]);

	//let localUserColor: string;
	//$: localUserColor = colorToHex(UserColor[$cursors.localCursor.color]).secondary;

	// Update cursors store to include the new local cursor properties
	$: if ($canvasMousePosition) {
		const newLocalCursor = {
			...$cursors.localCursor,
			posX: cursor.x,
			posY: cursor.y,
			color: UserColor[$user.color]
		};
		cursors.update((current) => ({ ...current, localCursor: newLocalCursor }));

		$cursors.localCursor.color = $user.color;
		$cursors.localCursor.name = $user.name;
		$user.posX = $cursors.localCursor.posX;
		$user.posY = $cursors.localCursor.posY;
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
		<circle cx="10" cy="10" r="3" fill={colorToHex($user.color).secondary} />
	</g>
{/if}

<!-- REMOTE CURSORS (OTHER USERS) -->
{#each $onlineUsers as users, index}
	<g transform={`translate(${users.posX}, ${users.posY})`}>
		<!-- Remote cursor dot -->
		<circle cx="10" cy="10" r="3" fill={colorToHex(users.color).secondary} />

		<!-- Remote name label -->
		<svg width="200" height="100" xmlns="http://www.w3.org/2000/svg">
			<rect bind:this={rectElements[index]} fill={colorToHex(users.color).secondary} />
			<text
				class="select-none"
				bind:this={textElements[index]}
				x="25"
				y="45"
				font-family="Arial"
				font-size="20"
				fill={colorToHex(users.color).primary}
			>
				{users.name}
			</text>
		</svg>
	</g>
{/each}
