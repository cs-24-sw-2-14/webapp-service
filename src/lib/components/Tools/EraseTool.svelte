<script lang="ts">
	import MenuButton from '$lib/components/Navbar/MenuButton.svelte';
	import Icons from '$lib/icons/MenuIcons.json';
	import {
		toolState,
		canvasTouched,
		commandIdsUnderCursor,
		socket,
		user
	} from '$lib/stores/stateStore';
	import { ToolState, type CommandId } from '$lib/types';
	import { writable } from 'svelte/store';

	const THRESHOLD_DISTANCE = 10;

	let currentCommandId = writable<number | null>(null);

	user.subscribe(startErase);
	user.subscribe(doErase);
	canvasTouched.subscribe(stopErase);

	function startErase() {
		if (
			!$canvasTouched ||
			$toolState !== ToolState.erase ||
			$commandIdsUnderCursor.length === 0 ||
			$currentCommandId !== null
		)
			return;
		$socket.emit(
			'startErase',
			{
				coordinate: $user.position,
				commandIdsUnderCursor: $commandIdsUnderCursor,
				threshold: THRESHOLD_DISTANCE,
				username: $user.name
			},
			(commandId: CommandId) => currentCommandId.set(commandId)
		);
	}

	function doErase() {
		if (
			!$canvasTouched ||
			$toolState !== ToolState.erase ||
			$commandIdsUnderCursor.length === 0 ||
			$currentCommandId === null
		)
			return;
		$socket.emit('doErase', {
			coordinate: $user.position,
			commandIdsUnderCursor: $commandIdsUnderCursor,
			commandId: $currentCommandId
		});
	}

	function stopErase() {
		if ($canvasTouched || $toolState !== ToolState.erase) return;
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
