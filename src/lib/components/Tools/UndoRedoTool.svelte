<script lang="ts">
	import MenuButton from '$lib/components/Navbar/MenuButton.svelte';
	import Icons from '$lib/icons/MenuIcons.json';
	import { username } from '$lib/stores/stateStore';
	import { boardSocket } from '$lib/stores/socketioStore';

	function undo() {
		$boardSocket?.emit('undo', {
			username: $username!
		});
	}
	function redo() {
		$boardSocket?.emit('redo', {
			username: $username!
		});
	}
</script>

<MenuButton icon={Icons.undo} on:click={undo}></MenuButton>
<MenuButton icon={Icons.redo} on:click={redo}></MenuButton>
