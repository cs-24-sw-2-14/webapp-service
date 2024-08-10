import type { BoardId, Color, CommandId, Svg, User, Username } from '$lib/types'; 
// The types BoardId, Color, CommandId, Svg, User and Username are imported from the file "types" which is in the lib folder 
import { writable, get } from 'svelte/store';
// writable and get are imported from the svelte store from the svelte library 
import { io, Socket } from 'socket.io-client';
// io and Socket are imported from the file "socket.io-client" which is from the Socket.io library  
import type {
	ClientToServerEvents,
	ServerToClientEvents,
	InitServerToClientEvents,
	UserChangeEvent,
	UserRemoveEvent,
	EditEvent,
	RemoveEvent
} from '$lib/socketioInterface';
// The types are imported from the file "socketioInterface" which is under the lib folder
import { username } from './stateStore';
// username is imported from the file stateStore which is under the stores folder 
import {
	PUBLIC_SOCKET_API_PROTOCOL,
	PUBLIC_SOCKET_API_HOSTNAME,
	PUBLIC_SOCKET_API_PORT
} from '$env/static/public';
// PUBLIC_SOCKET_API_PROTOCOL, PUBLIC_SOCKET_API_HOSTNAME and PUBLIC_SOCKET_API_PORT are imported from the file "public" which belong to the svelte library
const SOCKET_ENDPOINT: string = `${PUBLIC_SOCKET_API_PROTOCOL}://${PUBLIC_SOCKET_API_HOSTNAME}:${PUBLIC_SOCKET_API_PORT}`;
// The constant SOCKET_ENDPOINT is a string consisting of the values of PUBLIC_SOCKET_API_PROTOCOL, PUBLIC_SOCKET_API_HOSTNAME and PUBLIC_SOCKET_API_PORT
// It will be in the format: protocol://hostname:port. The values are in the file .env
export const initSocket = writable<Socket<InitServerToClientEvents> | null>(null);
// export the constant initSocket. The constant is of the type writable. 
// writable can be of the type Socket or null. The defaul value we have set is null. 
// Socket consists of what is in InitServerToClientEvent. 
// InitServerToClientEvents is form the file socketioInterface and Socket is imported from the file socket. 
export const boardSocket = writable<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null);
// export the constant boardSocket. The constant is of the type writable. 
// writable can be of the type Socket or null. The defaul value we have set is null. 
// Socket consists of what is in ServerToClientEvent and ClientToServerEvents. 
// ServerToClientEvents and ClientToServerEvents are form the file socketioInterface and Socket is imported from the file socket.
export const otherUsers = writable<Map<Username, User>>(new Map());
// export the constant otherUsers. The constant is of the type writable. 
// writable can be of the type Map. The defaul value we have set is new Map (an empty map). 
// Map is to consists of what is in Username and User.
// Username and User is from the file types. Map is a variable consisting of two things. 
export const svgs = writable<Map<CommandId, Svg>>(new Map());
// export the constant svgs. The constant is of the type writable. 
// writable can be of the type Map. The defaul value we have set is new Map (an empty map). 
// Map consists of what is in CommandId and Svg.
// CommandId and Svg is from the file types. Map is a variable consisting of two things. 
export function connectToBoardSocket(
	username: Username,
	color: Color,
	boardId: BoardId,
	successCallback: () => void
)
// export the function connectToBoardSocket. The parameters are username, color, boardId and successCallback. 
// username, color and boardId are set to be the same type as the corresponding name, which are from the file types. 
// The parameters taken in needs to have the same type as the types from the file types. 
// => means an arrow function. successCallback does not take in any parameters, and returns void (nothing). 
{
	const newSocket = io(SOCKET_ENDPOINT + `/${boardId}`, {
		// The constant newSocket consists of an URL. io is the one to make the connection. 
		// The URl is the SOCKET_ENDPOINT which is equal to protocol://hostname:port and then plus the boardId at the end. 
		auth: { 
			username: username,
			color: color
		}
	});
	// We are connecting to the socket with username and color as authentication (login).  
	
	// The string is called the eventName, which is the name of the event. 
	// The function is called the listener, which is the callback function.   
	// .on adds a listener. 
	newSocket.on('userChange', handleUserChange);
	// The function it calls is handleUserChange. It is waiting for the message/event 'userChange'. 
	newSocket.on('userRemove', handleUserRemove);
	// Same principle as with userChange. 
	newSocket.on('edit', handleEdit);
	// Same principle as with userChange. 
	newSocket.on('remove', handleRemove);
	// Same principle as with userChange. 
	newSocket.on('connect', () => { // Arrow function. It takes nothing and the function is calls are the three lines below. 
		newSocket.off('connect'); 
		// .off deletes the listener. We only need to conncet once. 
		boardSocket.set(newSocket); 
		// We use .set to change the contents of boardSocket to that of newSocket. A variable in a variable. 
		successCallback(); 
		// It does not take in any parameter and returns void (nothing). 
	});
}

export function connectToInitSocket(boardId: BoardId, successCallback: () => void) {
	// export the function connectToInitSocket. The parameters are boardID and successCallback. 
	// => means an arrow function. successCallback does not take in any parameters, and returns void (nothing). 
	// boardId is set to be the same type as the corresponding name, which is from the file types. 
	// The parameters taken in needs to have the same type as the types from the file types. 
	const newSocket = io(SOCKET_ENDPOINT + `/${boardId}_init`);
	// The constant newSocket consists of an URL. io is the one to make the connection. 
	// The URl is the SOCKET_ENDPOINT which is equal to protocol://hostname:port and then plus the boardId and _init at the end. 
	newSocket.on('userChange', handleUserChange);
	// It is waiting for the message/event 'userChange', and then it calles the function handleUserChange. 
	newSocket.on('userRemove', handleUserRemove);
	// Same principle as with userChange. 
	newSocket.on('connect', () => {
		newSocket.off('connect');
		// .off deletes the listener. We only need to conncet once. 
		initSocket.set(newSocket);
		// We use .set to change the contents of initSocket to that of newSocket. A variable in a variable.
		successCallback();
		// It does not take in any parameter and returns void (nothing). 
	});
}

function handleUserChange(data: UserChangeEvent) {
	// Function called handleUserChange which take in the parameter data, that is the value of UserChangeEvent (from the file socketioInterface)
	otherUsers.update((current) => {
		// Updates the current map of otherUsers to the following lines (arrow function): 
		if (data.username === get(username)) return current;
		// A map take in Username and User. if the Username is the same as the username from User, then return the current map.  
		const oldUser = current.get(data.username)!;
		// Current data in the map otherUsers with the key username. 
		// Constant oldUser is equal to the current data with the key username from the map otherUsers. 
		// The exclamation mark at the end makes so the value cannot be null or undefined. Trust me, it is what we wnat it to be.  
		current.set(data.username, {
			// Sets the value of the map to the following lines: 
			name: data.username,
			// The current username in User. 
			color: data.color ?? oldUser.color, 
			// If data.color is null it is oldUser.color, else it is data.color. From User. 
			position: data.position ?? oldUser.position
			// If data.position is null it is oldUser.color, else it is data.position. From User. 
		});
		return current; 
		// Returns the current map (the map with the changes made). 
	});
}

function handleUserRemove(data: UserRemoveEvent) {
	// Function called handleUserRemove which take in the parameter data, that is the value of UserRemoveEvent (from the file socketioInterface)
	otherUsers.update((current) => {
		// Updates the current map of otherUsers to the following line (arrow function): 
		current.delete(data.username);
		// Deletes the current User with the key username in the map. 
		return current;
		// Returns the current map (the map with the changes made). 
	});
}

function handleEdit(data: EditEvent) {
	// Function called handleEdit which take in the parameter data, that is the value of EditEvent (from the file socketioInterface)
	svgs.update((current) => {
		// Updates the current map of svgs to the following lines (arrow function): 
		const oldSvg = current.get(data.commandId)!;
		// Current data in the map svgs with the key commandId. 
		// Constant oldSVG is equal to the current data with the key commandId from the map svgs. 
		// The exclamation mark at the end makes so the value cannot be null or undefined. Trust me, it is what we wnat it to be.
		current.set(data.commandId, {
			// Sets the value of the map to the following lines: 
			commandId: data.commandId,
			// The current commandId in Svg. 
			svgString: data.svgString ?? oldSvg.svgString,
			// If data.svgString is null it is oldSvg.svgString, else it is data.svgString. From Svg. 
			position: data.position ?? oldSvg.position,
			// If data.position is null it is oldSvg.position, else it is data.position. From Svg. 
			display: true
			// The value of display is true. 
		});
		return current; 
		// Returns the current map (the map with the changes made). 
	});
}

function handleRemove(data: RemoveEvent) {
	// Function called handleRemove which take in the parameter data, that is the value of RemoveEvent (from the file socketioInterface)
	svgs.update((current) => {
		// Updates the current map of svgs to the following lines (arrow function): 
		if (!current.has(data.commandId)) return current;
		// If the key commandId is not in current, then return current. Else following lines:  
		const oldSvg = current.get(data.commandId)!;
		// Current data in the map svgs with the key commandId. 
		// Constant oldSVG is equal to the current data with the key commandId from the map svgs. 
		// The exclamation mark at the end makes so the value cannot be null or undefined. Trust me, it is what we wnat it to be.
		current.set(data.commandId, {
			// Sets the value of the map to the following lines: 
			...oldSvg,
			// All before display will be set to the same as in oldSvg (svgString, position and commandId). 
			display: false
			// The value of display is set to false. 
		});
		return current;
		// Returns the current map (the map with the changes made).
	});
}
