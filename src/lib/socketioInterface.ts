import type {
	CanvasCoordinate,
	HexColorString,
	FillString,
	StrokeWidth,
	CommandId,
	Threshold,
	Username,
	SvgString
} from './types';

export interface ServerToClientEvents {
	edit: (data: Edit) => void;
	remove: (data: Remove) => void;
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
}

export interface SocketData {
	username: Username;
}

export type StartAck = (commandId: CommandId) => void;

export interface StartDraw {
	position: CanvasCoordinate;
	stroke: HexColorString;
	fill: FillString;
	strokeWidth: StrokeWidth;
	username: Username;
}

export interface DoDraw {
	position: CanvasCoordinate;
	commandId: CommandId;
}

export interface StartErase {
	position: CanvasCoordinate;
	commandIdsUnderCursor: CommandId[];
	threshold: Threshold;
	username: Username;
}

export interface DoErase {
	position: CanvasCoordinate;
	commandIdsUnderCursor: CommandId[];
	commandId: CommandId;
}

export interface StartMove {
	movedCommandId: CommandId;
	position: CanvasCoordinate;
	username: Username;
}

export interface DoMove {
	position: CanvasCoordinate;
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
	position?: CanvasCoordinate;
	commandId: CommandId;
}

export interface Remove {
	commandId: CommandId;
}
