<script lang="ts">
	import MenuButton from '$lib/components/Navbar/MenuButton.svelte';
	import Icons from '$lib/icons/MenuIcons.json';
	import Ping from './Ping.svelte';
	import { chatMessages, boardId, isNewMessage, viewChat } from '$lib/stores/stateStore';
	import { dbClient } from '$lib/db';

	// Function to show and hide chat
	function handleChatButton() {
		$isNewMessage = false;
		viewChat.update((currentValue) => !currentValue);

		// When chat gets closed, then all messages gets marked as "read" (isNew = false)
		if (!$viewChat) {
			$chatMessages.forEach((message) => {
				message.isNew = false;
			});
		}
	}

	// Fetch all messages from database
	async function getAllMessages(boardId: string) {
		const messages = await dbClient.query(`SELECT * FROM chat_${boardId} ORDER BY epoch`);
		chatMessages.set(...messages);
	}

	// If any new message, add the message to the chatMessages store abd update isNewMessage so that the "ping" gets displayed, meaning new message
	async function liveMessages(boardId: string) {
		await dbClient.live(`chat_${boardId}`, (action, newMessage) => {
			if (action === 'CLOSE') return;
			chatMessages.update((oldMessages) => [...oldMessages, newMessage]);
			$isNewMessage = true;
			return newMessage;
		});
	}

	getAllMessages($boardId);
	liveMessages($boardId);
</script>

<!-- Button for opening and closing chat -->
<div class="fixed bottom-0 right-0 z-10 flex items-center gap-2 p-2 m-4 rounded-lg bg-zinc-800">
	<MenuButton isActive={$viewChat} icon={Icons.chat} on:click={handleChatButton}></MenuButton>
</div>

<!-- Small ping to indicate a new message -->
{#if $isNewMessage && !$viewChat}
	<Ping></Ping>
{/if}
