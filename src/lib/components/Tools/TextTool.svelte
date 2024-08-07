<script lang="ts">
// Chosing the language of the file. 
    import TextInput from '../Input/TextInput.svelte';
    import MenuButton from '$lib/components/Navbar/MenuButton.svelte';
    import Icons from '$lib/icons/MenuIcons.json';
    import {
		    chosenTool,
		    cursorDown,
		    username, 
            canvasCursorPosition 
     } from '$lib/stores/stateStore';
    import { boardSocket } from '$lib/stores/socketioStore';
    import { ToolState, type CommandId } from '$lib/types';
    import { writable } from 'svelte/store';
    let currentCommandId = writable<number | null>(null);
 

    function contentChanged(){
        
     }
    

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
				updateText(commandId, '');
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

<TextInput
	title={$username}
	placeholder='Text'
    {contentChanged}
/>

<MenuButton
	isActive={$chosenTool === ToolState.text}
	icon={Icons.text}
	on:click={() => {
		$chosenTool = ToolState.text;
	}}
></MenuButton>
<!-- isActive is a boolean. Deafault is false. To check if user is active (has chosen the tool). --> 
<!-- icon --> 
<!--  --> 
<!--  --> 
