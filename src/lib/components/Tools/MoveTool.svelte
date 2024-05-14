<script lang="ts">
	import MenuButton from '$lib/components/Navbar/MenuButton.svelte';
	import Icons from '$lib/icons/MenuIcons.json';
	import {
		toolState,
		canvasTouched,
		commandIdsUnderCursor,
		user,
		socket
	} from '$lib/stores/stateStore';
	import { ToolState, type CanvasCoordinate, type CommandId } from '$lib/types';
	import { writable } from 'svelte/store';
	let currentCommandId = writable<number | null>(null);

	user.subscribe(startMove);
	user.subscribe(doMove);
	canvasTouched.subscribe(stopDraw);

	let startPosition: CanvasCoordinate | null = null;

	function startMove() {
		if (
			!$canvasTouched ||
			$toolState !== ToolState.move ||
			$commandIdsUnderCursor.length === 0 ||
			$currentCommandId !== null
		)
			return;
		startPosition = $user.position;
		$socket.emit(
			'startMove',
			{
				movedCommandId: $commandIdsUnderCursor[0],
				position: $user.position,
				username: $user.name
			},
			(commandId: CommandId) => currentCommandId.set(commandId)
		);
	}

	function doMove() {
		if (
			!$canvasTouched ||
			$toolState !== ToolState.move ||
			$currentCommandId === null ||
			startPosition === null
		)
			return;
		$socket.emit('doMove', {
			position: {
				x: $user.position.x - startPosition.x,
				y: $user.position.y - startPosition.y
			},
			commandId: $currentCommandId
		});
	}

	function stopDraw() {
		if ($canvasTouched || $toolState !== ToolState.move) return;
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
