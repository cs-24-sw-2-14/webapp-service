<script lang="ts">
	import Zoom from '$lib/components/Tools/Zoom.svelte';
	import ServerId from './ServerId.svelte';
	import Menu from './Toolbar.svelte';
	import ChatButton from './Chat/ChatButton.svelte';
	import Navbar from './Navbar/Navbar.svelte';
	import Chat from './Chat/Chat.svelte';

	import { viewChat } from '$lib/stores/stateStore';
	import SettingsModal from './SettingsModal.svelte';
	import { settings } from '$lib/stores/stateStore';
	import Coordinates from './Coordinates.svelte';
</script>

<SettingsModal showModal={$settings}></SettingsModal>

<Navbar></Navbar>

<Coordinates></Coordinates>

<ServerId></ServerId>

<Zoom></Zoom>

<Menu></Menu>

<ChatButton></ChatButton>

{#if $viewChat}
	<Chat></Chat>
{/if}
