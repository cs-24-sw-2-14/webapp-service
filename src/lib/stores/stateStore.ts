// Store to handle global state

import { writable } from 'svelte/store';
import { colors } from '$lib/color';
import { ToolState, type CanvasMousePosition, type User, type CanvasView } from '$lib/types';

export const serverId = writable('');

export const viewChat = writable(false);

export const toggleGrid = writable(true);

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

export const canvasMousePosition = writable<CanvasMousePosition>({
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

export const canvasMouseDown = writable(false)

export const mouseEvents = {
  down: () => canvasMouseDown.set(true),
  move: (event: MouseEvent) => canvasMousePosition.update(() => {
    return { x: event.clientX, y: event.clientY };
  }),
  up: () => canvasMouseDown.set(false),
};

export const currentSvgElementIndex = writable<number | null>(null)

