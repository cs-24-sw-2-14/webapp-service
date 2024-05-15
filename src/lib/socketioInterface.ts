import type {
	CanvasCoordinateSet,
	ColorString,
	StrokeWidth,
	CommandId,
	Threshold,
	Username,
	SvgString,
	Color
} from './types';

export interface InitServerToClientEvents {
	userChange: (data: UserChangeEvent) => void;
	userRemove: (data: UserRemoveEvent) => void;
}

export interface ServerToClientEvents {
	edit: (data: EditEvent) => void;
	remove: (data: RemoveEvent) => void;
	userChange: (data: UserChangeEvent) => void;
	userRemove: (data: UserRemoveEvent) => void;
}

export interface ClientToServerEvents {
	startDraw: (data: StartDrawEvent, callback: StartAck) => void;
	doDraw: (data: DoDrawEvent) => void;
	startErase: (data: StartEraseEvent, callback: StartAck) => void;
	doErase: (data: DoEraseEvent) => void;
	startMove: (data: StartMoveEvent, callback: StartAck) => void;
	doMove: (data: DoMoveEvent) => void;
	startText: (data: StartTextEvent, callback: StartAck) => void;
	doText: (data: DoTextEvent, callback: StartAck) => void;
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
	position: CanvasCoordinateSet;
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
	content: string;
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
	svgString?: SvgString;
	position?: CanvasCoordinateSet;
	commandId: CommandId;
}

export interface RemoveEvent {
	commandId: CommandId;
}
