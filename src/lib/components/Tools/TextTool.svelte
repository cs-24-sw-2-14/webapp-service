<script lang="ts">
	// Chosing the language of the file.
	import TextModal from '../Input/TextModal.svelte';
	import MenuButton from '$lib/components/Navbar/MenuButton.svelte';
	import Icons from '$lib/icons/MenuIcons.json';
	import { chosenTool, cursorDown, username, canvasCursorPosition } from '$lib/stores/stateStore';
	import { boardSocket } from '$lib/stores/socketioStore';
	import { ToolState, type CommandId, type TextString } from '$lib/types';
	import { writable } from 'svelte/store';
	import { textString } from '$lib/stores/stateStore';

	let dialog: HTMLDialogElement;
	let currentCommandId = writable<number | null>(null);
	let isTexting = false; 

	cursorDown.subscribe(startText);
	cursorDown.subscribe(stopText);

	function submit(contentField: TextString) {
		$textString = contentField;
		dialog.close();
	}

	function startText() {
		if (!$cursorDown || $chosenTool !== ToolState.text || $currentCommandId !== null) return;
		isTexting = true; 
		$boardSocket?.emit(
			'startText',
			{
			position: $canvasCursorPosition,
			username: $username!
			},
			(commandId: CommandId) => {
				$currentCommandId = commandId;
				updateText($currentCommandId!, $textString!);
			}
		);
	}

	function updateText(commandId: CommandId, content: string) {
		$boardSocket?.emit('doText', {
			content: content,
			commandId: commandId
		});
	}

	function stopText() {
		if ($cursorDown || $chosenTool !== ToolState.text || !isTexting) return;
		$currentCommandId = null;
		isTexting = false; 
	}
</script>

<TextModal
	bind:dialog
	title={'Text to put on canvas'}
	placeholder="Text"
	{submit}
	contentField={$textString ?? ''}
/>

<MenuButton
	isActive={$chosenTool === ToolState.text}
	icon={Icons.text}
	on:click={() => {
		$chosenTool = ToolState.text;
		dialog.showModal();
	}}
></MenuButton>
<!-- isActive is a boolean. Deafault is false. To check if user is active (has chosen the tool). -->
<!-- icon -->
<!--  -->
<!--  -->
