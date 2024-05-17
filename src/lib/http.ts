import {
	PUBLIC_REST_API_PROTOCOL,
	PUBLIC_REST_API_HOSTNAME,
	PUBLIC_REST_API_PORT
} from '$env/static/public';
import type { BoardId, Color, Username } from './types';

const CREATE_BOARD_ENDPOINT: string = `${PUBLIC_REST_API_PROTOCOL}://${PUBLIC_REST_API_HOSTNAME}:${PUBLIC_REST_API_PORT}/v1/board/create`;
const VALIDATE_BOARDID_ENDPOINT: string = `${PUBLIC_REST_API_PROTOCOL}://${PUBLIC_REST_API_HOSTNAME}:${PUBLIC_REST_API_PORT}/v1/board/validateBoardId`;
const VALIDATE_USERNAME_ENDPOINT: string = `${PUBLIC_REST_API_PROTOCOL}://${PUBLIC_REST_API_HOSTNAME}:${PUBLIC_REST_API_PORT}/v1/board/validateUsername`;
const VALIDATE_COLOR_ENDPOINT: string = `${PUBLIC_REST_API_PROTOCOL}://${PUBLIC_REST_API_HOSTNAME}:${PUBLIC_REST_API_PORT}/v1/board/validateColor`;

export async function createBoard() {
	try {
		const response = await fetch(CREATE_BOARD_ENDPOINT, {
			method: 'POST'
		});
		if (response.ok) {
			return (await response.json()).boardId;
		}
		throw new Error('Create board failed');
	} catch (err) {
		throw new Error('Create board failed');
	}
}
export async function validateBoardId(boardId: BoardId) {
	try {
		const queryParams = new URLSearchParams();
		queryParams.set('boardId', boardId);
		const response = await fetch(VALIDATE_BOARDID_ENDPOINT + queryParams.toString(), {
			method: 'GET'
		});
		if (response.ok) {
			return true;
		}
		return false;
	} catch (err) {
		throw new Error('Validate BoardId failed');
	}
}

export async function validateUsername(boardId: BoardId, username: Username) {
	try {
		const queryParams = new URLSearchParams();
		queryParams.set('boardId', boardId);
		queryParams.set('username', username);
		const response = await fetch(VALIDATE_USERNAME_ENDPOINT + queryParams.toString(), {
			method: 'GET'
		});
		if (response.ok) {
			return true;
		}
		return false;
	} catch (err) {
		throw new Error('Validate Username failed');
	}
}

export async function validateColor(boardId: BoardId, color: Color) {
	try {
		const queryParams = new URLSearchParams();
		queryParams.set('boardId', boardId);
		queryParams.set('color', color.toString());
		const response = await fetch(VALIDATE_COLOR_ENDPOINT + queryParams.toString(), {
			method: 'GET'
		});
		if (response.ok) {
			return true;
		}
		return false;
	} catch (err) {
		throw new Error('Validate Color failed');
	}
}
