<script lang="ts">
	import MenuButton from '$lib/components/Navbar/MenuButton.svelte';
	import Icons from '$lib/icons/MenuIcons.json';
	import { user, socket } from '$lib/stores/stateStore';

	function undo() {
		$socket.emit('undo', {
			username: $user.name
		});
	}
	function redo() {
		$socket.emit('redo', {
			username: $user.name
		});
	}
</script>

<MenuButton icon={Icons.undo} on:click={undo}></MenuButton>
<MenuButton icon={Icons.redo} on:click={redo}></MenuButton>
