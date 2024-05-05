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
	move
}

export interface Rectangle {
	width: number;
	height: number;
}

export interface Coordinate {
	x: number;
	y: number;
}

/**
 * Represents a factor between 0 and 1, which is used for scaling.
 */
export type ScaleFactor = number;
export type ViewCoordinate = Coordinate;
export type SvgCoordinate = Coordinate;
export type Username = string;
