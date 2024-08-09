import type {
	CanvasCoordinateSet,
	ColorString,
	StrokeWidth,
	CommandId,
	Threshold,
	Username,
	SvgString,
	Color,
	TextString
} from './types';
// Imported all of the above types from the file types. 

export interface InitServerToClientEvents {
	// The interface InitServerToClientEvents consists of userChange and userRemove.  
	userChange: (data: UserChangeEvent) => void;
	// userChange consists of the interface UserChangeEvent and is an arrow function that returns void. 
	userRemove: (data: UserRemoveEvent) => void;
	// userRemove consists of the interface UserRemoveEvent and is an arrow function that returns void. 
}

export interface ServerToClientEvents {
	// The interface ServerToClientEvents consists of edit, remove, userChange and userRemove.  
	edit: (data: EditEvent) => void;
	// 
	remove: (data: RemoveEvent) => void;
	// 
	userChange: (data: UserChangeEvent) => void;
	// 
	userRemove: (data: UserRemoveEvent) => void;
	// 
}

export interface ClientToServerEvents {
	startDraw: (data: StartDrawEvent, callback: StartAck) => void;
	doDraw: (data: DoDrawEvent) => void;
	startErase: (data: StartEraseEvent, callback: StartAck) => void;
	doErase: (data: DoEraseEvent) => void;
	startMove: (data: StartMoveEvent, callback: StartAck) => void;
	doMove: (data: DoMoveEvent) => void;
	startText: (data: StartTextEvent, callback: StartAck) => void;
	doText: (data: DoTextEvent) => void;
	undo: (data: UndoEvent) => void;
	redo: (data: RedoEvent) => void;
	userChange: (data: UserChangeEvent) => void;
}

export interface SocketData {
	username: Username;
}

export interface UserChangeEvent {
	username: Username;
	color?: Color;
	position?: CanvasCoordinateSet;
}

export interface UserRemoveEvent {
	username: Username;
}

export type StartAck = (commandId: CommandId) => void;

export interface StartDrawEvent {
	position: CanvasCoordinateSet;
	stroke: ColorString;
	fill: ColorString;
	strokeWidth: StrokeWidth;
	username: Username;
}

export interface DoDrawEvent {
	position: CanvasCoordinateSet;
	commandId: CommandId;
}

export interface StartEraseEvent {
	position: CanvasCoordinateSet;
	commandIdsUnderCursor: CommandId[];
	threshold: Threshold;
	username: Username;
}

export interface DoEraseEvent {
	position: CanvasCoordinateSet;
	commandIdsUnderCursor: CommandId[];
	commandId: CommandId;
}

export interface StartMoveEvent {
	movedCommandId: CommandId;
	username: Username;
}

export interface DoMoveEvent {
	position: CanvasCoordinateSet;
	commandId: CommandId;
}

export interface StartTextEvent {
	position: CanvasCoordinateSet;
	username: Username;
}

export interface DoTextEvent {
	commandId: CommandId;
	content: TextString;
}

export interface StartSuccessEvent {
	commandId: CommandId;
	username: Username;
}

export interface UndoEvent {
	username: Username;
}

export interface RedoEvent {
	username: Username;
}

export interface EditEvent {
	// EditEvent objects will need to have the properties svgString, position and commandId. 
	svgString?: SvgString;
	// Is either of the type SvgString or null. 
	position?: CanvasCoordinateSet;
	// Is either of the type CanvasCoordinateSet or null. 
	commandId: CommandId;
	// Is of the type CommandId. 
}

export interface RemoveEvent {
	commandId: CommandId;
}
