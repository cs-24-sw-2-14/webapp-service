<script lang="ts">
	import MenuButton from '$lib/components/Navbar/MenuButton.svelte';
	import Icons from '$lib/icons/MenuIcons.json';
	import {
		chosenTool,
		cursorDown,
		commandIdsUnderCursor,
		canvasCursorPosition,
		username
	} from '$lib/stores/stateStore';
	import { boardSocket } from '$lib/stores/socketioStore';
	import { ToolState, type CanvasCoordinateSet, type CommandId } from '$lib/types';
	import { writable } from 'svelte/store';
	let currentCommandId = writable<number | null>(null);

	cursorDown.subscribe(startMove);
	canvasCursorPosition.subscribe(doMove);
	cursorDown.subscribe(stopDraw);

	let startPosition: CanvasCoordinateSet | null = null;
	let isMoving = false;

	function startMove() {
		if (
			!$cursorDown ||
			$chosenTool !== ToolState.move ||
			$commandIdsUnderCursor.length === 0 ||
			$currentCommandId !== null ||
			isMoving
		)
			return;
		startPosition = $canvasCursorPosition;
		$boardSocket?.emit(
			'startMove',
			{
				movedCommandId: $commandIdsUnderCursor[0],
				username: $username!
			},
			(commandId: CommandId) => currentCommandId.set(commandId)
		);
		isMoving = true;
	}

	function doMove() {
		if (
			!$cursorDown ||
			$chosenTool !== ToolState.move ||
			$currentCommandId === null ||
			startPosition === null ||
			!isMoving
		)
			return;
		$boardSocket?.volatile.emit('doMove', {
			position: {
				x: $canvasCursorPosition.x - startPosition.x,
				y: $canvasCursorPosition.y - startPosition.y
			},
			commandId: $currentCommandId
		});
	}

	function stopDraw() {
		if ($cursorDown || $chosenTool !== ToolState.move || !isMoving) return;
		$currentCommandId = null;
		isMoving = false;
	}
</script>

<MenuButton
	isActive={$chosenTool === ToolState.move}
	icon={Icons.move}
	on:click={() => {
		$chosenTool = ToolState.move;
	}}
></MenuButton>
