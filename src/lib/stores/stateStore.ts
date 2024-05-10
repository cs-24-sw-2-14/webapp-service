// Store to handle global state
import { Socket } from 'socket.io-client';

import { writable } from 'svelte/store';
import {
	type CanvasView,
	Color,
	type OtherUser,
	Page,
	ToolState,
	type User,
	type ViewportCoordinates
} from '$lib/types';

export const boardId = writable('');

export const currentPage = writable(Page.InitializationPage);

export const socket = writable<Socket>();

export const viewChat = writable(false);

export const toggleGrid = writable(true);

export const canvasView = writable<CanvasView>({
	position: { x: 0, y: 0 },
	size: {
		width: 0,
		height: 0
	},
	scale: 100
});

export const toolState = writable<ToolState>(ToolState.pan);

export const cursorPosition = writable<ViewportCoordinates>({
	x: 0,
	y: 0
});

export const otherUsers = writable<OtherUser[]>([
	{
		name: 'Elma Vukicevic',
		color: Color.red,
		position: { x: -50, y: 50 },
		drawColor: '#a4eb34',
		isOnline: true
	},
	{
		name: 'Amalie Jensen',
		color: Color.orange,
		position: { x: -100, y: 100 },
		drawColor: '#a4eb34',
		isOnline: true
	},
	{
		name: 'Cecilie Lassen',
		color: Color.yellow,
		position: { x: -150, y: 150 },
		drawColor: '#000000',
		isOnline: true
	},
	{
		name: 'Kresten Sckerl',
		color: Color.lime,
		position: { x: -200, y: 200 },
		drawColor: '#000000',
		isOnline: true
	},
	{
		name: 'Mads Fagerlund',
		color: Color.green,
		position: { x: -250, y: 250 },
		drawColor: '#000000',
		isOnline: true
	},
	{
		name: 'Marc Nygaard',
		color: Color.teal,
		position: { x: -300, y: 300 },
		drawColor: '#000000',
		isOnline: true
	},
	{
		name: 'Thorbjørn Larsen',
		color: Color.brown,
		position: { x: -350, y: 350 },
		drawColor: '#000000',
		isOnline: true
	}
]);

export const user = writable<User>({
	name: 'Marc', // Empty string as the default Username
	color: Color.pink, // Default user color set to pink, BECAUSE WHY NOT!
	position: { x: 0, y: 0 },
	drawColor: '#000000'
});

export const canvasTouched = writable(false);

export const touchEvents = {
	start: () => canvasTouched.set(true),
	move: (event: TouchEvent) =>
		cursorPosition.update(() => {
			return { x: event.touches[0].clientX, y: event.touches[0].clientY };
		}),
	end: () => canvasTouched.set(false)
};

export const mouseEvents = {
	down: () => canvasTouched.set(true),
	move: (event: MouseEvent) =>
		cursorPosition.update(() => {
			return { x: event.clientX, y: event.clientY };
		}),
	up: () => canvasTouched.set(false)
};

export interface DrawingUnderCursor {
	commandId: number;
	eventTarget: EventTarget;
}

export const drawingsUnderCursor = writable<DrawingUnderCursor[]>([]);
