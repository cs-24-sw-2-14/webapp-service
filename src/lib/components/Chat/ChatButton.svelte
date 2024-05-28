<script lang="ts">
	import MenuButton from '$lib/components/Navbar/MenuButton.svelte';
	import Icons from '$lib/icons/MenuIcons.json';
	import Ping from './Ping.svelte';

	import { viewChat } from '$lib/stores/stateStore';

	function handleChatButton() {
		viewChat.update((currentValue) => !currentValue);
	}
</script>

<!-- Button for opening and closing chat -->
<div class="fixed bottom-0 right-0 m-4 rounded-lg bg-zinc-800 z-10 flex items-center gap-2 p-2">
	<MenuButton isActive={$viewChat} icon={Icons.chat} on:click={handleChatButton}></MenuButton>
</div>

<!-- Small ping to indicate a new message -->
<Ping></Ping>
