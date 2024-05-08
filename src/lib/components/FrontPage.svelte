<script lang="ts">
	import { checkHexa } from '$lib/ts/checkHexa';

	let boardIdInput = '';
	const backendEndpoint: string = 'http://localhost:5123';

	$: {
		boardIdInput = boardIdInput.toUpperCase();
		if (!checkHexa(boardIdInput)) {
			boardIdInput = boardIdInput.slice(0, -1);
		}
		if (boardIdInput.length > 6) {
			boardIdInput = boardIdInput.slice(0, -1);
		}
	}

	async function validateBoard() {
		if (boardIdInput.length !== 6) return;

		try {
			const response = await fetch(backendEndpoint + '/v1/board/validate', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ boardId: boardIdInput })
			});

			if (response.ok) {
				window.location.replace(window.location.href + boardIdInput);
			}
		} catch (error) {
			console.error('Request Error:', error);
		}
	}

	async function createBoard() {
		try {
			const response = await fetch(backendEndpoint + '/v1/board/create', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (response.ok) {
				let body = await response.json();
				window.location.replace(window.location.href + body.boardId);
			}
		} catch (error) {
			console.error('Request Error:', error);
		}
	}
</script>

<svelte:window
	on:keydown={(event) => {
		if (event.key === 'Enter') validateBoard();
	}}
/>
<!--It is an eventlistener. When the key "Enter" is pressed down, it will run the redirect fuction.-->

<!--<link
	href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
	rel="stylesheet"
/>-->

<main>
	<div class="mid-box">
		<h1>Welcome</h1>
		<!--Text. Header)-->
		<h2>to MagicBoard</h2>
		<!--Text. Header)-->
		<div class="boxes">
			<!--A div with a class named boxes)-->
			<div class="create-box">
				<!--A div with a class named create-box)-->
				<p>Click to create a new board</p>
				<!--Text. Paragraph)-->
				<button id="create-button" class="button" on:click={createBoard}>Create Board</button>
				<!--A button with the id 'create-button' and class 'button'-->
			</div>
			<div class="join-box">
				<!--A div with a class named join-box)-->
				<p>Insert Code to Join Board</p>
				<!--Text. Paragraph)-->
				<input id="insert-code-box" bind:value={boardIdInput} placeholder="Insert code" />
				<button id="join-button" class="button" on:click={validateBoard}> Join Board</button>
				<!--A button with the id 'join-button' and class 'button'-->
				<!--on:click={redirect} does so when the button is clicked on, the function redirect runs-->
			</div>
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
	}

	.mid-box {
		border-radius: 7%; /*Rounds the edges*/
		/*width: 37%;*/
		/*height: 27%;*/
		background-color: #ffffff;
		padding: 1.3em; /* Adds some spacing inside the box */
		/*box-sizing: border-box; /* Ensures padding is included in the width/height calculations */
		/*transform: translateY(0%);*/
		min-width: 30em; /*Gives the mid-box a minimum width*/
	}

	h1 {
		/* Style header */
		font-size: 400%;
		width: 100%; /* Ensure the header spans the width of the box */
		text-align: center; /* Center the header text */
		margin-top: 0; /* Adjust spacing as needed */
		font-weight: bold; /*Makes the font bold*/
	}

	h2 {
		transform: translateY(-50%); /*It repositions the h2 on the page*/
		font-size: 200%;
		width: 100%; /* Ensure the header spans the width of the box */
		text-align: center; /* Center the header text */
		margin-top: 0; /* Adjust spacing as needed */
		font-weight: bold; /*Makes the text bold*/
	}

	p {
		margin-top: 1%; /*There is a 1% margin from the top of the paragraphs to the top of the box or other items*/
		margin-bottom: 5%; /*There is a 5% margin from the bottom of the paragraphs to other items*/
	}
	#insert-code-box {
		border-radius: 0.35em; /*rounds the edges*/
		outline: 0.1em solid #000000; /*Makes a black outline*/
		width: 90%;
		padding: 0.3em;
		text-align: center;
	}

	.boxes {
		display: flex; /*Establishes a flex container*/
		justify-content: space-evenly; /*It does so there is equal space around the items*/
		/*transform: translateY(0%);*/
	}

	.button {
		display: flex; /*Establishes a flex container*/
		padding: 7%; /*Makes space around the content (text) in the buttons*/
		font-size: 1.29rem; /*The size of the text*/
		/*box-sizing: border-box;*/
		width: 90%;
		border-radius: 0.5em; /*rounds the edges*/
		font-weight: bold; /*Makes the text bold*/
		/*color: #232323;*/
		word-spacing: 0.2em; /*Space between words*/
		margin-top: 10%; /*There is a 10% margin from the top of the buttons to other items*/
		margin-bottom: 5%; /*There is a 5% margin from the bottom of the buttons to the bottom of the box*/
		justify-content: center; /*The text in the buttons is in the center of the button*/
	}

	.join-box {
		display: flex; /*Establishes a flex container*/
		flex-direction: column; /*The items in the box fellows the direction of a column*/
		background-color: #ffffff;
		border-left: 0.075em solid #363636; /*The border to the left side is black*/
		align-items: center; /*The items in the box is in the center*/
		width: 100%;
		justify-content: space-between; /*It does so there is space between the items*/
	}

	.create-box {
		display: flex; /*Establishes a flex container*/
		flex-direction: column; /*The items in the box fellows the direction of a column*/
		background-color: #ffffff;
		border-right: 0.075em solid #363636; /*The border to the right side is black*/
		align-items: center; /*The items in the box is in the center*/
		width: 100%;
		justify-content: space-between; /*It does so there is space between the items*/
	}

	#create-button {
		background-color: #5ba4fc;
		outline: 0.1em solid#1a6cbe; /*An outline in the color blue*/
	}

	#join-button {
		background-color: #53d769;
		outline: 0.1em solid#13864d; /*An outline in the color green*/
	}
</style>
