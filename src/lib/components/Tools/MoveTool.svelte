<script lang="ts">
	import MenuButton from '$lib/components/Navbar/MenuButton.svelte';
	import Icons from '$lib/icons/MenuIcons.json';
	import {
		toolState,
		cursorDown,
		commandIdsUnderCursor,
		user,
		socket
		canvasCursorPosition,
	} from '$lib/stores/stateStore';
	import { ToolState, type CanvasCoordinate, type CommandId } from '$lib/types';
	import { writable } from 'svelte/store';
	let currentCommandId = writable<number | null>(null);

	cursorDown.subscribe(startMove);
	canvasCursorPosition.subscribe(doMove);
	cursorDown.subscribe(stopDraw);

	let startPosition: CanvasCoordinateSet | null = null;

	function startMove() {
		if (
			!$canvasTouched ||
			$toolState !== ToolState.move ||
			$commandIdsUnderCursor.length === 0 ||
			$currentCommandId !== null
		)
			return;
		startPosition = $canvasCursorPosition;
		$socket.emit(
			'startMove',
			{
				movedCommandId: $commandIdsUnderCursor[0],
				username: $user.name
				newCoordinate: $canvasCursorPosition,
			},
			(commandId: CommandId) => currentCommandId.set(commandId)
		);
	}

	function doMove() {
		if (
			$toolState !== ToolState.move ||
			!$cursorDown ||
			$currentCommandId === null ||
			startPosition === null
		)
			return;
		$socket.emit('doMove', {
			offset: {
				x: $canvasCursorPosition.x - startPosition.x,
				y: $canvasCursorPosition.y - startPosition.y
			},
			commandId: $currentCommandId
		});
	}

	function stopDraw() {
		if ($cursorDown || $chosenTool !== ToolState.move) return;
		$currentCommandId = null;
	}
</script>

<MenuButton
	isActive={$toolState === ToolState.move}
	icon={Icons.move}
	on:click={() => {
		$toolState = ToolState.move;
	}}
></MenuButton>
