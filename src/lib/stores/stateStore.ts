// Store to handle global state

import { writable } from 'svelte/store';
import { ToolState, type CanvasMousePosition, type User, type CanvasView, type Cursors, UserColor } from '$lib/types';
import { colors } from '$lib/color';

export const serverId = writable('');

export const viewChat = writable(false);

export const settings = writable(false);


export const chosenColor = writable('#27272A');

export const cursors = writable<Cursors>({
  localCursor: {
    posX: 0,
    posY: 0,
    color: UserColor.red, // Default user color set to red, BECAUSE WHY NOT!
    name: ''
  },
  remoteCursors: [
    {
      posX: 100,
      posY: 150,
      color: UserColor.teal,
      name: 'Alice'
    },
    {
      posX: 200,
      posY: 250,
      color: UserColor.green,
      name: 'Bob'
    }
  ]
});

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
	// { name: 'Cecilie Lassen', color: colors[2] },
	// { name: 'Kresten Sckerl', color: colors[3] },
	// { name: 'Mads Fagerlund', color: colors[4] },
	// { name: 'Marc Nygaard', color: colors[5] },
	// { name: 'Thorbjørn Larsen', color: colors[6] }
]);

export const user = writable<User>({
  name: '', // Empty string as the default Username
  color: {
      name: '',
      bg: '',
      border: ''
  }
});

export const canvasMouseDown = writable(false)

export const mouseEvents = {
  down: () => canvasMouseDown.set(true),
  move: (event: MouseEvent) => canvasMousePosition.update(() => {
    return { x: event.clientX, y: event.clientY };
  }),
  up: () => canvasMouseDown.set(false),
};

export const currentSvgElementIndex = writable<number | null>(null)

