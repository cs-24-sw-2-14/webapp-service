export interface User {
	name: Username;
	color: Color;
	position: CanvasCoordinateSet;
}

export enum Color {
	red,
	orange,
	yellow,
	lime,
	green,
	teal,
	brown,
	blue,
	purple,
	pink
}

export type UserColor = {
	name: ColorName;
	primary: ColorString;
	secondary: ColorString;
};
export type ColorName = string;
export type ColorString = string;

export interface CanvasView {
	position: CanvasCoordinateSet;
	size: Rectangle;
	scale: ScaleFactor100;
}

export enum ToolState {
	draw,
	erase,
	pan,
	move,
	text,
}

export interface Rectangle {
	width: number;
	height: number;
}

export interface CoordinateSet {
	x: number;
	y: number;
}

export type ViewportCoordinateSet = CoordinateSet;
export type CanvasCoordinateSet = CoordinateSet;
export type Username = string;
export type ScaleFactor = number;
// Currently a value between 0 and 100, but should be between 0 and 1 when refactor is done.
export type ScaleFactor100 = number;
export type StrokeWidth = number;
export type Threshold = number;
export type BoardId = string;

export enum Page {
	InitializationPage,
	CanvasPage
}

export type SvgString = string;
export type CommandId = number;

export interface BoundingBox extends Rectangle {
	position: CanvasCoordinateSet;
}

export type Svg = {
	svgString: SvgString;
	position: CanvasCoordinateSet;
	commandId: CommandId;
	display: boolean;
	boundingBox?: BoundingBox;
};

export interface ToolSuccess {
	username: Username;
	commandId: CommandId;
}
