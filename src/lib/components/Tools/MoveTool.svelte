<script lang="ts">
	import MenuButton from '$lib/components/Navbar/MenuButton.svelte';
	import Icons from '$lib/icons/MenuIcons.json';
	import {
		chosenTool,
		cursorDown,
		commandIdsUnderCursor,
		cursorPosition,
		username
	} from '$lib/stores/stateStore';
	import { boardSocket } from '$lib/stores/socketioStore';
	import { ToolState, type CanvasCoordinateSet, type CommandId } from '$lib/types';
	import { writable } from 'svelte/store';
	let currentCommandId = writable<number | null>(null);

	cursorDown.subscribe(startMove);
	cursorPosition.subscribe(doMove);
	cursorDown.subscribe(stopDraw);

	let startPosition: CanvasCoordinateSet | null = null;

	function startMove() {
		if (
			!$cursorDown ||
			$chosenTool !== ToolState.move ||
			$commandIdsUnderCursor.length === 0 ||
			$currentCommandId !== null
		)
			return;
		startPosition = $cursorPosition;
		$boardSocket?.emit(
			'startMove',
			{
				movedCommandId: $commandIdsUnderCursor[0],
				position: $cursorPosition,
				username: $username
			},
			(commandId: CommandId) => currentCommandId.set(commandId)
		);
	}

	function doMove() {
		if (
			!$cursorDown ||
			$chosenTool !== ToolState.move ||
			$currentCommandId === null ||
			startPosition === null
		)
			return;
		$boardSocket?.emit('doMove', {
			position: {
				x: $cursorPosition.x - startPosition.x,
				y: $cursorPosition.y - startPosition.y
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
	isActive={$chosenTool === ToolState.move}
	icon={Icons.move}
	on:click={() => {
		$chosenTool = ToolState.move;
	}}
></MenuButton>
