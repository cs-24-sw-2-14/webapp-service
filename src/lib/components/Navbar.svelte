<script lang="ts">
	import Logo from './Logo.svelte';
	import ToolbarButton from './ToolbarButton.svelte';
	import Icons from '$lib/icons/MenuIcons.json';
	import OnlineUsers from '$lib/components/OnlineUsers.svelte';
	import { settings } from '$lib/stores/stateStore';

	function handleSettingsClick() {
		settings.set(!$settings);
	}
</script>

<!-- Navbar -->
<div class="fixed top-0 w-full h-14 bg-zinc-800">
	<!-- MagicBoard logo -->
	<Logo />

	<!-- Button to open settings -->
	<div class="p-2">
		<ToolbarButton on:click={handleSettingsClick} icon={Icons.settings}></ToolbarButton>
	</div>

	<!-- Who is online? -->
	<div class="fixed top-0 right-0 z-20 mt-2 mr-14">
		<OnlineUsers />
	</div>
</div>
