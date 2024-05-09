<script lang="ts">
	import MenuButton from '$lib/components/Navbar/MenuButton.svelte';
	import Icons from '$lib/icons/MenuIcons.json';
	import {
		toolState,
		canvasTouched,
		socket,
		chosenColor,
		user
	} from '$lib/stores/stateStore';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { ToolState } from '$lib/types';
	import { viewportToCanvasCoordinatesFromCanvasView } from '$lib/utils';

	let currentCommandId = writable<number | null>(null);

	onMount(() => {
		$socket.on('startDrawSuccess', (data) => {
			if (data.username !== $user.name) return;
			$currentCommandId = data.commandId;
		});
	});

	user.subscribe(startDraw);
	user.subscribe(doDraw);
	canvasMouseDown.subscribe(stopDraw);

	function startDraw() {
		if (!$canvasMouseDown || $toolState !== ToolState.draw || $currentCommandId !== null) return;
		const { x, y } = $user.cursorPosition;
		$socket.emit('startDraw', {
			placement: { x: 0, y: 0 },
			path: { x: x, y: y },
			stroke: $chosenColor,
			fill: 'transparent',
			strokeWidth: 7,
			username: $user.name
		});
	}

	function doDraw() {
		if (!$canvasMouseDown || $toolState !== ToolState.draw || $currentCommandId === null) return;
		const { x, y } = $user.cursorPosition;
		$socket.emit('doDraw', {
			x: x,
			y: y,
			commandId: $currentCommandId
		});
	}

	function stopDraw() {
		if ($canvasTouched || $toolState !== ToolState.draw) return;
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
