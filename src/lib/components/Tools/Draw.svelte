<script lang="ts">
	import MenuButton from '$lib/components/Navbar/MenuButton.svelte';
	import Icons from '$lib/icons/MenuIcons.json';
	import {
		toolState,
		canvasMousePosition,
		canvasMouseDown,
		canvasView
	} from '$lib/stores/stateStore';
	import type { CanvasMousePosition } from '$lib/stores/stateStore';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { socket } from '$lib/websocket';

	let currentCommandId = writable<number | null>(null);

	onMount(() => {
		socket.on('startDrawSuccess', (data) => {
			$currentCommandId = data.commandId;
		});
	});

	canvasMouseDown.subscribe(startDraw);
	canvasMousePosition.subscribe(doDraw);
	canvasMouseDown.subscribe(stopDraw);

	function mouseToSvgCoordinates(pos: CanvasMousePosition) {
		const tx = (pos.x - $canvasView.width / 2) / ($canvasView.scale / 100) + $canvasView.position.x;
		const ty =
			(pos.y - $canvasView.height / 2) / ($canvasView.scale / 100) + $canvasView.position.y;
		return { x: tx, y: ty };
	}

	function startDraw() {
		if (!$canvasMouseDown || $toolState !== ToolState.draw) return;
		const { x, y } = mouseToSvgCoordinates($canvasMousePosition);
		socket.emit('startDraw', {
			placement: { x: 0, y: 0 },
			path: { x: x, y: y },
			stroke: 'black',
			fill: 'transparent',
			strokeWidth: 7
		});
	}

	function doDraw() {
		if (!$canvasMouseDown || $toolState !== ToolState.draw || currentCommandId === null) return;
		const { x, y } = mouseToSvgCoordinates($canvasMousePosition);

		socket.emit('doDraw', {
			x: x,
			y: y
		});
	}

	function stopDraw() {
		if ($canvasMouseDown || $toolState !== ToolState.draw) return;
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
