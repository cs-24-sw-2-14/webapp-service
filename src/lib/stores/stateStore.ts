import { writable } from 'svelte/store';
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

export const boardId = writable('');

export const currentPage = writable(Page.InitializationPage);


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

export const commandIdsUnderCursor = writable<CommandId[]>([]);
