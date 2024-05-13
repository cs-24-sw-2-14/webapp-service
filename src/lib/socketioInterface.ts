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
	coordinate: CanvasCoordinate;
	stroke: HexColorString;
	fill: FillString;
	strokeWidth: StrokeWidth;
	username: Username;
}

export interface DoDraw {
	coordinate: CanvasCoordinate;
	commandId: CommandId;
}

export interface StartErase {
	coordinate: CanvasCoordinate;
	commandIdsUnderCursor: CommandId[];
	threshold: Threshold;
	username: Username;
}

export interface DoErase {
	coordinate: CanvasCoordinate;
	commandIdsUnderCursor: CommandId[];
	commandId: CommandId;
}

export interface StartMove {
	movedCommandId: CommandId;
	offset: CanvasCoordinate;
	username: Username;
}

export interface DoMove {
	offset: CanvasCoordinate;
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
	placement?: CanvasCoordinate;
	commandId: CommandId;
}

export interface Remove {
	commandId: CommandId;
}
