<script lang="ts">
	import { chatMessages } from '$lib/stores/stateStore';
</script>

{#each $chatMessages as message}
	<div class="items-start mx-2 my-2" data-id="3">
		<div
			class={`p-4 text-sm bg-gray-100 border-l-[2px] rounded-lg dark:bg-gray-100 ${message.isNew ? 'border-red-400' : ''}`}
			data-id="4"
		>
			<div class="font-semibold" data-id="5">{message.username}</div>
			{message.text}
		</div>
	</div>
{/each}
