export interface User {
	// The interface User is to consist of name, color and position. 
	name: Username;
	// name is of the type Username. 
	color: Color;
	// color is of the type Color. 
	position: CanvasCoordinateSet;
	// position is of the type CanvasCoordinateSet. 
}

export enum Color {
	// Color has the value of one of the 10 colours listed below. 
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
	// The type UserColor consists of name, primary and secondary. 
	name: ColorName;
	// name is of the type ColorName. 
	primary: ColorString;
	// primary is of the type ColorString. 
	secondary: ColorString;
	// secondary is of the type ColorString. 
};
export type ColorName = string;
export type ColorString = string;

export interface CanvasView {
	// The interface CanvasView is to consist of position, size and scale. 
	position: CanvasCoordinateSet;
	// position is of the type CanvasCoordinateSet. 
	size: Rectangle;
	// size is to have the interface Rectangle. 
	scale: ScaleFactor100;
	// scale is of the type ScaleFactor100. 
}

export enum ToolState {
	// ToolState has the value of one of the 5 tools listed below.
	draw,
	erase,
	pan,
	move, 
	text
}

export interface Rectangle {
	// The interface Rectangle is to consist of width and height. 
	width: number;
	height: number;
}

export interface CoordinateSet {
	// The interface CoordinateSet is to consist of x and y. 
	x: number;
	y: number;
}

export type ViewportCoordinateSet = CoordinateSet;
// The type ViewportCoordinateSet is to have the interface of CoordinateSet. 
export type CanvasCoordinateSet = CoordinateSet;
// The type CanvasCoordinateSet is to have the interface of CoordinateSet. 
export type Username = string;
export type ScaleFactor = number;
// Currently a value between 0 and 100, but should be between 0 and 1 when refactor is done.
export type ScaleFactor100 = number;
export type StrokeWidth = number;
export type Threshold = number;
export type BoardId = string;
export type TextString = string; 

export enum Page {
	// Page has the value of one of the 2 pages listed below.
	InitializationPage,
	CanvasPage
}

export type SvgString = string;
export type CommandId = number;

export interface BoundingBox extends Rectangle {
	// The interface BoundingBox is to consist of position. 
	position: CanvasCoordinateSet;
	// position is of the type CanvasCoordinateSet. 
}

export type Svg = {
	// The type Svg consists of svgString, position, commandId, display and boundingBox. 
	svgString: SvgString;
	// svgString is of the type SvgString. 
	position: CanvasCoordinateSet;
	// position is of the type CanvasCoordinateSet. 
	commandId: CommandId;
	// commandId is of the type CommandId. 
	display: boolean;
	// display is a boolean, so either true or false. 
	boundingBox?: BoundingBox;
	// boundingBox consist of the interface BoundingBox or is undefined. 
};

export interface ToolSuccess {
	// The interface ToolSuccess is to consist of username and commandId. 
	username: Username;
	// username is of the type Username. 
	commandId: CommandId;
	// commandId is of the type CommandId. 
}
