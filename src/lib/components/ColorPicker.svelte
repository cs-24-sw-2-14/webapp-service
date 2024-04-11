<script lang="ts">
    import { user } from "$lib/stores/stateStore";
    import { colors } from '../color';
    import type { User } from "$lib/stores/stateStore";
    
    user.update((current: User) => {
    
        return{
            ...current,
        }
    });
    
    </script>

<div>
    <table>
        {#each [0, 1, 2] as row}
            <tr>
                {#each colors.slice(row * 5, row * 5 + 5) as color, i}
                    <td><button class={`bg-${color.bg} border-${color.border} border-2 hover:border-4`}></button></td>
                {/each}
            </tr>
        {/each}
    </table>
</div>




    
    <style>
        button {border-radius: 50%; padding: 1em;}
    </style>