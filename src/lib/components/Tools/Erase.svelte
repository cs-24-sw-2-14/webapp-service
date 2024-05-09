<script lang="ts">
	import MenuButton from '$lib/components/Navbar/MenuButton.svelte';
	import Icons from '$lib/icons/MenuIcons.json';
	import {
		toolState,
		cursorPosition,
		canvasTouched,
		canvasView,
		drawingsUnderCursor,
		socket,
		user
	} from '$lib/stores/stateStore';
	import { ToolState } from '$lib/types';
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';
	import { viewportToCanvasCoordinatesFromCanvasView } from '$lib/utils';

	const THRESHOLDDISTANCE = 10;

	let currentCommandId = writable<number | null>(null);

	onMount(() => {
		$socket.on('startEraseSuccess', (data) => {
			if (data.username !== $user.name) return;
			$currentCommandId = data.commandId;
		});
		canvasTouched.subscribe(startErase);
		cursorPosition.subscribe(doErase);
		canvasTouched.subscribe(stopErase);
	});

	function startErase() {
		if (
			!$canvasTouched ||
			$toolState !== ToolState.erase ||
			$drawingsUnderCursor.length === 0 ||
			$currentCommandId !== null
		)
			return;
		const { x, y } = viewportToCanvasCoordinatesFromCanvasView($cursorPosition, $canvasView);
		$socket.emit('startErase', {
			coordinate: { x: x, y: y },
			commandIds: $drawingsUnderCursor.map((drawingUnderCursor) => {
				return drawingUnderCursor.commandId;
			}),
			threshold: THRESHOLDDISTANCE,
			username: $user.name
		});
	}

	function doErase() {
		if (
			!$canvasTouched ||
			$toolState !== ToolState.erase ||
			$drawingsUnderCursor.length === 0 ||
			$currentCommandId === null
		)
			return;
		const { x, y } = viewportToCanvasCoordinatesFromCanvasView($cursorPosition, $canvasView);
		$socket.emit('doErase', {
			coordinate: { x: x, y: y },
			commandIds: $drawingsUnderCursor.map((drawingUnderCursor) => {
				return drawingUnderCursor.commandId;
			}),
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
