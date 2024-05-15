import type { BoardId, Color, CommandId, Svg, User, Username } from '$lib/types';
import { writable, readable, get } from 'svelte/store';
import { io, Socket } from 'socket.io-client';
import type {
	ClientToServerEvents,
	ServerToClientEvents,
	InitServerToClientEvents,
	UserChangeEvent,
	UserRemoveEvent,
	EditEvent,
	RemoveEvent
} from '$lib/socketioInterface';
import { username } from './stateStore';

import {
	PUBLIC_SOCKET_API_PROTOCOL,
	PUBLIC_SOCKET_API_HOSTNAME,
	PUBLIC_SOCKET_API_PORT
} from '$env/static/public';

const SOCKET_ENDPOINT: string = `${PUBLIC_SOCKET_API_PROTOCOL}://${PUBLIC_SOCKET_API_HOSTNAME}:${PUBLIC_SOCKET_API_PORT}`;

export const initSocket = writable<Socket<InitServerToClientEvents>>(io(SOCKET_ENDPOINT));
export const boardSocket = writable<Socket<ServerToClientEvents, ClientToServerEvents>>(
	io(SOCKET_ENDPOINT)
);

export function connectToBoardSocket(
	username: Username,
	color: Color,
	boardId: BoardId,
	connectCallback: () => void
) {
	boardSocket.set(
		io(SOCKET_ENDPOINT + `/${boardId}`, {
			auth: {
				username: username,
				color: color
			}
		})
	);
	get(boardSocket).on('connect', () => {
		connectCallback();
	});
}

export function connectToInitSocket(boardId: BoardId, connectCallback: () => void) {
	initSocket.set(io(SOCKET_ENDPOINT + `/${boardId}_init`));
	get(initSocket).on('connect', () => {
		connectCallback();
	});
}

export const otherUsers = readable<Map<Username, User>>(new Map(), (set) => {
	get(boardSocket).on('userChange', (data) => {
		handleUserChange(data, get(otherUsers), get(username), set);
	});
	get(boardSocket).on('userRemove', (data) => {
		handleUserRemove(data, get(otherUsers), set);
	});
	get(initSocket).on('userChange', (data) => {
		handleUserChange(data, get(otherUsers), get(username), set);
	});
	get(initSocket).on('userRemove', (data) => {
		handleUserRemove(data, get(otherUsers), set);
	});
});

export const svgs = writable<Map<CommandId, Svg>>(new Map(), (set) => {
	get(boardSocket).on('edit', (data) => {
		handleEdit(data, get(svgs), set);
	});
	get(boardSocket).on('remove', (data) => {
		handleRemove(data, get(svgs), set);
	});
});

function handleUserChange(
	data: UserChangeEvent,
	otherUsers: Map<Username, User>,
	username: Username,
	set: (otherUsers: Map<Username, User>) => void
) {
	if (!otherUsers.has(data.username) || data.username === username) return;
	const oldUser = otherUsers.get(data.username)!;
	otherUsers.set(data.username, {
		name: data.username,
		color: data.color ?? oldUser.color,
		position: data.position ?? oldUser.position
	});
	set(otherUsers);
}

function handleUserRemove(
	data: UserRemoveEvent,
	otherUsers: Map<Username, User>,
	set: (otherUsers: Map<Username, User>) => void
) {
	otherUsers.delete(data.username);
	set(otherUsers);
}

function handleEdit(
	data: EditEvent,
	svgs: Map<CommandId, Svg>,
	set: (svgs: Map<CommandId, Svg>) => void
) {
	console.log('edit', data);
	const oldSvg = svgs.get(data.commandId)!;
	svgs.set(data.commandId, {
		commandId: data.commandId,
		svgString: data.svgString ?? oldSvg.svgString,
		position: data.position ?? oldSvg.position,
		display: true
	});
	set(svgs);
}

function handleRemove(
	data: RemoveEvent,
	svgs: Map<CommandId, Svg>,
	set: (svgs: Map<CommandId, Svg>) => void
) {
	console.log('remove', data);
	if (!svgs.has(data.commandId)) return;
	const oldSvg = svgs.get(data.commandId)!;
	svgs.set(data.commandId, {
		...oldSvg,
		display: false
	});
	set(svgs);
}
