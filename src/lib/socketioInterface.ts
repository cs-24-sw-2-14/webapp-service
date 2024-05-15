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
	userChange: (data: UserChange) => void;
	userRemove: (data: UserRemove) => void;
}

export interface ServerToClientEvents {
	edit: (data: Edit) => void;
	remove: (data: Remove) => void;
	userChange: (data: UserChange) => void;
	userRemove: (data: UserRemove) => void;
}

export interface ClientToServerEvents {
	startDraw: (data: StartDraw, callback: StartAck) => void;
	doDraw: (data: DoDraw) => void;
	startErase: (data: StartErase, callback: StartAck) => void;
	doErase: (data: DoErase) => void;
	startMove: (data: StartMove, callback: StartAck) => void;
	doMove: (data: DoMove) => void;
	undo: (data: Undo) => void;
	redo: (data: Redo) => void;
	userChange: (data: UserChange) => void;
}

export interface SocketData {
	username: Username;
}

export interface UserChange {
	username: Username;
	color: Color;
	position: CanvasCoordinateSet;
}

export interface UserRemove {
	username: Username;
}

export type StartAck = (commandId: CommandId) => void;

export interface StartDraw {
	coordinate: CanvasCoordinateSet;
	stroke: ColorString;
	fill: ColorString;
	strokeWidth: StrokeWidth;
	username: Username;
}

export interface DoDraw {
	coordinate: CanvasCoordinateSet;
	commandId: CommandId;
}

export interface StartErase {
	coordinate: CanvasCoordinateSet;
	commandIdsUnderCursor: CommandId[];
	threshold: Threshold;
	username: Username;
}

export interface DoErase {
	coordinate: CanvasCoordinateSet;
	commandIdsUnderCursor: CommandId[];
	commandId: CommandId;
}

export interface StartMove {
	movedCommandId: CommandId;
	offset: CanvasCoordinateSet;
	username: Username;
}

export interface DoMove {
	offset: CanvasCoordinateSet;
	commandId: CommandId;
}

export interface StartSuccess {
	commandId: CommandId;
	username: Username;
}

export interface Undo {
	username: Username;
}

export interface Redo {
	username: Username;
}

export interface Edit {
	svgString?: SvgString;
	placement?: CanvasCoordinateSet;
	commandId: CommandId;
}

export interface Remove {
	commandId: CommandId;
}
