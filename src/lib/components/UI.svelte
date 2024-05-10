<script lang="ts">
	import Zoom from '$lib/components/Tools/Zoom.svelte';
	import BoardId from './BoardId.svelte';
	import Menu from './Menu.svelte';
	import ChatButton from './Chat/ChatButton.svelte';
	import Navbar from './Navbar/Navbar.svelte';
	import Chat from './Chat/Chat.svelte';

	import { viewChat } from '$lib/stores/stateStore';
	import SettingsModal from './SettingsModal.svelte';
	import PositionDisplay from './PositionDisplay.svelte';
</script>

<SettingsModal />

<Navbar></Navbar>

<PositionDisplay></PositionDisplay>

<BoardId></BoardId>

<Zoom></Zoom>

<Menu></Menu>

<ChatButton></ChatButton>

{#if $viewChat}
	<Chat></Chat>
{/if}
