<script lang="ts">
	import Modal from '../Modal.svelte';
	import type { TextString } from '$lib/types';
	export let title;
	export let placeholder;
	export let dialog: HTMLDialogElement;
	export let closable = true;
	export let submit: (content: TextString) => void;
	export let contentField = '';
	
</script>

<Modal bind:dialog {closable}>
	<div class="top-box">
		<h2>
			{title}
		</h2>
	</div>

	<hr />
	<!-- A line separating the two divs -->

	<div class="lower-box">
		<textarea
			id="content"
			rows="4"
			bind:value={contentField}
			{placeholder}
			class="mt-1 p-2 border rounded w-full placeholder-zinc-300 bg-zinc-500 border-none focus:outline-none focus:ring-0 focus:border-none text-zinc-300"
		/>
		<button 
			id="submit-text-button" class="button" 
			on:click={() => {
				if (contentField === '') return;
				submit(contentField);
			}}
			>Submit and place the text
		</button>
	</div>
</Modal>
<!--  -->



<!-- Just styling -->
<style>
	.top-box {
		border-radius: 6%; /*Rounds the edges*/
		display: flex; /*Establishes a flex container*/
		justify-content: space-evenly; /*It does so there is equal space around the items*/
		/*transform: translateY(0%);*/
	}
	hr {
		border-color: #ffffff;
		margin-bottom: 1rem;
	}

	h2 {
		font-size: 1.875em;
		line-height: 1em;
		margin-top: 0.25rem;
		margin-bottom: 0.25rem;
		color: #d4d4d8;
		text-align: center;
		margin-bottom: 1rem;
	}

	.button {
		display: flex; /*Establishes a flex container*/
		padding: 2%; /*Makes space around the content (text) in the buttons*/
		font-size: 1rem; /*The size of the text*/
		/*box-sizing: border-box;*/
		width: 100%;
		border-radius: 0.25em; /*rounds the edges*/
		/*color: #232323;*/
		word-spacing: 0.2em; /*Space between words*/
		justify-content: center; /*The text in the buttons is in the center of the button*/
		background-color: #5ba4fc;
		outline: 0.1em solid#1a6cbe; /*An outline in the color blue*/
		margin-top: 1rem;
	}
</style>
