<script lang="ts">
    import { user } from "$lib/stores/stateStore";
    import { color } from '../color';
    import type { User } from "$lib/stores/stateStore";
    
    user.update((current: User) => {
    
        return{
            ...current,
        }
    });
    
    let colorOptions = [
            [ color.green, color.red, color.blue, color.purple, color.pink],
            [ color.orange, color.yellow, color.teal, color.brown, color.lime]
        ];
    </script>
    
    <div>
        <table>
            {#each colorOptions as colorRow}
                <tr>
                    {#each colorRow as color}
                    <td><button class={`bg-${color}`}></button></td>
                    {/each}
                </tr>
            {/each}
        </table>
    </div>
    
    <style>
        button {border-radius: 50%; padding: 1em;}
    </style>