import { error } from '@sveltejs/kit';

// Load environment variable
const { REST_API_PROTOCOL, REST_API_HOSTNAME, REST_API_PORT } = import.meta.env;

const VALIDATE_BOARD_ENDPOINT = `${REST_API_PROTOCOL}://${REST_API_HOSTNAME}:${REST_API_PORT}/v1/board/validate`;
export async function load({ params }) {
	try {
		const response = await fetch(VALIDATE_BOARD_ENDPOINT, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ boardId: params.slug })
		});
		if (response.ok) {
			return {
				slug: params.slug
			};
		}
		throw error(404, 'Board does not exist');
	} catch (err) {
		throw error(500, 'Failed to fetch data with error:' + err);
	}
}
