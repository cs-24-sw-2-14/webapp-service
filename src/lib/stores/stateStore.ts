// Store to handle global state
import Socket from 'socket.io-client';

import { writable } from 'svelte/store';
import {
	ToolState,
	type CanvasMousePosition,
	type User,
	type OtherUser,
	type CanvasView,
	UserColorEnum
} from '$lib/types';
export const boardId = writable('');

export enum Page {
	InitializationPage,
	CanvasPage
}

export const currentPage = writable(Page.InitializationPage);

export const socket = writable<typeof Socket>();

export const viewChat = writable(false);

export const toggleGrid = writable(true);

export const settings = writable(false);

export const chosenColor = writable('#27272A');

export const canvasView = writable<CanvasView>({
	position: { x: 0, y: 0 },
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
	{ name: 'Elma Vukicevic', color: UserColor.red, posX: -50, posY: 50 },
	{ name: 'Amalie Jensen', color: UserColor.orange, posX: -100, posY: 100 },
	{ name: 'Cecilie Lassen', color: UserColor.yellow, posX: -150, posY: 150 },
	{ name: 'Kresten Sckerl', color: UserColor.lime, posX: -200, posY: 200 },
	{ name: 'Mads Fagerlund', color: UserColor.green, posX: -250, posY: 250 },
	{ name: 'Marc Nygaard', color: UserColor.teal, posX: -300, posY: 300 },
	{ name: 'Thorbjørn Larsen', color: UserColor.brown, posX: -350, posY: 350 }
]);

export const user = writable<User>({
	name: 'Marc', // Empty string as the default Username
	color: UserColor.pink, // Default user color set to pink, BECAUSE WHY NOT!
	posX: 0,
	posY: 0
});

export const canvasTouched = writable(false);

export const touchEvents = {
	start: () => canvasTouched.set(true),
	move: (event: TouchEvent) =>
		canvasCursorPosition.update(() => {
			return { x: event.touches[0].clientX, y: event.touches[0].clientY };
		}),
	end: () => canvasTouched.set(false)
};

export const mouseEvents = {
	down: () => canvasTouched.set(true),
	move: (event: MouseEvent) =>
		canvasCursorPosition.update(() => {
			return {x: event.clientX, y: event.clientY};
		}),
	up: () => canvasTouched.set(false)
};

export interface DrawingUnderCursor {
	commandId: number;
	eventTarget: EventTarget;
}

export const drawingsUnderCursor = writable<DrawingUnderCursor[]>([]);
