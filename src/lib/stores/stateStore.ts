import { writable, derived } from 'svelte/store';
import { svgs } from '$lib/stores/socketioStore';
import {
	type CanvasView,
	Page,
	ToolState,
	type CanvasCoordinateSet,
	type ColorString,
	type Username,
	type Color
} from '$lib/types';
import { getCommandIdsUnderCursor, viewportToCanvasCoordinatesFromCanvasView } from '$lib/utils';

// TOOLSTATE
export const toggleGrid = writable(true);
export const drawColor = writable<ColorString>('#000000');
export const chosenTool = writable<ToolState>(ToolState.pan);

// USERS
export const username = writable<Username>();
export const color = writable<Color>();

// CURSOR
export const cursorDown = writable(false);
export const cursorEvents = {
	down: () => cursorDown.set(true),
	up: () => cursorDown.set(false),
	move: (event: MouseEvent | TouchEvent) => {
		if (event instanceof MouseEvent) {
			cursorPosition.set({ x: event.clientX, y: event.clientY });
		} else {
			cursorPosition.set({ x: event.touches[0].clientX, y: event.touches[0].clientY });
		}
	}
};
export const cursorPosition = writable<CanvasCoordinateSet>({
	x: 0,
	y: 0
});

// SVG CANVAS
export const canvasView = writable<CanvasView>({
	position: { x: 0, y: 0 },
	size: {
		width: 0,
		height: 0
	},
	scale: 100
});

export const canvasCursorPosition = derived(
	[cursorPosition, canvasView],
	([$cursorPosition, $canvasView]) => {
		return viewportToCanvasCoordinatesFromCanvasView($cursorPosition, $canvasView);
	}
);

export const boardId = writable('');
export const currentPage = writable(Page.InitializationPage);
export const viewChat = writable(false);

export const commandIdsUnderCursor = derived([cursorPosition, svgs], ([cursorPosition, $svgs]) => {
	return getCommandIdsUnderCursor(cursorPosition, $svgs);
});
