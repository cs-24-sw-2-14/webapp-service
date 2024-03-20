<!-- SvgCanvas.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import { svgs } from '$lib/store/svgStore.js';

    let canvas: any;
    let ctx: any;
    let isDragging = false;
    let offsetX = 0, offsetY = 0; // View offset
    let startX: number, startY: number; // Starting positions for dragging

    const gridSpacing = 50; // Space between dots
    const dotSize = 2; // Radius of each dot

    onMount(() => {
        ctx = canvas.getContext('2d');
        drawCanvas(); // Initial draw
    });

    // Reactive statement to redraw canvas when svgs store updates
    $: {
        if (ctx) {
            drawCanvas();
        }
    };

    function drawCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawGrid();
        $svgs.forEach(({ svg, x, y }) => drawSVG(svg, x, y)); // Use the store
    }

    function startDrag(e: any) {
        isDragging = true;
        startX = e.clientX - offsetX;
        startY = e.clientY - offsetY;
    }

    function onDrag(e: any) {
        if (isDragging) {
            offsetX = e.clientX - startX;
            offsetY = e.clientY - startY;
            drawCanvas(); // Call drawCanvas to include the offsets
        }
    }

    function stopDrag() {
        isDragging = false;
    }

    async function drawSVG(svg: string, x: number, y: number) {
        const img = new Image();
        const svgBlob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(svgBlob);

        img.onload = () => {
            // Include the offsets here
            ctx.drawImage(img, x + offsetX, y + offsetY);
            URL.revokeObjectURL(url);
        };

        img.src = url;
    }

    function drawGrid() {
        for (let x = 0; x < canvas.width; x += gridSpacing) {
            for (let y = 0; y < canvas.height; y += gridSpacing) {
                ctx.beginPath();
                ctx.arc(x + offsetX % gridSpacing, y + offsetY % gridSpacing, dotSize, 0, 2 * Math.PI);
                ctx.fill();
            }
        }
    }

    
</script>
  
<canvas bind:this={canvas} width="1200" height="800"
        on:mousedown={startDrag}
        on:mousemove={onDrag}
        on:mouseup={stopDrag}
        on:mouseleave={stopDrag}>
</canvas>
  