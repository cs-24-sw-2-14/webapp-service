<script lang="ts">
	import { user, onlineUsers, currentPage, Page } from '$lib/stores/stateStore';
	import ColorPicker from './Input/ColorPicker.svelte';

	let username = '';

	function handleInputChange() {
		if (findUser(username)) return;
		$user.name = username;
	}

	function findUser(username: string) {
		return $onlineUsers.find((user) => user.name === username);
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<main>
	<div class="fixed inset-0 backdrop-filter flex justify-center items-center z-20">
		<div class="bg-zinc-800 p-6 rounded-lg shadow-lg w-1/3 cursor-default max-w-lg">
			<div>
				<!-- Modal content... -->
				<h2 class="text-3xl font-semibold mb-4 text-zinc-300 text-center">
					Pick username and color
				</h2>
			</div>
			<!-- ************************************************** -->

			<div class="h-[0.1rem] w-full bg-zinc-700 flex my-5 rounded mx-auto"></div>

			<!-- User Information Section -->
			<div>
				<div>
					<input
						type="text"
						id="username"
						bind:value={username}
						on:change={handleInputChange}
						placeholder="Username"
						class="mt-1 p-2 border rounded w-full placeholder-zinc-300 bg-zinc-500 border-none focus:outline-none focus:ring-0 focus:border-none text-zinc-300"
					/>
				</div>

				<!-- Color Picker -->
				<ColorPicker></ColorPicker>

				<button
					class="mt-4 px-4 py-2 bg-yellow-500 rounded shadow hover:bg-yellow-600 w-full"
					disabled={$user.color === null || $user.name === ''}
					on:click={() => ($currentPage = Page.CanvasPage)}
				>
					Continue
				</button>
			</div>
			<!-- ************************************************** -->
		</div>
	</div>
</main>

<style>
	main {
		display: flex; /* Establishes a flex container */
		/*flex-direction: column;*/
		justify-content: center; /* Centers children horizontally in the container */
		align-items: center; /* Centers children vertically in the container */
		min-height: 100vh; /* Ensures the <main> element covers the viewport height */
		background-image: radial-gradient(#b561ff 25%, #9ef2ff 100%);
		/*It makes the background have a radial gradient in the chosen colors*/
		cursor: default;
	}

	:disabled {
		background-color: #525252;
	}
</style>
