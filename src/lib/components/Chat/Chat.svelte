<script lang="ts">
	import Message from './Message.svelte';
	import { onMount } from 'svelte';
	import { boardId, user, viewChat } from '$lib/stores/stateStore';
	import { dbClient } from '$lib/db';

	let messagesEnd: HTMLDivElement;

	// Function to scroll to the bottom om the "message 'stack'"
	function scrollToBottom() {
		messagesEnd.scrollIntoView();
	}

	// To make sure the chat starts at the bottom when the component is mounted
	onMount(() => {
		scrollToBottom();
	});

	let textMessage = '';

	// Function that listens for new messages and scrolls to bottom if there is a new message
	async function liveUpdateScroll(boardId: string) {
		await dbClient.live(`chat_${boardId}`, () => {
			if ($viewChat) {
				setTimeout(() => {
					scrollToBottom();
				}, 100);
			}
		});
	}
	liveUpdateScroll($boardId);

	async function newMessage(boardId: string, text: string, username: string) {
		await dbClient.query(
			`CREATE chat_${boardId} SET text = "${text}", username = "${username}", epoch = time::unix(time::now()) * 1000, isNew = true`
		);
	}
</script>

<div class="fixed bottom-0 right-0 z-10 flex items-center gap-2 mb-24 mr-4 rounded-lg bg-zinc-800">
	<div class="p-2 w-96" data-id="20">
		<div class="w-full mb-2 overflow-y-auto bg-white rounded-md h-96">
			<Message></Message>
			<!-- Invisible element at the bottom of chat -->
			<div bind:this={messagesEnd}></div>
		</div>
		<form class="gap-2" data-id="21">
			<textarea
				class="w-full rounded-md border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground disabled:cursor-not-allowed flex-1 min-h-[40px] resize-none focus:ring-0 focus:outline-none focus:border-none"
				placeholder="Type a message"
				data-id="22"
				bind:value={textMessage}
			></textarea>
			<button
				class="w-full h-10 bg-red-500 border rounded-md hover:bg-red-600 border-zinc-800"
				on:click={() => {
					if (textMessage) {
						newMessage($boardId, `${textMessage.trim()}`, $user.name);
						textMessage = '';
					}

					setTimeout(() => {
						scrollToBottom();
					}, 100);
				}}>Send</button
			>
		</form>
	</div>
</div>
