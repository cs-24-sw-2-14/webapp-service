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
	import { svgs } from '$lib/stores/socketioStore';

	let dialog: HTMLDialogElement;
	let currentCommandId = writable<number | null>(null);

	function submit(textString: TextString) {
		$textString = textString;
		console.log($textString);
		console.log($canvasCursorPosition);
		dialog.close();
		console.log($svgs);

		// canvasCursorPosition.subscribe(startText);
		cursorDown.subscribe(Call);
	}

	function Call(){
		if (!$cursorDown || $chosenTool !== ToolState.text || $currentCommandId !== null) return;
		startText();
		updateText($currentCommandId!, 'tjek');
	}

	function startText() {
		if (!$cursorDown || $chosenTool !== ToolState.text || $currentCommandId !== null) return;
		console.log($canvasCursorPosition);
		$boardSocket?.emit(
			'startText',
			{
				position: $canvasCursorPosition,
				username: $username!
			},
			(commandId: CommandId) => {
				$currentCommandId = commandId;
				console.log($textString);
			}
		);
	}

	function updateText(commandId: CommandId, content: string) {
		$boardSocket?.emit('doText', {
			content: content,
			commandId: commandId
		});
		console.log(content);
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
