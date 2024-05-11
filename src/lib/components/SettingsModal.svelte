<script lang="ts">
	import UserModal from './UserModal.svelte';
	import { user } from '$lib/stores/stateStore';
	import MenuButton from './Navbar/MenuButton.svelte';
	import Icons from '$lib/icons/MenuIcons.json';

	let dialog: HTMLDialogElement;

	function handleSubmit(username: string) {
		dialog.close();
		$user.name = username;
	}
</script>

<UserModal
	bind:dialog
	title="Settings"
	placeholder={$user.name}
	submitButtonName="Update"
	{handleSubmit}
/>

<MenuButton
	on:click={() => {
		dialog.showModal();
	}}
	icon={Icons.settings}
></MenuButton>
