<script lang="ts">
	import { socket } from '$lib/stores/stateStore';
	import { svgs, type Svg } from '$lib/stores/svgStore';
	import { onMount } from 'svelte';
	import type { Edit, Remove, Svg } from '$lib/types';

	onMount(() => {
		$socket.on('edit', handleEdit);
		$socket.on('remove', handleRemove);
	});

	// TODO: Mads, optionals i interface.

	function handleEdit(data: Edit) {
		// check if the command already exists
		const commandIndex = $svgs.findIndex((svg: Svg) => svg.commandId === data.commandId);

		// if it exists, modify it
		if (commandIndex === -1) {
			$svgs[commandIndex].placement = data.placement ?? $svgs[commandIndex].placement;
			$svgs[commandIndex].svgString = data.svgString ?? $svgs[commandIndex].svgString;
			return;
		}
		// else add it
		svgs.update((current) => {
			let spliceIndex = 0;
			// Find the index to insert the command into the svgs array
			for (let i = current.length - 1; i >= 0; i--) {
				if ($svgs[i].commandId < data.commandId) {
					spliceIndex = i + 1;
					break;
				}
			}
			let resultArray = current;
			resultArray.splice(spliceIndex, 0, data);
			return resultArray;
		});
	}

	function handleRemove(data: Remove) {
		svgs.update((current) => {
			return current.filter((svg) => svg.commandId !== data.commandId);
		});
	}
</script>
