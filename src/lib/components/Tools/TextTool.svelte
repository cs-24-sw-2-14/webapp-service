<script lang="ts">
	import MenuButton from '$lib/components/Navbar/MenuButton.svelte';
	import Icons from '$lib/icons/MenuIcons.json';
	import { cursorDown, chosenTool, username, canvasCursorPosition } from '$lib/stores/stateStore';
	import { boardSocket } from '$lib/stores/socketioStore';
	import { ToolState } from '$lib/types';
	import type { CommandId } from '$lib/types';
	import { writable } from 'svelte/store';

	let currentCommandId = writable<number | null>(null);


	canvasCursorPosition.subscribe(startText);
	cursorDown.subscribe(startText);

	function startText() {
		if (!$cursorDown || $chosenTool !== ToolState.text || $currentCommandId !== null) return;
		$boardSocket?.emit(
			'startText',
			{
				position: $canvasCursorPosition,
				username: $username!
			},
			(commandId: CommandId) => {
				$currentCommandId = commandId;
				updateText(commandId, 'TEST');
			}
		);
	}

	function updateText(commandId: CommandId, content: string) {
		$boardSocket?.emit('doText', {
			content: content,
			commandId: commandId
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
