<script lang="ts">
	import ToolbarButton from '../ToolbarButton.svelte';
	import Icons from '$lib/icons/MenuIcons.json';
	import {
		toolState,
		ToolState,
		canvasMousePosition,
		canvasMouseDown,
		canvasView
	} from '$lib/stores/stateStore';
	import type { CanvasMousePosition } from '$lib/stores/stateStore';

    function InsertImage(){    
        
		$toolState = ToolState.move;
    }

</script>


<ToolbarButton
	isActive={$toolState === ToolState.image}
	icon={Icons.image}
	on:click={InsertImage}
></ToolbarButton>