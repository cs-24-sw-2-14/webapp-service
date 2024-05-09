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

export const otherUsers = writable<OtherUser[]>([
	{
		name: 'Elma Vukicevic',
		color: UserColorEnum.red,
		cursorPosition: { x: -50, y: 50 },
		drawColor: '#a4eb34',
		isOnline: true
	},
	{
		name: 'Amalie Jensen',
		color: UserColorEnum.orange,
		cursorPosition: { x: -100, y: 100 },
		drawColor: '#a4eb34',
		isOnline: true
	},
	{
		name: 'Cecilie Lassen',
		color: UserColorEnum.yellow,
		cursorPosition: { x: -150, y: 150 },
		drawColor: '#000000',
		isOnline: true
	},
	{
		name: 'Kresten Sckerl',
		color: UserColorEnum.lime,
		cursorPosition: { x: -200, y: 200 },
		drawColor: '#000000',
		isOnline: true
	},
	{
		name: 'Mads Fagerlund',
		color: UserColorEnum.green,
		cursorPosition: { x: -250, y: 250 },
		drawColor: '#000000',
		isOnline: true
	},
	{
		name: 'Marc Nygaard',
		color: UserColorEnum.teal,
		cursorPosition: { x: -300, y: 300 },
		drawColor: '#000000',
		isOnline: true
	},
	{
		name: 'Thorbjørn Larsen',
		color: UserColorEnum.brown,
		cursorPosition: { x: -350, y: 350 },
		drawColor: '#000000',
		isOnline: true
	}
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
