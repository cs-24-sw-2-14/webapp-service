import {
	PUBLIC_REST_API_PROTOCOL,
	PUBLIC_REST_API_HOSTNAME,
	PUBLIC_REST_API_PORT
} from '$env/static/public';
import type { BoardId, Color, Username } from './types';

const ENDPOINT = `${PUBLIC_REST_API_PROTOCOL}://${PUBLIC_REST_API_HOSTNAME}:${PUBLIC_REST_API_PORT}`
const CREATE_BOARD_ENDPOINT: string = `${ENDPOINT}/v1/board/create`;
const VALIDATE_BOARDID_ENDPOINT: string = `${ENDPOINT}/v1/board/exists`;
const VALIDATE_USERNAME_ENDPOINT: string = `${ENDPOINT}/v1/user/exists`;
const VALIDATE_COLOR_ENDPOINT: string = `${ENDPOINT}/v1/color/exists`;

export async function createBoard() {
	try {
		const response = await fetch(CREATE_BOARD_ENDPOINT, {
			method: 'POST'
		});
		if (response.ok) {
			return (await response.json()).board_id;
		}
		throw new Error('Create board failed');
	} catch (err) {
		throw new Error('Create board failed');
	}
}
export async function validateBoardId(boardId: BoardId) {
	try {
		const response = await fetch(`${VALIDATE_BOARDID_ENDPOINT}/?board_id=${boardId}`, {
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
		const response = await fetch(
			`${VALIDATE_USERNAME_ENDPOINT}/?board_id=${encodeURIComponent(boardId)}&username=${encodeURIComponent(username)}`,
			{
				method: 'GET'
			}
		);
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
		const response = await fetch(
			`${VALIDATE_COLOR_ENDPOINT}/?board_id=${encodeURIComponent(boardId)}&color=${encodeURIComponent(color)}`,
			{
				method: 'GET'
			}
		);
		if (response.ok) {
			return true;
		}
		return false;
	} catch (err) {
		throw new Error('Validate Color failed');
	}
}
