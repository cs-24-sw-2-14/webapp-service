// Store to handle global state

import { writable } from 'svelte/store';
import { color } from "../color"

export const serverId = writable('');

export const viewChat = writable(false);

export const settings = writable(false);

export interface CanvasView {
	x: number;
	y: number;
	width: number; // Default values, will be replaced on mount
	height: number; // Default values, will be replaced on mount
	scale: number;
}

export const canvasView = writable<CanvasView>({
	x: 0,
	y: 0,
	width: 0,
	height: 0,
	scale: 100
});

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
	toolState.update((current) => {
		return { ...current, pencil: false, erase: false, pan: false, move: false, [tool]: true };
	});
}

 
export interface OnlineUser{
	name:string;
	color:color;
	border:string;
}

export const onlineUsers = writable<OnlineUser[]>([]);

