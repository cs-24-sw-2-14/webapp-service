// Store to handle global state

import { writable } from 'svelte/store';
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

export const canvasMousePosition = writable<CanvasMousePosition>({
  x: 0,
  y: 0,
});

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

export const currentSvgElementIndex = writable<number | null>(null)

