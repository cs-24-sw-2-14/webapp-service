<script lang="ts">
	import Logo from './Logo.svelte';
	import { otherUsers } from '$lib/stores/stateStore';
	import UserBubbles from '$lib/components/Navbar/UserBubbles.svelte';
	import SettingsModal from '../SettingsModal.svelte';
</script>

<!-- Navbar -->
<div class="fixed top-0 w-full h-14 bg-zinc-800">
	<!-- MagicBoard logo. TODO: Make clickable -->
	<Logo />

	<!-- Button to open settings -->
	<div class="p-2">
		<SettingsModal />
	</div>

	<!-- Who is online? -->
	<div class="fixed top-0 right-0 z-20 mt-2 mr-14">
		<UserBubbles otherUsers={$otherUsers} />
	</div>
</div>
