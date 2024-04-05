<script lang="ts">
</script>

<main>
	<div class="mid-box">
		<h1>Name Yourself.</h1>
		<input type="text" placeholder="LigmaNuts13" />
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
		font-size: 2.9rem;
		width: 100%; /* Ensure the header spans the width of the box */
		text-align: center; /* Center the header text */
		margin-top: 50px; /* Adjust spacing as needed */
		font-weight: bold;
		letter-spacing: 0.8px;
	}

	input[type='text'] {
		width: 100%;
		padding: 13px 20px;
		margin: 30px 0;
		width: 375px;
		height: 53px;
		border-radius: 4px;
		outline: 1.5px solid#283747;
		color: #595959;
		letter-spacing: 0.6px;
		word-spacing: 2px;
		font-size: larger;
	}
</style>
