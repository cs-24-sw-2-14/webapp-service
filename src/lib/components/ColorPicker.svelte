<script lang="ts">
	import { user, onlineUsers } from '$lib/stores/stateStore';
	import { colors } from '../color';
	import type { User, Color } from '$lib/stores/stateStore';

	function colorChosen(color: Color, user: User, onlineUsers: User[]) {
		if (user && user.color && user.color.name === color.name) {
			return true;
		}

		for (let i = 0; i < onlineUsers.length; i++) {
			const onlineUser = onlineUsers[i];
			if (onlineUser && onlineUser.color && onlineUser.color.name === color.name) {
				return true;
			}
		}
		return false;
	}

	function colorClicked(color: Color) {
		user.update((current: User) => {
			current.color = color;
			return {
				...current
			};
		});
	}

    function getButtonInner(color: Color, user: User, onlineUsers: User[]) {
        if (colorChosen(color, $user, $onlineUsers)) {
            return "X"
        }
        return ""
    }
</script>

<div>
	<table>
		{#each [0, 1, 2] as row}
			<tr>
				{#each colors.slice(row * 5, row * 5 + 5) as color}
					<td
						><button
							class={`bg-${color.bg} border-${color.border} border-2 hover:border-4`}
							disabled={colorChosen(color, $user, $onlineUsers)}
							on:click={() => {
								colorClicked(color);
							}}
						>{getButtonInner(color, $user, $onlineUsers)}</button></td
					>
				{/each}
			</tr>
		{/each}
	</table>
</div>

<style>
	button {
		border-radius: 50%;
		padding: 1em;
	}
	button:disabled,
	button[disabled] {
		border-radius: 50%;
        
	}
</style>
