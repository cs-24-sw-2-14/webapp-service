<script lang="ts">
	export let mouseX: Number;
	export let mouseY: Number;

	export let name: String;
	export let color: String;

	import { type CanvasMousePosition } from '$lib/stores/stateStore';
	import { canvasView } from '$lib/stores/stateStore';

	function globalCoordinates(pos: CanvasMousePosition) {
		const tx = (pos.x - $canvasView.width / 2) / ($canvasView.scale / 100) + $canvasView.x - 10.5;
		const ty = (pos.y - $canvasView.height / 2) / ($canvasView.scale / 100) + $canvasView.y - 11;
		return { x: tx, y: ty };
	}

	let cursor: any;

	$: cursor = globalCoordinates($canvasMousePosition);

	import { canvasMousePosition } from '$lib/stores/stateStore';

	$: {
		console.log(`${cursor.x} : ${cursor.y}`);
	}

	import { afterUpdate } from 'svelte';
	let textElement: SVGTextElement;
	let rectElement: SVGRectElement;

	function adjustBackground() {
		const bbox = textElement.getBBox();
		rectElement.x.baseVal.value = bbox.x - 7.5; // Provide some padding
		rectElement.y.baseVal.value = bbox.y - 5;
		rectElement.width.baseVal.value = bbox.width + 15;
		rectElement.height.baseVal.value = bbox.height + 10;
	}

	afterUpdate(() => {
		if (textElement && rectElement) {
			adjustBackground();
		}
	});
</script>

<g transform={`translate(${cursor.x}, ${cursor.y})`}>
	<!--
        <svg
            width="20px"
            height="20px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13.4049 17.3737C12.1169 20.1754 7.94756 19.4443 7.6896 16.3716L7.10914 9.45749C6.89678 6.92797 9.72627 5.29437 11.8107 6.74304L17.5083 10.7028C20.0404 12.4626 18.5888 16.4388 15.5185 16.1534L14.7348 16.0805C14.3122 16.0412 13.9109 16.273 13.7336 16.6585L13.4049 17.3737Z"
                fill="#323232"
            />
        </svg>
    -->
	<circle cx="10" cy="10" r="3" fill="black" />

	<svg width="200" height="100" xmlns="http://www.w3.org/2000/svg">
		<rect bind:this={rectElement} fill="lightblue" />
		<text bind:this={textElement} x="25" y="45" font-family="Arial" font-size="20" fill="blue"
			>Marc Nygaard</text
		>
	</svg>
</g>
