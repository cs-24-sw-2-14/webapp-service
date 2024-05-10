<script lang="ts">
	import MenuButton from '$lib/components/Navbar/MenuButton.svelte';
	import Icons from '$lib/icons/MenuIcons.json';
	import {
		toolState,
		canvasTouched,
		drawingsUnderCursor,
		socket,
		user
	} from '$lib/stores/stateStore';
	import { ToolState, type ToolSuccess } from '$lib/types';
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';

	const THRESHOLD_DISTANCE = 10;

	let currentCommandId = writable<number | null>(null);

	onMount(() => {
		$socket.on('startEraseSuccess', (data: ToolSuccess) => {
			if (data.username !== $user.name) return;
			$currentCommandId = data.commandId;
		});
		user.subscribe(startErase);
		user.subscribe(doErase);
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
		$socket.emit('startErase', {
			coordinate: $user.position,
			commandIds: $drawingsUnderCursor.map((drawingUnderCursor) => {
				return drawingUnderCursor.commandId;
			}),
			threshold: THRESHOLD_DISTANCE,
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
		$socket.emit('doErase', {
			coordinate: $user.position,
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
