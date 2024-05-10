<script lang="ts">
	import MenuButton from '$lib/components/Navbar/MenuButton.svelte';
	import Icons from '$lib/icons/MenuIcons.json';
	import { toolState, canvasTouched, socket, user } from '$lib/stores/stateStore';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { ToolState, type ToolSuccess } from '$lib/types';

	const STROKE_WIDTH = 7;
	let currentCommandId = writable<number | null>(null);

	onMount(() => {
		if ($socket === undefined) return;
		$socket.on('startDrawSuccess', (data: ToolSuccess) => {
			if (data.username !== $user.name) return;
			$currentCommandId = data.commandId;
		});
	});

	user.subscribe(startDraw);
	user.subscribe(doDraw);
	canvasTouched.subscribe(stopDraw);

	function startDraw() {
		if (!$canvasTouched || $toolState !== ToolState.draw || $currentCommandId !== null) return;
		$socket.emit('startDraw', {
			placement: { x: 0, y: 0 }, // TODO: Mads, remove placement from backend. Rename path->coords.
			path: $user.position,
			stroke: $user.drawColor,
			fill: 'transparent',
			strokeWidth: STROKE_WIDTH,
			username: $user.name
		});
	}

	function doDraw() {
		if (!$canvasTouched || $toolState !== ToolState.draw || $currentCommandId === null) return;
		const { x, y } = $user.position;
		$socket.emit('doDraw', {
			x: x, // TODO: Det der X og Y er noget rod. Skal hedde coordinates. Mads.
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
