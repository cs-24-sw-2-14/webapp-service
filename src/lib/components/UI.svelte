<script lang="ts">
	import ZoomTool from '$lib/components/Tools/ZoomTool.svelte';
	import BoardId from './BoardId.svelte';
	import Toolbar from './Toolbar.svelte';
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

<ZoomTool></ZoomTool>

<Toolbar></Toolbar>

<ChatButton></ChatButton>

{#if $viewChat}
	<Chat></Chat>
{/if}
