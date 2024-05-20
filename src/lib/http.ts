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
	const response = await fetch(CREATE_BOARD_ENDPOINT, {
		method: 'POST'
	});

	const res = (await response.json());

	if (!response.ok) {
		throw new Error(res);
	}

	return res.board_id;
}
export async function validateBoardId(boardId: BoardId) {
	const response = await fetch(`${VALIDATE_BOARDID_ENDPOINT}/?board_id=${boardId}`, {
		method: 'GET'
	});

	const res = (await response.json());

	if(!response.ok){
		throw new Error(res);
	}

	return res == true;
}

export async function validateUsername(boardId: BoardId, username: Username) {
	const response = await fetch(
		`${VALIDATE_USERNAME_ENDPOINT}/?board_id=${encodeURIComponent(boardId)}&username=${encodeURIComponent(username)}`,
		{
			method: 'GET'
		}
	);

	const res = (await response.json());

	if (!response.ok){
		throw new Error(res);
	}

	return res == true;
}

export async function validateColor(boardId: BoardId, color: Color) {
	const response = await fetch(
		`${VALIDATE_COLOR_ENDPOINT}/?board_id=${encodeURIComponent(boardId)}&color=${encodeURIComponent(color)}`,
		{
			method: 'GET'
		}
	);

	const res = (await response.json());

	if (!response.ok){
		throw new Error(res);
	}

	return res == true;
}
