<script lang="ts">
	export let icon: string;
	export let isActive: boolean = false;
</script>

<div class:text-black={true}>
	<button
		on:click
		class:bg-gray-50={isActive}
		class:text-gray-50={!isActive}
		class="inline-flex items-center justify-center h-10 px-4 py-2 text-sm font-medium text-black transition-colors rounded-md focus-visible:outline-none hover:text-black hover:bg-gray-50"
	>
		{@html icon}
	</button>
</div>

<style>
	.icon-fill {
		fill: black;
	}
</style>
