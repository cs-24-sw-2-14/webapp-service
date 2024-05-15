<script lang="ts">
	import UserModal from './UserModal.svelte';
	import { boardId, color, username } from '$lib/stores/stateStore';
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
