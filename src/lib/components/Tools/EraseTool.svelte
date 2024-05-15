<script lang="ts">
	import MenuButton from '$lib/components/Navbar/MenuButton.svelte';
	import Icons from '$lib/icons/MenuIcons.json';
	import {
		toolState,
		cursorDown,
		canvasCursorPosition,
		commandIdsUnderCursor,
		socket,
		user
	} from '$lib/stores/stateStore';
	import { ToolState, type CommandId } from '$lib/types';
	import { writable } from 'svelte/store';

	const THRESHOLD_DISTANCE = 10;

	let currentCommandId = writable<number | null>(null);

	cursorDown.subscribe(startErase);
	canvasCursorPosition.subscribe(doErase);
	cursorDown.subscribe(stopErase);

	function startErase() {
		if (
			$toolState !== ToolState.erase ||
			!$cursorDown ||
			$commandIdsUnderCursor.length === 0 ||
			$currentCommandId !== null
		)
			return;
		$socket.emit(
			'startErase',
			{
				position: $user.position,
				coordinate: $canvasCursorPosition,
				commandIdsUnderCursor: $commandIdsUnderCursor,
				threshold: THRESHOLD_DISTANCE,
				username: $user.name
			},
			(commandId: CommandId) => currentCommandId.set(commandId)
		);
	}

	function doErase() {
		if (
			$toolState !== ToolState.erase ||
			!$cursorDown ||
			$commandIdsUnderCursor.length === 0 ||
			$currentCommandId === null
		)
			return;
		$socket.emit('doErase', {
			coordinate: $canvasCursorPosition,
			commandIdsUnderCursor: $commandIdsUnderCursor,
			commandId: $currentCommandId
		});
	}

	function stopErase() {
		if ($cursorDown || $chosenTool !== ToolState.erase) return;
		$currentCommandId = null;
	}
</script>

<MenuButton
	isActive={$toolState === ToolState.erase}
	icon={Icons.erase}
	on:click={() => {
		$toolState = ToolState.erase;
	}}
></MenuButton>
