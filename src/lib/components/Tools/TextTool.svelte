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
	let isTexting = false; 

	// canvasCursorPosition.subscribe(startText);
	cursorDown.subscribe(Call);
	cursorDown.subscribe(stopText);

	function submit(contentField: TextString) {
		$textString = contentField;
		//console.log($textString);
		console.log("Cursor position", $canvasCursorPosition);
		dialog.close();
		console.log("SVGs", $svgs);
	}

	function Call(){
		if (!$cursorDown || $chosenTool !== ToolState.text || $currentCommandId !== null) return;
		startText();
	}

	function startText() {
		if (!$cursorDown || $chosenTool !== ToolState.text || $currentCommandId !== null) return;
		isTexting = true; 

		const obj = {
			position: $canvasCursorPosition,
			username: $username!
		};

		console.log("StartText sent content", obj);

		$boardSocket?.emit(
			'startText',
			obj,
			(commandId: CommandId) => {
				$currentCommandId = commandId;
				console.log("Received ACK for Text", $currentCommandId);
				updateText($currentCommandId!, $textString!);
			}
		);
	}

	function updateText(commandId: CommandId, content: string) {
		const obj = {
			content: content,
			commandId: commandId
		};

		$boardSocket?.emit('doText', obj);
		console.log("UpdateText sent content", obj);
	}

	function stopText() {
		if ($cursorDown || $chosenTool !== ToolState.text || !isTexting) return;
		$currentCommandId = null;
		isTexting = false;
		console.log('Tjek when stopText kører'); 
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
