<script lang="ts">
	import MenuButton from '$lib/components/Navbar/MenuButton.svelte';
	import Icons from '$lib/icons/MenuIcons.json';
	import {
		chosenTool,
		cursorDown,
		canvasCursorPosition,
		commandIdsUnderCursor,
		username
	} from '$lib/stores/stateStore';
	import { boardSocket } from '$lib/stores/socketioStore';
	import { ToolState, type CommandId } from '$lib/types';
	import { writable } from 'svelte/store';

	const THRESHOLD_DISTANCE = 10;

	let currentCommandId = writable<number | null>(null);
	let isErasing = false;

	cursorDown.subscribe(startErase);
	canvasCursorPosition.subscribe(doErase);
	cursorDown.subscribe(stopErase);

	function startErase() {
		if (
			!$cursorDown ||
			$chosenTool !== ToolState.erase ||
			$commandIdsUnderCursor.length === 0 ||
			$currentCommandId !== null ||
			isErasing
		)
			return;
		$boardSocket?.emit(
			'startErase',
			{
				position: $canvasCursorPosition,
				commandIdsUnderCursor: $commandIdsUnderCursor,
				threshold: THRESHOLD_DISTANCE,
				username: $username!
			},
			(commandId: CommandId) => currentCommandId.set(commandId)
		);
		isErasing = true;
	}

	function doErase() {
		if (
			!$cursorDown ||
			$chosenTool !== ToolState.erase ||
			$commandIdsUnderCursor.length === 0 ||
			$currentCommandId === null ||
			!isErasing
		)
			return;
		$boardSocket?.emit('doErase', {
			position: $canvasCursorPosition,
			commandIdsUnderCursor: $commandIdsUnderCursor,
			commandId: $currentCommandId
		});
	}

	function stopErase() {
		if ($cursorDown || $chosenTool !== ToolState.erase || !isErasing) return;
		$currentCommandId = null;
		isErasing = false;
	}
</script>

<MenuButton
	isActive={$chosenTool === ToolState.erase}
	icon={Icons.erase}
	on:click={() => {
		$chosenTool = ToolState.erase;
	}}
></MenuButton>
