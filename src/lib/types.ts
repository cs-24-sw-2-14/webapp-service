export interface Color {
	name: string;
	bg: string;
	border: string;
}

export interface User {
	name: Username;
	color: Color;
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
	move,
	text,
}

export interface Coordinate {
	x: number;
	y: number;
}

export type CanvasMousePosition = Coordinate;
export type Username = string;
