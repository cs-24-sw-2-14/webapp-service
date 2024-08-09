import { writable, derived } from 'svelte/store'; 
// Not from our file. 
import { svgs } from '$lib/stores/socketioStore';
// From our file. 
import {
	type CanvasView,
	Page,
	ToolState,
	type CanvasCoordinateSet,
	type ColorString,
	type Username,
	type Color,
	type BoardId,
	type TextString
} from '$lib/types';
// All from our file. 
import { getCommandIdsUnderCursor, viewportToCanvasCoordinatesFromCanvasView } from '$lib/utils';
// From our file. 
import { browser } from '$app/environment';
// Not from our file. 
// All of the above is imported from ofter files.  


export const boardId = writable<BoardId | null>(null);
// Creating a writable store with a parameter either of the type BoardId or null. Default is null. 

// TOOLSTATE
// How the tools are when first accessing the board. 
export const toggleGrid = writable(true);
// Creating a writable store named toggleGrid with a parameter the type of boolean. 
export const drawColor = writable<ColorString>('#000000');
// Creating a writable store named drawColor with a parameter the type of ColorString. Default is '#000000' (black). 
export const chosenTool = writable<ToolState>(ToolState.pan);
// Creating a writable store named chosenTool with a parameter the type of ToolState. Default is pan. 


// USERS
export const username = writable<Username | null>(null);
// Creating a writable store named username with a parameter the type of either Username or null. Default is null. 
export const color = writable<Color | null>(null);
// Creating a writable store named color with a parameter the type of either Color or null. Default is null. 
export const textString = writable<TextString | null>(null);
// Creating a writable store named textString with a parameter the type of either TextString or null. Default is null. 


boardId.subscribe((boardId) => {
	// Subscribe so we will be notified when there is a value change to the store boardId. When there is a change, then the following lines: 
	if (browser && boardId) {
		// If the app is running in the browser AND has a boardId, then the following lines. 
		const usernameKey = boardId + 'username';
		// Make constant named usernameKey, which is the boardId plus a username. 
		const colorKey = boardId + 'color';
		// Make constant named colorKey, which is the boardId plus a color. 

		username.set(localStorage.getItem(usernameKey) ?? null);
		// Set the store username to be the boardId plus username for the user of the computer/browser. 
		// If the first is null then the second will be null. 
		// It gets the usernameKey from the user's browser data. 
		// localStorage is a read-only property. A way to store data in the browser. 
		// getItem will be passed a key and will return it's value. If the key does not exist, it will return null. 
		// The key here will be the constant usernameKey (a string). 
		const colorString = localStorage.getItem(colorKey);
		// Constant colorString is equal to boardId plus color for the user of the computer/browser. 
		// localStorage is a read-only property. A way to store data in the browser. 
		// getItem will be passed a key and will return it's value. If the key does not exist, it will return null. 
		// The key here will be the constant colorKey (a string). 
		color.set(colorString ? parseInt(colorString) : null);
		// Set the store color to be be either color in the form of an integer or null. 
		// If colorString is true, it will be parsed to an integer. If it is false, it will be null. 

		username.subscribe((username) => {
			// Subscribe so we will be notified when there is a value change to the store username. Arrow function. When there is a change, then the following lines: 
			if (!username) return;
			// If the username does not exist, we return. 
			localStorage.setItem(usernameKey, username!);
			// Else it will set/update the value of the key. Key = usernameKey and username = the value of the key. 
		});

		color.subscribe((color) => {
			// Subscribe so we will be notified when there is a value change to the store color. Arrow function. When there is a change, then the following lines: 
			if (color === null) return;
			// If color is euqal to null, then return. 
			localStorage.setItem(colorKey, color!.toString());
			// Else it will set/update the value of the key. Key = colorKey and color = the value of the key. 
			// toString makes it so the value of color is represented in the format of a string. 
		});
	}
});

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

export const currentPage = writable(Page.InitializationPage);
export const viewChat = writable(false);

export const commandIdsUnderCursor = derived(
	[canvasCursorPosition, svgs],
	([$canvasCursorPosition, $svgs]) => {
		return getCommandIdsUnderCursor($canvasCursorPosition, $svgs);
	}
);
