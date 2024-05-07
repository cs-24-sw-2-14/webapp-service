// Store to handle global state
import Socket from 'socket.io-client';

import { writable } from 'svelte/store';
// import { colors } from '$lib/color';
import { ToolState, type CanvasMousePosition, type User, type CanvasView } from '$lib/types';
export const boardId = writable('');

export const socket = writable<typeof Socket>();

export const viewChat = writable(false);

export const toggleGrid = writable(true);

export const settings = writable(false);

export const canvasView = writable<CanvasView>({
	position: { x: 0, y: 0 },
	width: 0,
	height: 0,
	scale: 100
});

export const toolState = writable<ToolState>(ToolState.pan);

export const canvasMousePosition = writable<CanvasMousePosition>({
	x: 0,
	y: 0
});

export interface Color {
	name: string;
	bg: string;
	border: string;
}

export const onlineUsers = writable<User[]>([]);

export const user = writable<User>({
	name: 'kresten',
	color: { name: 'redski', bg: 'red', border: 'black' }
});

export const canvasMouseDown = writable(false);

export const mouseEvents = {
	down: () => canvasMouseDown.set(true),
	move: (event: MouseEvent) =>
		canvasMousePosition.update(() => {
			return { x: event.clientX, y: event.clientY };
		}),
	up: () => canvasMouseDown.set(false)
};

export interface DrawingUnderCursor {
	commandId: number;
	eventTarget: EventTarget;
}

export const drawingsUnderCursor = writable<DrawingUnderCursor[]>([]);
