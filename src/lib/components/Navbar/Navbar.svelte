<script lang="ts">
	import Logo from './Logo.svelte';
	import MenuButton from './MenuButton.svelte';
	import Icons from '$lib/icons/MenuIcons.json';
	import { settings, otherUsers } from '$lib/stores/stateStore';
	import UserBubbles from '$lib/components/Navbar/UserBubbles.svelte';

	function handleSettingsClick() {
		settings.set(!$settings);
	}
</script>

<!-- Navbar -->
<div class="fixed top-0 w-full h-14 bg-zinc-800">
	<!-- MagicBoard logo. TODO: Make clickable -->
	<Logo />

	<!-- Button to open settings -->
	<div class="p-2">
		<MenuButton on:click={handleSettingsClick} icon={Icons.settings}></MenuButton>
	</div>

	<!-- Who is online? -->
	<div class="fixed top-0 right-0 z-20 mt-2 mr-14">
		<UserBubbles otherUsers={$otherUsers} />
	</div>
</div>
