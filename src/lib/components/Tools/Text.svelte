<script>
	import MenuButton from '$lib/components/Navbar/MenuButton.svelte';
	import Icons from '$lib/icons/MenuIcons.json';
	import { toolState } from '$lib/stores/stateStore';
	import { ToolState } from '$lib/types';
</script>

<MenuButton
	isActive={$toolState === ToolState.text}
	icon={Icons.text}
	on:click={() => {
		$toolState = ToolState.text;
	}}
></MenuButton>
