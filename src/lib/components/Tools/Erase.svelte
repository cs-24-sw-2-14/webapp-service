<script lang="ts">
	import MenuButton from '$lib/components/Navbar/MenuButton.svelte';
	import Icons from '$lib/icons/MenuIcons.json';
	import {
		toolState,
		canvasMousePosition,
		canvasMouseDown,
		canvasView,
		drawingsUnderCursor,
		socket,
		user
	} from '$lib/stores/stateStore';
	import { ToolState, type CanvasMousePosition } from '$lib/types';
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';

	const THRESHOLDDISTANCE = 10;

	let currentCommandId = writable<number | null>(null);

	onMount(() => {
		$socket.on('startEraseSuccess', (data) => {
			if (data.username !== $user.name) return;
			$currentCommandId = data.commandId;
		});
		canvasMouseDown.subscribe(startErase);
		canvasMousePosition.subscribe(doErase);
		canvasMouseDown.subscribe(stopErase);
	});

	// function getCursorFromThreshold(threshold: number) {
	// 	return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30"><circle cx="${threshold}" cy="${threshold}" r="${threshold}" /></svg>`;
	// }

	function mouseToSvgCoordinates(pos: CanvasMousePosition) {
		const tx = (pos.x - $canvasView.width / 2) / ($canvasView.scale / 100) + $canvasView.position.x;
		const ty =
			(pos.y - $canvasView.height / 2) / ($canvasView.scale / 100) + $canvasView.position.y;
		return { x: tx, y: ty };
	}

	function startErase() {
		if (
			!$canvasMouseDown ||
			$toolState !== ToolState.erase ||
			$drawingsUnderCursor.length === 0 ||
			$currentCommandId !== null
		)
			return;
		const { x, y } = mouseToSvgCoordinates($canvasMousePosition);
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
			!$canvasMouseDown ||
			$toolState !== ToolState.erase ||
			$drawingsUnderCursor.length === 0 ||
			$currentCommandId === null
		)
			return;
		const { x, y } = mouseToSvgCoordinates($canvasMousePosition);
		$socket.emit('doErase', {
			coordinate: { x: x, y: y },
			commandIds: $drawingsUnderCursor.map((drawingUnderCursor) => {
				return drawingUnderCursor.commandId;
			}),
			commandId: $currentCommandId
		});
	}

	function stopErase() {
		if ($canvasMouseDown || $toolState !== ToolState.erase) return;
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
