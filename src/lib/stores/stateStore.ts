import { writable, derived } from 'svelte/store';
import { svgs } from '$lib/stores/socketioStore';
import {
	type CanvasView,
	Color,
	type OtherUser,
	Page,
	ToolState,
	type User,
	type ViewportCoordinates,
	type CommandId
} from '$lib/types';
import { getCommandIdsUnderCursor, viewportToCanvasCoordinatesFromCanvasView } from '$lib/utils';

export const boardId = writable('');

export const currentPage = writable(Page.InitializationPage);


export const viewChat = writable(false);
// USERS
export const username = writable<Username>();
export const color = writable<Color>();

export const toggleGrid = writable(true);
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

export const canvasView = writable<CanvasView>({
	position: { x: 0, y: 0 },
	size: {
		width: 0,
		height: 0
	},
	scale: 100
});

export const toolState = writable<ToolState>(ToolState.pan);
export const canvasCursorPosition = derived(
	[cursorPosition, canvasView],
	([$cursorPosition, $canvasView]) => {
		return viewportToCanvasCoordinatesFromCanvasView($cursorPosition, $canvasView);
	}
);


export const commandIdsUnderCursor = derived([cursorPosition, svgs], ([cursorPosition, $svgs]) => {
	return getCommandIdsUnderCursor(cursorPosition, $svgs);
});
