export interface Color {
  name: string;
  bg: string;
  border: string;
}

export interface User {
	name: Username;
	color: UserColor;
	posX: number;
	posY: number;
}

export interface CanvasView {
  position: Coordinate;
  width: number; // Default values, will be replaced on mount
  height: number; // Default values, will be replaced on mount
  scale: number;
}

export enum ToolState {
  draw,
  erase,
  pan,
  move
}

export interface Coordinate {
  x: number;
  y: number;
}

export type CanvasMousePosition = Coordinate;
export type Username = string;

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
