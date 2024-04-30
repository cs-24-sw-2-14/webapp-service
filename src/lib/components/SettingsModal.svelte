<script lang="ts">
	import { settings } from '$lib/stores/stateStore';
	import ColorPicker from './Input/ColorPicker.svelte';
	export let showModal = $settings;

	let code = '';
	let username = '';

	// Function to handle modal content click
	function handleModalContentClick(event: MouseEvent) {
		event.stopPropagation(); // Prevent click event from propagating to the parent
	}

	function joinBoard() {
		// Logic to join an existing whiteboard using the code
	}

	function createNewBoard() {
		// Logic to create a new whiteboard
	}

	function updateUserInfo() {
		// Logic to update user information
	}
</script>

{#if showModal}
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		class="fixed inset-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm flex justify-center items-center z-20 cursor-pointer"
		on:click={() => {
			settings.set(!$settings);
		}}
	>
		<div
			class="bg-zinc-800 p-6 rounded-lg shadow-lg w-1/3 cursor-default max-w-lg"
			on:click={handleModalContentClick}
		>
			<!-- Modal content... -->
			<h2 class="text-2xl font-semibold mb-4 text-zinc-300">Settings</h2>

			<!-- ************************************************** -->
			<!-- Join Whiteboard Section -->
			<h2 class="text-lg font-semibold mb-2 text-zinc-300">Join an existing magicboard</h2>
			<div class="flex justify-between items-center space-x-2">
				<input
					type="text"
					id="code"
					bind:value={code}
					placeholder="Enter code"
					class="placeholder-zinc-300 p-2 border rounded w-full bg-zinc-500 border-none focus:outline-none focus:ring-0 focus:border-none text-zinc-300"
				/>
				<button
					class="px-4 py-2 w-24 bg-blue-500 rounded shadow hover:bg-blue-600"
					on:click={joinBoard}
				>
					Join
				</button>
			</div>

			<div class="h-[0.1rem] w-full bg-zinc-700 flex my-5 rounded mx-auto"></div>

			<!-- Create New Whiteboard Section -->
			<h2 class="text-lg font-semibold mb-2 text-zinc-300">Create a new magicboard</h2>
			<div>
				<button
					class="px-4 py-2 bg-green-500 rounded shadow hover:bg-green-600 w-full"
					on:click={createNewBoard}
				>
					New MagicBoard
				</button>
			</div>

			<div class="h-[0.1rem] w-full bg-zinc-700 flex my-5 rounded mx-auto"></div>

			<!-- User Information Section -->
			<h2 class="text-lg font-semibold mb-2 text-zinc-300">User-customization</h2>
			<div>
				<div>
					<label for="username" class="font-bold text-zinc-300">Username:</label>
					<input
						type="text"
						id="username"
						bind:value={username}
						placeholder="Username"
						class="mt-1 p-2 border rounded w-full placeholder-zinc-300 bg-zinc-500 border-none focus:outline-none focus:ring-0 focus:border-none text-zinc-300"
					/>
				</div>

				<!-- Color Picker -->
				<ColorPicker></ColorPicker>

				<button
					class="mt-4 px-4 py-2 bg-yellow-500 rounded shadow hover:bg-yellow-600 w-full"
					on:click={updateUserInfo}
				>
					Update Info
				</button>
			</div>
			<!-- ************************************************** -->
		</div>
	</div>
{/if}
