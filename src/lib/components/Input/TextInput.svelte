<script lang="ts">
	import type { ChangeEventHandler } from 'svelte/elements';

	export let title;
	export let placeholder;
	export let contentChanged: ChangeEventHandler<HTMLTextAreaElement>;
    
    let contentField = '';


        
</script>

<main>
    <div class="top-box">
		<h2>
			{title}
		</h2>
	</div>

	<hr /> <!-- A line separating the two divs --> 

	<div class="lower-box">
		<textarea 
			id="content"
			bind:value={contentField}
			on:change={contentChanged}
            {placeholder}
                class="mt-1 p-2 border rounded w-full placeholder-black bg-transparent border-none focus:outline-none focus:ring-0 focus:border-none text-black"
		/>
	</div>

</main>

<!-- Just styling -->
<style>
    main{
        border-radius: 6%; /*Rounds the edges*/
        background-color: #65baff;
		min-width: 5em; 
    }    

    .top-box{
        border-radius: 6%; /*Rounds the edges*/
        background-color: #65baff;
        display: flex; /*Establishes a flex container*/
	    justify-content: space-evenly; /*It does so there is equal space around the items*/
		/*transform: translateY(0%);*/

    }
   hr { 
    border-color: blue;
   }

   h2{
        font-size: 1.1em;
        line-height: 1em;
        margin-top: 0.25rem;
        margin-bottom: 0.25rem;
        color: black;
        text-align: center;
   }

</style>
    
