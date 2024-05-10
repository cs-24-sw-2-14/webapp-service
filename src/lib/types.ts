export interface User {
	name: Username;
	color: Color;
	position: CanvasCoordinates;
	drawColor: hexColorString;
}

export interface OtherUser extends User {
	isOnline: boolean;
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
	name: colorName;
	primary: hexColorString;
	secondary: hexColorString;
};
export type colorName = string;
export type hexColorString = string;

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

export enum Page {
	InitializationPage,
	CanvasPage
}

export interface Edit {
	placement?: CanvasCoordinates;
	svgString?: SvgString;
	commandId: CommandId;
}
export type SvgString = string;

export interface Remove {
	commandId: CommandId;
}
export type CommandId = number;

export type Svg = {
	svgString: SvgString;
	placement: CanvasCoordinates;
	commandId: CommandId;
};

export interface ToolSuccess {
	username: Username;
	commandId: CommandId;
}

