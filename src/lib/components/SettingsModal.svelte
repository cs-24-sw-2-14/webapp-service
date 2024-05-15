<script lang="ts">
	import UserModal from './UserModal.svelte';
	import { boardId, username } from '$lib/stores/stateStore';
	import { otherUsers } from '$lib/stores/socketioStore';
	import MenuButton from './Navbar/MenuButton.svelte';
	import Icons from '$lib/icons/MenuIcons.json';

	let dialog: HTMLDialogElement;

	function handleSubmit(username: string) {
		dialog.close();
		$username = username;
	}
</script>

<UserModal
	bind:dialog
	title="Settings"
	placeholder={$username}
	submitButtonName="Update"
	{handleSubmit}
	otherUsers={$otherUsers}
	boardId={$boardId}
	fieldDefaultValue={$username}
/>

<MenuButton
	on:click={() => {
		dialog.showModal();
	}}
	icon={Icons.settings}
></MenuButton>
