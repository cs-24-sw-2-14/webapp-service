export interface User {
	name: Username;
	color: Color;
	cursorPosition: CanvasCoordinates;
	drawColor: string;
}

export interface OtherUser extends User {
	isOnline: boolean;
}

export enum Color {
	red, // 0
	orange, // 1
	yellow, // 2
	lime, // 3
	green, // 4
	teal, // 5
	brown, // 6
	blue, // 7
	purple, // 8
	pink // 9
}

export type UserColor = {
	name: string;
	primary: string;
	secondary: string;
};

export interface CanvasView {
  position: CanvasCoordinates;
	size: Rectangle;
  scale: ScaleFactor100;
}

export enum ToolState {
	draw,
	erase,
	pan,
	move
}

export interface Rectangle {
	width: number;
	height: number;
}

export interface Coordinates {
  x: number;
  y: number;
}

export type ViewportCoordinates = Coordinates;
export type CanvasCoordinates = Coordinates;
export type Username = string;
export type ScaleFactor = number;
// Currently a value between 0 and 100, but should be between 0 and 1 when refactor is done.
export type ScaleFactor100 = number;

export interface Local {
	posX: number;
	posY: number;
	color: UserColor;
	name: Username;
  }
  
  export enum UserColor {
	red,      // 0
	orange,   // 1
	yellow,   // 2
	lime,     // 3
	green,    // 4
	teal,     // 5
	brown,    // 6
	blue,     // 7
	purple,   // 8
	pink      // 9
  }
  
  export interface Remote {
	posX: number;
	posY: number;
	color: UserColor;
	name: string;
  }
  
  export interface Cursors {
	localCursor: Local;
	remoteCursors: Remote[];
  }
