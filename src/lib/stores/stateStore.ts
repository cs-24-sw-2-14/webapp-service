// Store to handle global state

import { writable } from 'svelte/store';

export const zoomLevel = writable(100);

export const serverId = writable(" ");

export const viewChat = writable(false);

export const settings = writable(false);

export interface ToolStates {
    pencil: boolean;
    erase: boolean;
    pan: boolean;
    move: boolean;
}

export const toolState = writable<ToolStates>({
    pencil: false,
    erase: false,
    pan: true,
    move: false
});

export function activateTool(tool: keyof ToolStates) {
    toolState.update(current => {
        return {...current, pencil: false, erase: false, pan: false, move: false, [tool]: true };
    });
}