<script lang="ts">
	import Logo from './Logo.svelte';
	import MenuButton from './MenuButton.svelte';
	import Icons from '$lib/icons/MenuIcons.json';
	import OnlineUsers from '$lib/components/OnlineUsers.svelte';
	import { settings } from '$lib/stores/stateStore';
	import type { OnlineUser } from '$lib/stores/stateStore';
	import { onlineUsers } from '$lib/stores/stateStore';
	
	onlineUsers.update((current: OnlineUser[])=> {
		return [
		{ name: 'Elma Vukicevic', color: 'bg-blue-500', border: 'border-blue-800' },
		{ name: 'Amalie Jensen', color: 'bg-red-500', border: 'border-red-800' },
		{ name: 'Cecilie Lassen', color: 'bg-green-500', border: 'border-green-800' },
		{ name: 'Kresten Sckerl', color: 'bg-orange-500', border: 'border-orange-800' },
		{ name: 'Mads Fagerlund', color: 'bg-purple-500', border: 'border-purple-800' },
		{ name: 'Marc Nygaard', color: 'bg-pink-500', border: 'border-pink-800' },
		{ name: 'Thorbjørn Larsen', color: 'bg-yellow-500', border: 'border-yellow-800' }
	];
	})

	

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
		<MenuButton on:click={handleSettingsClick} icon={Icons.settings}></MenuButton>
	</div>

	<!-- Who is online? -->
	<div class="fixed top-0 right-0 z-20 mt-2 mr-14">
		<OnlineUsers />
	</div>
</div>
