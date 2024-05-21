import {
	PUBLIC_REST_API_PROTOCOL,
	PUBLIC_REST_API_HOSTNAME,
	PUBLIC_REST_API_PORT
} from '$env/static/public';
import type { BoardId, Color, Username } from './types';

const ENDPOINT = `${PUBLIC_REST_API_PROTOCOL}://${PUBLIC_REST_API_HOSTNAME}:${PUBLIC_REST_API_PORT}`
const CREATE_BOARD_ENDPOINT: string = `${ENDPOINT}/v1/board/create`;
const EXISTS_BOARD_ENDPOINT: string = `${ENDPOINT}/v1/board/exists`;
const EXISTS_USER_ENDPOINT: string = `${ENDPOINT}/v1/user/exists`;
const EXISTS_COLOR_ENDPOINT: string = `${ENDPOINT}/v1/color/exists`;

export async function createBoard() {
	const response = await fetch(CREATE_BOARD_ENDPOINT, {
		method: 'POST',
		cache: 'no-store'
	});

	const res = (await response.json());

	if (!response.ok) {
		throw new Error(res);
	}

	return res.board_id;
}
export async function boardExists(boardId: BoardId) {
	const response = await fetch(`${EXISTS_BOARD_ENDPOINT}/?board_id=${boardId}`, {
		method: 'GET',
		cache: 'no-store'
	});

	const res = (await response.json());

	if(!response.ok){
		throw new Error(res);
	}

	return res == true;
}

export async function userExists(boardId: BoardId, username: Username) {
	const response = await fetch(
		`${EXISTS_USER_ENDPOINT}/?board_id=${encodeURIComponent(boardId)}&username=${encodeURIComponent(username)}`,
		{
			method: 'GET',
			cache: 'no-store'
		}
	);

	const res = (await response.json());

	if (!response.ok){
		throw new Error(res);
	}

	return res == true;
}

export async function colorExists(boardId: BoardId, color: Color) {
	const response = await fetch(
		`${EXISTS_COLOR_ENDPOINT}/?board_id=${encodeURIComponent(boardId)}&color=${encodeURIComponent(color)}`,
		{
			method: 'GET',
			cache: 'no-store'
		}
	);

	const res = (await response.json());

	if (!response.ok){
		throw new Error(res);
	}

	return res == true;
}
