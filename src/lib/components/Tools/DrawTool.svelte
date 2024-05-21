<script lang="ts">
	import MenuButton from '$lib/components/Navbar/MenuButton.svelte';
	import Icons from '$lib/icons/MenuIcons.json';
	import {
		chosenTool,
		drawColor,
		canvasCursorPosition,
		cursorDown,
		username
	} from '$lib/stores/stateStore';
	import { boardSocket } from '$lib/stores/socketioStore';
	import { writable } from 'svelte/store';
	import { ToolState, type CommandId } from '$lib/types';

	const STROKE_WIDTH = 7;
	let currentCommandId = writable<number | null>(null);
	let isDrawing = false;

	canvasCursorPosition.subscribe(startDraw);
	canvasCursorPosition.subscribe(doDraw);
	cursorDown.subscribe(stopDraw);

	function startDraw() {
		if (!$cursorDown || $chosenTool !== ToolState.draw || isDrawing) return;
		isDrawing = true;
		$boardSocket?.emit(
			'startDraw',
			{
				position: $canvasCursorPosition,
				stroke: $drawColor,
				fill: 'transparent',
				strokeWidth: STROKE_WIDTH,
				username: $username!
			},
			(commandId: CommandId) => currentCommandId.set(commandId)
		);
	}

	function doDraw() {
		if (
			!$cursorDown ||
			$chosenTool !== ToolState.draw ||
			$currentCommandId === null ||
			!isDrawing
		) {
			return;
		}
		$boardSocket?.volatile.emit('doDraw', {
			position: $canvasCursorPosition,
			commandId: $currentCommandId
		});
	}

	function stopDraw() {
		if ($cursorDown || $chosenTool !== ToolState.draw || !isDrawing) return;
		$currentCommandId = null;
		isDrawing = false;
	}
</script>

<MenuButton
	isActive={$chosenTool === ToolState.draw}
	icon={Icons.pencil}
	on:click={() => {
		$chosenTool = ToolState.draw;
	}}
></MenuButton>
