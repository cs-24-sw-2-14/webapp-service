<script lang="ts">
	import { checkHexa } from '$lib/ts/checkHexa';

	let inputfield: string = '';

	let color: string;
	let boardCheckerEndpointUrl =
		'https://64.227.121.226:1337/v1/board/czech_uid?board_uid={inputfield}';
	$: {
		inputfield = inputfield.toUpperCase();
		if (!checkHexa(inputfield)) {
			inputfield = inputfield.slice(0, -1);
		}
		if (inputfield.length > 6) {
			inputfield = inputfield.slice(0, -1);
		}

		color = boardExists() === true ? 'green-500' : 'red-500';
	}

	function redirect() {
		let url: string = window.location.href;

		if (inputfield.length == 6) {
			url += inputfield;

			window.location.replace(url);
		}
	}

	async function boardExists() {
		try {
			const response = await fetch(boardCheckerEndpointUrl);
			if (!response.ok) {
				throw new Error(`unable to fetch boardCheckerEndpointUrl`);
			}

			const data = await response.json();
			console.log(data.completed);
			return data.completed;
		} catch (error) {
			console.error('Some Error Occured:', error);
		}
	}
</script>

<link
	href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
	rel="stylesheet"
/>

<main>
	<div class="mid-box">
		<div style="transform: translateY(-15px);">
			<h1 style="font-size: 4.6rem;">Welcome</h1>
			<h1 style="transform: translateY(-20px);">to MagicBoard!</h1>
			<div class="inner-box">
				<button id="create-button" class="button">Create Board</button>
			</div>
			<div class="inner-box-code">
				<div class="flex flex-col justify-center w-96" style="font-family: 'Roboto', sans-serif">
					<p class="mt-6 text-lg font-bold text-center text-gray-800">Insert Code to Join Board</p>
					<input
						bind:value={inputfield}
						class="h-8 px-4 py-6 border-2 rounded-md w-96 border-slate-200"
						placeholder="Insert code"
					/>
					<div class="w-8 h-8 bg-{color}"></div>

					<button id="join-button" class="w-10 button" on:click={redirect}> Join Board</button>
				</div>
			</div>
		</div>
	</div>
</main>

<style>
	main {
		display: flex; /* Establishes a flex container */
		justify-content: center; /* Centers children horizontally in the container */
		align-items: center; /* Centers children vertically in the container */
		min-height: 100vh; /* Ensures the <main> element covers the viewport height */
	}

	.mid-box {
		display: flex;
		border-radius: 6px;
		flex-direction: column;
		justify-content: flex-start; /* Aligns children to the start, keeping the header at the top */
		align-items: center; /* Centers children horizontally */
		width: 485px;
		height: 430px;
		background-color: #e6e6e6;
		padding: 20px; /* Adds some spacing inside the box */
		box-sizing: border-box; /* Ensures padding is included in the width/height calculations */
	}

	.content {
		flex-grow: 1; /* Allows this div to take up the remaining space */
		display: flex;
		justify-content: center; /* Center content horizontally */
		align-items: center; /* Center content vertically */
		width: 100%; /* Takes the full width of the parent */
	}

	h1 {
		/* Style header */
		font-size: 2.75rem;
		width: 100%; /* Ensure the header spans the width of the box */
		text-align: center; /* Center the header text */
		margin-top: 0; /* Adjust spacing as needed */
		font-weight: bold;
	}
	.button {
		padding: 12px 65px;
		font-size: 1.29rem;
		text-align: center;
		box-sizing: border-box;
		width: 100%;
		border-radius: 4px;
		outline: 1.5px solid#283747;
		font-weight: bold;
		color: #595959;
		word-spacing: 2px;
		letter-spacing: 0.6px;
	}

	#create-button {
		/* Style button */
		background-color: #5ba4fc;
	}

	#join-button {
		background-color: #53d769;
		width: 200px;
		height: 50px;
		padding: 0;
		margin: 8px auto;
	}
</style>
