<script lang="ts">
	import { socket } from '$lib/stores/stateStore';
	import { svgs } from '$lib/stores/svgStore';
	import { onMount } from 'svelte';
	import type { Svg } from '$lib/types';
	import type { Edit, Remove } from '$lib/socketioInterface';

	onMount(() => {
		$socket.on('edit', handleEdit);
		$socket.on('remove', handleRemove);
	});

	function handleEdit(data: Edit) {
		// check if the command already exists
		const commandIndex = $svgs.findIndex((svg: Svg) => svg.commandId === data.commandId);

		// if it exists, modify it
		if (commandIndex !== -1) {
			$svgs[commandIndex].position = data.position ?? $svgs[commandIndex].position;
			$svgs[commandIndex].svgString = data.svgString ?? $svgs[commandIndex].svgString;
			return;
		}

		// else add it, if all fields are present
		if (!data.svgString || !data.position) return;

		svgs.update((current) => {
			let spliceIndex = 0;
			// Find the index to insert the command into the svgs array
			for (let i = current.length - 1; i >= 0; i--) {
				if ($svgs[i].commandId < data.commandId) {
					spliceIndex = i + 1;
					break;
				}
			}
			let svg: Svg = {
				svgString: data.svgString!,
				position: data.position!,
				commandId: data.commandId
			};
			let resultArray = current;
			resultArray.splice(spliceIndex, 0, svg);
			return resultArray;
		});
	}

	function handleRemove(data: Remove) {
		svgs.update((current) => {
			return current.filter((svg) => svg.commandId !== data.commandId);
		});
	}
</script>
