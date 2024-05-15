import type {
	CanvasCoordinates,
	HexColorString,
	FillString,
	StrokeWidth,
	CommandId,
	Threshold,
	Username,
	SvgString
} from './types';

export interface ServerToClientEvents {
	edit: (data: EditEvent) => void;
	remove: (data: RemoveEvent) => void;
}

export interface ClientToServerEvents {
	startDraw: (data: StartDrawEvent, callback: StartAck) => void;
	doDraw: (data: DoDrawEvent) => void;
	startErase: (data: StartEraseEvent, callback: StartAck) => void;
	doErase: (data: DoEraseEvent) => void;
	startMove: (data: StartMoveEvent, callback: StartAck) => void;
	doMove: (data: DoMoveEvent) => void;
	undo: (data: UndoEvent) => void;
	redo: (data: RedoEvent) => void;
}

export interface SocketData {
	username: Username;
}

export type StartAck = (commandId: CommandId) => void;

export interface StartDrawEvent {
	position: CanvasCoordinates;
	stroke: HexColorString;
	fill: FillString;
	strokeWidth: StrokeWidth;
	username: Username;
}

export interface DoDrawEvent {
	position: CanvasCoordinates;
	commandId: CommandId;
}

export interface StartEraseEvent {
	position: CanvasCoordinates;
	commandIdsUnderCursor: CommandId[];
	threshold: Threshold;
	username: Username;
}

export interface DoEraseEvent {
	position: CanvasCoordinates;
	commandIdsUnderCursor: CommandId[];
	commandId: CommandId;
}

export interface StartMoveEvent {
	movedCommandId: CommandId;
	position: CanvasCoordinates;
	username: Username;
}

export interface DoMoveEvent {
	position: CanvasCoordinates;
	commandId: CommandId;
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
	position?: CanvasCoordinates;
	commandId: CommandId;
}

export interface RemoveEvent {
	commandId: CommandId;
}
