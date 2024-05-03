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
		class="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer backdrop-filter backdrop-blur-sm"
		on:click={() => {
			settings.set(!$settings);
		}}
	>
		<div
			class="w-1/3 max-w-lg p-6 rounded-lg shadow-lg cursor-default bg-zinc-800"
			on:click={handleModalContentClick}
		>
			<div class="flex justify-between">
				<!--It is used so h2 and the x-button is beside each other-->
				<!-- Modal content... -->
				<h2 class="mb-4 text-2xl font-semibold text-zinc-300">Settings</h2>
				<button
					class="w-8 h-8 -mt-2 -mr-2 font-semibold text-white hover:bg-red-600"
					on:click={() => {
						settings.set(!$settings);
					}}>X</button
				>
				<!-- when you hover over the button the background color changes to red 
					   on:click inverts the settings value and updates all settings-subscribers-->
			</div>
			<!-- ************************************************** -->
			<!-- Join Whiteboard Section -->
			<h2 class="mb-2 text-lg font-semibold text-zinc-300">Join an existing magicboard</h2>
			<div class="flex items-center justify-between space-x-2">
				<input
					type="text"
					id="code"
					bind:value={code}
					placeholder="Enter code"
					class="w-full p-2 border border-none rounded placeholder-zinc-300 bg-zinc-500 focus:outline-none focus:ring-0 focus:border-none text-zinc-300"
				/>
				<button
					class="w-24 px-4 py-2 bg-blue-500 rounded shadow hover:bg-blue-600"
					on:click={joinBoard}
				>
					Join
				</button>
			</div>

			<div class="h-[0.1rem] w-full bg-zinc-700 flex my-5 rounded mx-auto"></div>

			<!-- Create New Whiteboard Section -->
			<h2 class="mb-2 text-lg font-semibold text-zinc-300">Create a new magicboard</h2>
			<div>
				<button
					class="w-full px-4 py-2 bg-green-500 rounded shadow hover:bg-green-600"
					on:click={createNewBoard}
				>
					New MagicBoard
				</button>
			</div>

			<div class="h-[0.1rem] w-full bg-zinc-700 flex my-5 rounded mx-auto"></div>

			<!-- User Information Section -->
			<h2 class="mb-2 text-lg font-semibold text-zinc-300">User-customization</h2>
			<div>
				<div>
					<label for="username" class="font-bold text-zinc-300">Username:</label>
					<input
						type="text"
						id="username"
						bind:value={username}
						placeholder="Username"
						class="w-full p-2 mt-1 border border-none rounded placeholder-zinc-300 bg-zinc-500 focus:outline-none focus:ring-0 focus:border-none text-zinc-300"
					/>
				</div>

				<!-- Color Picker -->
				<ColorPicker></ColorPicker>

				<button
					class="w-full px-4 py-2 mt-4 bg-yellow-500 rounded shadow hover:bg-yellow-600"
					on:click={updateUserInfo}
				>
					Update Info
				</button>
			</div>
			<!-- ************************************************** -->
		</div>
	</div>
{/if}
