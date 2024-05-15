<script lang="ts">
	import MenuButton from '$lib/components/Navbar/MenuButton.svelte';
	import Icons from '$lib/icons/MenuIcons.json';
		canvasCursorPosition,
		cursorDown,
	import { writable } from 'svelte/store';
	import { ToolState, type CommandId } from '$lib/types';

	const STROKE_WIDTH = 7;
	let currentCommandId = writable<number | null>(null);

	canvasCursorPosition.subscribe(startDraw);
	canvasCursorPosition.subscribe(doDraw);
	cursorDown.subscribe(stopDraw);

	function startDraw() {
		if (!$cursorDown || $chosenTool !== ToolState.draw || $currentCommandId !== null) return;
		$socket.emit(
			'startDraw',
			{
				stroke: $user.drawColor,
				coordinate: $canvasCursorPosition,
				fill: 'transparent',
				strokeWidth: STROKE_WIDTH,
				username: $user.name
			},
			(commandId: CommandId) => currentCommandId.set(commandId)
		);
	}

	function doDraw() {
		if (!$cursorDown || $chosenTool !== ToolState.draw || $currentCommandId === null) return;
		$socket.emit('doDraw', {
			coordinate: $canvasCursorPosition,
			commandId: $currentCommandId
		});
	}

	function stopDraw() {
		if ($cursorDown || $chosenTool !== ToolState.draw) return;
		$currentCommandId = null;
	}
</script>

<MenuButton
	isActive={$toolState === ToolState.draw}
	icon={Icons.pencil}
	on:click={() => {
		$toolState = ToolState.draw;
	}}
></MenuButton>
