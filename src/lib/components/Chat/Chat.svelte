<script lang="ts">
	import Message from './Message.svelte';

	import { afterUpdate } from 'svelte';

	let messagesEnd: any;

	// Function to scroll to the bottom
	function scrollToBottom() {
		messagesEnd.scrollIntoView({ behavior: 'smooth' });
	}

	// Scroll to bottom whenever the component updates
	afterUpdate(scrollToBottom);
</script>

<div class="fixed bottom-0 right-0 mb-24 mr-4 rounded-lg bg-zinc-800 z-10 flex items-center gap-2">
	<div class="p-2 w-96" data-id="20">
		<div class="h-96 w-full bg-white mb-2 rounded-md overflow-y-auto">
			<Message></Message>
			<!-- Invisible element at the bottom of chat -->
			<div bind:this={messagesEnd}></div>
		</div>
		<form class="gap-2" data-id="21">
			<textarea
				class="w-full rounded-md border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground disabled:cursor-not-allowed flex-1 min-h-[40px] resize-none focus:ring-0 focus:outline-none focus:border-none"
				placeholder="Type a message"
				data-id="22"
			></textarea>
			<button class="w-full h-10 bg-red-500 hover:bg-red-600 rounded-md border border-zinc-800"
				>Send</button
			>
		</form>
	</div>
</div>
