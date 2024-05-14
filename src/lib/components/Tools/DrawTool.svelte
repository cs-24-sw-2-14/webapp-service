<script lang="ts">
	import MenuButton from '$lib/components/Navbar/MenuButton.svelte';
	import Icons from '$lib/icons/MenuIcons.json';
	import { toolState, canvasTouched, socket, user } from '$lib/stores/stateStore';
	import { writable } from 'svelte/store';
	import { ToolState, type CommandId } from '$lib/types';

	const STROKE_WIDTH = 7;
	let currentCommandId = writable<number | null>(null);

	user.subscribe(startDraw);
	user.subscribe(doDraw);
	canvasTouched.subscribe(stopDraw);

	function startDraw() {
		if (!$canvasTouched || $toolState !== ToolState.draw || $currentCommandId !== null) return;
		$socket.emit(
			'startDraw',
			{
				position: $user.position,
				stroke: $user.drawColor,
				fill: 'transparent',
				strokeWidth: STROKE_WIDTH,
				username: $user.name
			},
			(commandId: CommandId) => currentCommandId.set(commandId)
		);
	}

	function doDraw() {
		if (!$canvasTouched || $toolState !== ToolState.draw || $currentCommandId === null) return;
		$socket.emit('doDraw', {
			position: $user.position,
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
