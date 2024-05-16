<script lang="ts">
	import MenuButton from '$lib/components/Navbar/MenuButton.svelte';
	import Icons from '$lib/icons/MenuIcons.json';
	import { cursorDown, chosenTool, username, canvasCursorPosition } from '$lib/stores/stateStore';
	import { boardSocket } from '$lib/stores/socketioStore';
	import { ToolState } from '$lib/types';
	import { onMount } from 'svelte';
	import type { ToolSuccess } from '$lib/types';
	import { writable } from 'svelte/store';

	let currentCommandId = writable<number | null>(null);

	onMount(() => {
		if ($boardSocket === undefined) return;
		$boardSocket.on('startTextSuccess', (data: ToolSuccess) => {
			if (data.username !== $username) return;
			$currentCommandId = data.commandId;
			updateCurrentText('TEST');
		});
	});

	canvasCursorPosition.subscribe(startText);
	cursorDown.subscribe(startText);

	function startText() {
		if (!$cursorDown || $chosenTool !== ToolState.text || $currentCommandId !== null) return;
		$boardSocket.emit('startText', {
			placement: $user.position,
			username: $user.name
		});
	}

	function updateCurrentText(content: string) {
		$boardSocket.emit('doText', {
			content: content,
			commandId: $currentCommandId
		});
	}
</script>

<MenuButton
	isActive={$chosenTool === ToolState.text}
	icon={Icons.text}
	on:click={() => {
		$chosenTool = ToolState.text;
	}}
></MenuButton>
