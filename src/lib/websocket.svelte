<script lang="ts">
	import ioClient from 'socket.io-client';
	const ENDPOINT = 'http://localhost:6123';
	import { boardId } from '$lib/stores/stateStore';
	import { svgs, type Svg } from '$lib/stores/svgStore';
	import { onMount } from 'svelte';

	onMount(async () => {
		export const socket = ioClient(ENDPOINT).of(boardId);
		socket.on('edit', handleEdit);
		socket.on('remove', handleRemove);
	});

	function handleEdit(data: any) {
		// check if the command already exists
		const commandIndex = $svgs.findIndex((svg: Svg) => svg.commandId === data.commandId);
		// if it exists, modify it
		// HACK: Maybe rewrite to loop through the keys of data instead
		if (commandIndex) {
			// only modify the property if it exists on the data object
			if (data?.x) $svgs[commandIndex].x = data.x;
			if (data?.y) $svgs[commandIndex].y = data.y;
			if (data?.svg) $svgs[commandIndex].svg = data.svg;
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

	function handleRemove(data: any) {
		svgs.update((current) => {
			return current.filter((svg) => svg.commandId !== data.commandId);
		});
	}
</script>
