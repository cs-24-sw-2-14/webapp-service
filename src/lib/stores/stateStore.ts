// Store to handle global state

import { writable } from 'svelte/store';


export const serverId = writable('');

export const viewChat = writable(false);

export const settings = writable(false);

export interface CanvasView {
  x: number;
  y: number;
  width: number; // Default values, will be replaced on mount
  height: number; // Default values, will be replaced on mount
  scale: number;
  cursor: string;
}

export const canvasView = writable<CanvasView>({
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  scale: 100,
  cursor: "pointer"
});

export enum ToolState { draw, erase, pan, move }

export const toolState = writable<ToolState>(ToolState.pan);

export interface CanvasMousePosition {
  x: number;
  y: number;
}

export const canvasMousePosition = writable<CanvasMousePosition>({
  x: 0,
  y: 0,
});

export interface Color {
    name: string;
    bg: string;
    border: string;

}

export interface User{
	name: string;
	color: Color;
}

export const onlineUsers = writable<User[]>([]);

export const user = writable<User>();

export const canvasMouseDown = writable(false)

export const mouseEvents = {
  down: () => canvasMouseDown.set(true),
  move: (event: MouseEvent) => canvasMousePosition.update(() => {
    return { x: event.clientX, y: event.clientY };
  }),
  up: () => canvasMouseDown.set(false),
};

export interface DrawingUnderCursor {
  index: number;
  eventTarget: EventTarget;
}

export const drawingsUnderCursor = writable<DrawingUnderCursor[]>([])


export const canvasCursor = writable("")
