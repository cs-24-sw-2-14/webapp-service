<script lang="ts">
	import Logo from './Logo.svelte';
	import UserBubbles from '$lib/components/Navbar/UserBubbles.svelte';
	import SettingsModal from '../SettingsModal.svelte';

	import { boardId } from '$lib/stores/stateStore';
	let uiColor = `#${$boardId}`;
</script>

<!-- Navbar -->
<div class="fixed top-0 w-full h-14" style="background-color: {uiColor}">
	<!-- MagicBoard logo. Now clickable and navigates to the frontpage -->
	<a href="/">
		<Logo />
	</a>

	<!-- Button to open settings -->
	<div class="p-2">
		<SettingsModal />
	</div>

	<!-- Who is online? -->
	<div class="fixed top-0 right-0 z-20 mt-2 mr-14">
		<UserBubbles />
	</div>
</div>
