<script lang="ts">
    
</script>

<main>
	<div class="mid-box">
		<h1>Welcome <br />to MagicBoard!</h1>
		<div class="inner-box">
			<button id="create-button" class="button">Create Board</button>
		</div>
		<div class="inner-box-code">
			<button id="join-button" class="button">Insert Code to Join Board</button>
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
		font-size: 3rem;
		width: 100%; /* Ensure the header spans the width of the box */
		text-align: center; /* Center the header text */
		margin-top: 0; /* Adjust spacing as needed */
		font-weight: bold;
	}

	#create-button {
		/* Style button */
		margin-top: 35px;
		background-color: #5ba4fc;
	}

	#join-button {
		margin-top: 25px;
		background-color: #53d769;
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
</style>
