<script lang="ts">
import { user } from "$lib/stores/stateStore";
import type { User } from "$lib/stores/stateStore";

user.update((current: User) => {

    return{
        ...current,
        color: "ffffff"
    }
});

let colorOptions = [
        ['red', 'green', 'blue'],
        ['yellow', 'orange', 'purple']
    ];
</script>

<div>
    <table>
        {#each colorOptions as colorRow}
            <tr>
                {#each colorRow as color}
                    <td><button style="background-color: {color}"></button></td>
                {/each}
            </tr>
        {/each}
    </table>
</div>

<style>
    button {border-radius: 50%; padding: 1em;}
</style>