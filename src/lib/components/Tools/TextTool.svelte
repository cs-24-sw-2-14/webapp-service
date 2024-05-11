<script lang="ts">
	import MenuButton from '$lib/components/Navbar/MenuButton.svelte';
	import Icons from '$lib/icons/MenuIcons.json';
	import { canvasTouched, socket, toolState, user } from '$lib/stores/stateStore';
	import { ToolState } from '$lib/types';
	import { onMount } from 'svelte';
	import type { ToolSuccess } from '$lib/types';
	import { writable } from 'svelte/store';

	let currentCommandId = writable<number | null>(null);

	onMount(() => {
		if ($socket === undefined) return;
		$socket.on('startTextSuccess', (data: ToolSuccess) => {
			if (data.username !== $user.name) return;
			$currentCommandId = data.commandId;
		});
	});

	user.subscribe(startText);
	canvasTouched.subscribe(startText);

	function startText(){
		if (!$canvasTouched || $toolState !== ToolState.text || $currentCommandId !== null) return;
		$socket.emit('startText', {
			coordinate: $user.position,
			content: "<empty>",
			username: $user.name,
		});
	}
	
	function updateCurrentText(content: string) {
		$socket.emit('doText', {
			content: content,
			commandId: $currentCommandId,
		});
	}
</script>

<MenuButton
	isActive={$toolState === ToolState.text}
	icon={Icons.text}
	on:click={() => {
		$toolState = ToolState.text;
	}}
></MenuButton>
