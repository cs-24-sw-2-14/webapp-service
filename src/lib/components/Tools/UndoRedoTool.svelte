<script lang="ts">
	import MenuButton from '$lib/components/Navbar/MenuButton.svelte';
	import Icons from '$lib/icons/MenuIcons.json';
	import { username } from '$lib/stores/stateStore';
	import { socket } from '$lib/stores/socketioStore';

	function undo() {
		$socket.emit('undo', {
			username: $username
		});
	}
	function redo() {
		$socket.emit('redo', {
			username: $username
		});
	}
</script>

<MenuButton icon={Icons.undo} on:click={undo}></MenuButton>
<MenuButton icon={Icons.redo} on:click={redo}></MenuButton>
