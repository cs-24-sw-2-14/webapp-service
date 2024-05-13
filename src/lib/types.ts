export interface User {
	name: Username;
	color: Color;
	position: CanvasCoordinate;
	drawColor: HexColorString;
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
	name: ColorName;
	primary: HexColorString;
	secondary: HexColorString;
};
export type ColorName = string;
export type HexColorString = string;

export interface CanvasView {
	position: CanvasCoordinate;
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
export type CanvasCoordinate = Coordinates;
export type Username = string;
export type ScaleFactor = number;
// Currently a value between 0 and 100, but should be between 0 and 1 when refactor is done.
export type ScaleFactor100 = number;
export type StrokeWidth = number;
export type FillString = string;
export type Threshold = number;

export enum Page {
	InitializationPage,
	CanvasPage
}

export interface Edit {
	placementParameter?: CanvasCoordinate;
	svgStringParameter?: SvgString;
	commandId: CommandId;
}
export type SvgString = string;

export interface Remove {
	commandId: CommandId;
}
export type CommandId = number;

export interface BoundingBox extends Rectangle {
	placement: CanvasCoordinate;
}

export type Svg = {
	svgString: SvgString;
	offset: CanvasCoordinate;
	commandId: CommandId;
	boundingBox?: BoundingBox;
};

export interface ToolSuccess {
	username: Username;
	commandId: CommandId;
}
