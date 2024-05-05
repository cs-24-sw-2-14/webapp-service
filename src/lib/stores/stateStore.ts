// Store to handle global state

import { writable } from 'svelte/store';
import { colors } from '$lib/color';
import { ToolState, type CanvasMousePosition, type User, type CanvasView } from '$lib/types';

export const serverId = writable('');

export const viewChat = writable(false);

export const settings = writable(false);

export const canvasView = writable<CanvasView>({
	position: {
		x: 0,
		y: 0
	},
	width: 0,
	height: 0,
	scale: 100
});

export const toolState = writable<ToolState>(ToolState.pan);

export const canvasCursorPosition = writable<CanvasMousePosition>({
	x: 0,
	y: 0
});

export const onlineUsers = writable<User[]>([
	{ name: 'Elma Vukicevic', color: colors[0] },
	{ name: 'Amalie Jensen', color: colors[1] },
	{ name: 'Cecilie Lassen', color: colors[2] },
	{ name: 'Kresten Sckerl', color: colors[3] },
	{ name: 'Mads Fagerlund', color: colors[4] },
	{ name: 'Marc Nygaard', color: colors[5] },
	{ name: 'Thorbjørn Larsen', color: colors[6] }
]);

export const user = writable<User>();

export const canvasTouchDown = writable(false);

export const touchEvents = {
	start: () => canvasTouchDown.set(true),
	move: (event: TouchEvent) =>
		canvasCursorPosition.update(() => {
			return { x: event.touches[0].clientX, y: event.touches[0].clientY };
		}),
	end: () => canvasTouchDown.set(false)
};

export const currentSvgElementIndex = writable<number | null>(null)

