<script lang="ts">
	import UserModal from './UserModal.svelte';
	import { boardId, color, username } from '$lib/stores/stateStore';
	import MenuButton from './Navbar/MenuButton.svelte';
	import Icons from '$lib/icons/MenuIcons.json';
	import { boardSocket, connectToBoardSocket } from '$lib/stores/socketioStore';
	import type { Color, Username } from '$lib/types';

	let dialog: HTMLDialogElement;

	function handleSubmit(username: Username, color: Color) {
		$boardSocket?.disconnect();
		connectToBoardSocket(username, color, $boardId!, function onSuccess() {
			dialog.close();
			$username = username;
			$color = color;
		});
	}
</script>

<UserModal
	bind:dialog
	title="Settings"
	placeholder={$username}
	submitButtonName="Update"
	{handleSubmit}
	boardId={$boardId}
	fieldDefaultValue={$username ?? ''}
	colorPicked={$color}
/>

<MenuButton
	on:click={() => {
		dialog.showModal();
	}}
	icon={Icons.settings}
></MenuButton>
