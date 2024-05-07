<script lang="ts">
	import MenuButton from '$lib/components/Navbar/MenuButton.svelte';
	import Pan from '$lib/components/Tools/Pan.svelte';
	import Move from '$lib/components/Tools/Move.svelte';
	import Draw from '$lib/components/Tools/Draw.svelte';
	import UndoRedo from '$lib/components/Tools/UndoRedo.svelte';
	import Erase from '$lib/components/Tools/Erase.svelte';
	import Icons from '$lib/icons/MenuIcons.json';
</script>

<!-- Menu bar at the center bottom -->
<div
	class="fixed bottom-0 left-1/2 mb-4 rounded-lg bg-zinc-800 z-10 transform -translate-x-1/2 flex items-center gap-2 p-2"
>
	<!-- Button for drawing -->
	<Draw />

	<!-- Button for erasing -->
	<Erase />

	<!-- Button for panning around -->
	<Pan />

	<!-- Button for moving elements -->
	<Move />
	<!-- SPACE -->
	<div class="border-white border-r-[1.5px] h-6 mx-2"></div>

	<UndoRedo />

	<!-- SPACE -->
	<div class="border-white border-r-[1.5px] h-6 mx-2"></div>

	<!-- Button for inserting image -->
	<MenuButton icon={Icons.image}></MenuButton>

	<!-- Button for inserting text -->
	<MenuButton icon={Icons.text}></MenuButton>

	<!-- Button for inserting shapes -->
	<MenuButton icon={Icons.shape}></MenuButton>
</div>
