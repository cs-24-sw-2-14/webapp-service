import type { CommandId, Svg, User, Username } from '$lib/types';
import { writable, readable, get } from 'svelte/store';
import { Socket } from 'socket.io-client';
import type {
	ClientToServerEvents,
	ServerToClientEvents,
	InitServerToClientEvents,
	UserChange,
	UserRemove,
	Edit,
	Remove
} from '$lib/socketioInterface';
import { username } from './stateStore';

export const socket = writable<Socket<ServerToClientEvents, ClientToServerEvents>>();
export const initSocket = writable<Socket<InitServerToClientEvents>>();

export const otherUsers = readable<Map<Username, User>>(new Map(), (set) => {
	if (get(socket)) {
		get(socket).on('userChange', (data) => {
			handleUserChange(data, get(otherUsers), get(username), set);
		});
		get(socket).on('userRemove', (data) => {
			handleUserRemove(data, get(otherUsers), set);
		});
	}
	if (get(initSocket)) {
		get(initSocket).on('userChange', (data) => {
			handleUserChange(data, get(otherUsers), get(username), set);
		});
		get(initSocket).on('userRemove', (data) => {
			handleUserRemove(data, get(otherUsers), set);
		});
	}
});

export const svgs = writable<Map<CommandId, Svg>>(new Map(), (set) => {
	if (get(socket)) {
		get(socket).on('edit', (data) => {
			handleEdit(data, get(svgs), set);
		});
		get(socket).on('remove', (data) => {
			handleRemove(data, get(svgs), set);
		});
	}
});

function handleUserChange(
	data: UserChange,
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
	data: UserRemove,
	otherUsers: Map<Username, User>,
	set: (otherUsers: Map<Username, User>) => void
) {
	otherUsers.delete(data.username);
	set(otherUsers);
}

function handleEdit(
	data: Edit,
	svgs: Map<CommandId, Svg>,
	set: (svgs: Map<CommandId, Svg>) => void
) {
	const oldSvg = svgs.get(data.commandId)!;
	svgs.set(data.commandId, {
		commandId: data.commandId,
		svgString: data.svgString ?? oldSvg.svgString,
		placement: data.placement ?? oldSvg.placement,
		display: true
	});
	set(svgs);
}

function handleRemove(
	data: Remove,
	svgs: Map<CommandId, Svg>,
	set: (svgs: Map<CommandId, Svg>) => void
) {
	if (!svgs.has(data.commandId)) return;
	const oldSvg = svgs.get(data.commandId)!;
	svgs.set(data.commandId, {
		...oldSvg,
		display: false
	});
	set(svgs);
}
