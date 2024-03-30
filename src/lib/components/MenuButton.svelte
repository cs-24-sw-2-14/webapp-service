<script lang="ts">
	export let icon: string;
	export let isActive: boolean = false;
</script>

<button
	on:click
	class:bg-gray-50={isActive}
	class:text-black={isActive}
	class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 text-gray-50 hover:text-black hover:bg-gray-50"
>
	{@html icon}
</button>
