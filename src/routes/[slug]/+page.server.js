import { error } from '@sveltejs/kit';

// Load environment variable
const SECRET_IP_ADDRESS = process.env.SECRET_IP_ADDRESS;

const ENDPOINT = 'http://' + SECRET_IP_ADDRESS + ':5123' + '/v1/board/validate';
export async function load({ params }) {
	try {
		const response = await fetch(ENDPOINT, {
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
