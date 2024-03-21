<!-- SvgCanvas.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import { svgs } from '$lib/stores/svgStore.js';
    
    

    /***************************************************/
    /******************** VARIABLES ********************/
    /***************************************************/
    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D | null;
    let isDragging = false;
    let offsetX = 0, offsetY = 0; // View offset
    let startX: number, startY: number; // Starting positions for dragging
    let imageCache = new Map<number, HTMLImageElement>(); // Cache for the loaded images


    
    /**************************************************/
    /******************** ON MOUNT ********************/
    /**************************************************/
    onMount(() => {
        ctx = canvas.getContext('2d');
        drawCanvas(); // Initial draw
    });



    /**************************************************************************/
    /******************** REDRAW CANVAS IF CHANES TO STORE ********************/
    /**************************************************************************/
    // Reactive statement to redraw canvas when svgs store updates
    $: if (canvas !== undefined) {
        ctx = canvas.getContext('2d');
        if (ctx !== null) {
            drawCanvas();
        }
    }


    
    /************************************************/
    /******************** CANVAS ********************/
    /************************************************/
    function drawCanvas() {
        if (ctx === null) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawGrid();
        $svgs.forEach(({ svg, x, y, id }) => { // Assuming each SVG has a unique ID
            if (!imageCache.has(id)) {
                loadAndCacheSVG(svg, id);
            }
            drawCachedSVG(id, x, y);
        });
    }

    function loadAndCacheSVG(svg: string, id: number) {
        const img = new Image();
        const svgBlob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(svgBlob);

        img.onload = () => {
            imageCache.set(id, img);
            URL.revokeObjectURL(url);
            drawCanvas(); // Redraw when new image is loaded
        };
        img.src = url;
    }

    function drawCachedSVG(id: number, x: number, y: number) {
        const img = imageCache.get(id);

        if (ctx === null) return;
        if (img) {
            ctx.drawImage(img, x + offsetX, y + offsetY);
        }
    }

    /**********************************************/
    /******************** DRAG ********************/
    /**********************************************/
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

    /**********************************************/
    /******************** GRID ********************/
    /**********************************************/
    const gridSpacing = 50; // Space between dots
    const dotSize = 2; // Radius of each dot

    function drawGrid() {
        if (ctx === null) return;

        for (let x = 0; x < canvas.width; x += gridSpacing) {
            for (let y = 0; y < canvas.height; y += gridSpacing) {
                ctx.beginPath();
                ctx.arc(x + offsetX % gridSpacing, y + offsetY % gridSpacing, dotSize, 0, 2 * Math.PI);
                ctx.fill();
            }
        }
    }
</script>



<div class="flex items-center justify-center h-screen">
    <div class="border-4 border-black">
        <canvas bind:this={canvas} width="1200" height="800"
            on:mousedown={startDrag}
            on:mousemove={onDrag}
            on:mouseup={stopDrag}
            on:mouseleave={stopDrag}>
        </canvas>
    </div>
</div>  

  